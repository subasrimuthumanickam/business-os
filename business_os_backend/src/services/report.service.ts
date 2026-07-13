import db from "../config/db.js"; 

export const getSalesSummary = async (startDate: string, endDate: string) => {
    const query = `
        SELECT 
            DATE(invoice_date) as date, 
            SUM(total) as revenue 
        FROM invoices 
        WHERE invoice_date BETWEEN ? AND ? 
        GROUP BY DATE(invoice_date)`;
    
    return await db.execute(query, [startDate, endDate]);
};
export const getInventorySummary = async () => {
    const query = `
        SELECT 
            invoice_number, 
            total 
        FROM invoices 
        ORDER BY total DESC 
        LIMIT 10`; 
    
    return await db.execute(query, []);
};
export const getProfitAndLoss = async (from?: string, to?: string) => {
  const hasRange = !!(from && to);
  const invDateFilter = hasRange ? "AND DATE(invoice_date) BETWEEN ? AND ?" : "";
  const itemDateFilter = hasRange ? "AND DATE(i.invoice_date) BETWEEN ? AND ?" : "";
  const expDateFilter = hasRange ? "AND DATE(expense_date) BETWEEN ? AND ?" : "";
  const rangeParams = hasRange ? [from, to] : [];

  // Revenue
  const revenueRows: any = await db.execute(
    `SELECT COALESCE(SUM(subtotal),0) AS subtotal, COALESCE(SUM(tax),0) AS tax, COALESCE(SUM(total),0) AS total
     FROM invoices WHERE LOWER(status)='paid' ${invDateFilter}`,
    rangeParams
  );

  // COGS — from invoice_items linked to products, for paid invoices only
 const cogsRows: any = await db.execute(
  `SELECT COALESCE(SUM(ii.quantity * COALESCE(p.cost, 0)), 0) AS total
   FROM invoice_items ii
   JOIN invoices i ON ii.invoice_id = i.id
   LEFT JOIN products p ON ii.product_id = p.id
   WHERE LOWER(i.status) = 'paid' ${itemDateFilter}`,
  rangeParams
);

  // Operating Expenses
  const expenseRows: any = await db.execute(
    `SELECT ea.name AS category, COALESCE(SUM(e.amount),0) AS total
     FROM expenses e
     JOIN expense_accounts ea ON e.expense_account_id = ea.id
     WHERE 1=1 ${expDateFilter}
     GROUP BY ea.name ORDER BY total DESC`,
    rangeParams
  );

  const rev = Array.isArray(revenueRows[0]) ? revenueRows[0][0] : revenueRows[0];
  const cogsRow = Array.isArray(cogsRows[0]) ? cogsRows[0][0] : cogsRows[0];
  const exps = Array.isArray(expenseRows[0]) ? expenseRows[0] : expenseRows;

  const totalRevenue = Number(rev?.subtotal || 0);
  const cogs = Number(cogsRow?.total || 0);
  const totalExpenses = exps.reduce((s: number, e: any) => s + Number(e.total), 0);

  const grossProfit = totalRevenue - cogs;
  const netProfit = grossProfit - totalExpenses;

  return {
    revenue: { subtotal: totalRevenue, tax: Number(rev?.tax || 0), total: Number(rev?.total || 0) },
    cogs,
    expenses: {
      breakdown: exps.map((e: any) => ({ category: e.category || 'Uncategorized', total: Number(e.total) })),
      total: totalExpenses,
    },
    grossProfit,
    netProfit,
  };
};

export const getBalanceSheet = async () => {
  const recRows: any = await db.execute(
    `SELECT COALESCE(SUM(total),0) AS total FROM invoices WHERE LOWER(status) IN ('draft','pending','overdue')`,[]
  );
  const cashRows: any = await db.execute(
    `SELECT COALESCE(SUM(amount),0) AS total FROM payments`,[]
  );
  const expRows: any = await db.execute(
    `SELECT COALESCE(SUM(amount),0) AS total FROM expenses`,[]
  );

  const receivable = Number(Array.isArray(recRows[0]) ? recRows[0][0]?.total : recRows[0]?.total) || 0;
  const cash = Number(Array.isArray(cashRows[0]) ? cashRows[0][0]?.total : cashRows[0]?.total) || 0;
  const expenses = Number(Array.isArray(expRows[0]) ? expRows[0][0]?.total : expRows[0]?.total) || 0;
  const totalAssets = receivable + cash;
  const equity = totalAssets - expenses;

  return {
    assets: { accountsReceivable: receivable, cashAndBank: cash, total: totalAssets },
    liabilities: { totalExpenses: expenses, total: expenses },
    equity,
    totalLiabilitiesAndEquity: expenses + equity,
  };
};

export const getCashFlow = async (from?: string, to?: string) => {
  const payFilter = from && to ? `WHERE DATE(payment_date) BETWEEN '${from}' AND '${to}'` : '';
  const expFilter = from && to ? `WHERE DATE(expense_date) BETWEEN '${from}' AND '${to}'` : '';

  const cashInRows: any = await db.execute(
    `SELECT DATE_FORMAT(payment_date,'%b %Y') AS month, DATE_FORMAT(payment_date,'%Y-%m') AS month_key, COALESCE(SUM(amount),0) AS total
     FROM payments ${payFilter} GROUP BY month_key, month ORDER BY month_key ASC`, []
  );
  const cashOutRows: any = await db.execute(
    `SELECT DATE_FORMAT(expense_date,'%b %Y') AS month, DATE_FORMAT(expense_date,'%Y-%m') AS month_key, COALESCE(SUM(amount),0) AS total
     FROM expenses ${expFilter} GROUP BY month_key, month ORDER BY month_key ASC`, []
  );

  const cashIn = Array.isArray(cashInRows[0]) ? cashInRows[0] : cashInRows;
  const cashOut = Array.isArray(cashOutRows[0]) ? cashOutRows[0] : cashOutRows;
  const totalCashIn = cashIn.reduce((s: number, r: any) => s + Number(r.total), 0);
  const totalCashOut = cashOut.reduce((s: number, r: any) => s + Number(r.total), 0);

  const allMonths = Array.from(new Set([...cashIn.map((r: any) => r.month_key), ...cashOut.map((r: any) => r.month_key)])).sort();
  const timeline = allMonths.map((key) => {
    const inRow = cashIn.find((r: any) => r.month_key === key);
    const outRow = cashOut.find((r: any) => r.month_key === key);
    const inAmt = Number(inRow?.total || 0);
    const outAmt = Number(outRow?.total || 0);
    return { month: inRow?.month || outRow?.month || key, cashIn: inAmt, cashOut: outAmt, net: inAmt - outAmt };
  });

  return { timeline, summary: { totalCashIn, totalCashOut, netCashFlow: totalCashIn - totalCashOut } };
};

export const getSalesByCustomer = async (from?: string, to?: string) => {
  const hasRange = !!(from && to);
  const invDateFilter = hasRange ? "AND DATE(i.invoice_date) BETWEEN ? AND ?" : "";
  const rangeParams = hasRange ? [from, to] : [];

  const query = `
    SELECT
      c.id AS customer_id,
      c.display_name AS customer,
      COUNT(DISTINCT i.id) AS invoices,
      COALESCE(SUM(i.total), 0) AS sales,
      COALESCE((
        SELECT SUM(p.amount) FROM payments p
        WHERE p.invoice_id IN (
          SELECT id FROM invoices WHERE customer_id = c.id ${hasRange ? "AND DATE(invoice_date) BETWEEN ? AND ?" : ""}
        )
      ), 0) AS received
    FROM customers c
    JOIN invoices i ON i.customer_id = c.id
    WHERE 1=1 ${invDateFilter}
    GROUP BY c.id, c.display_name
    ORDER BY sales DESC
  `;

  // params: subquery range params first (inside SELECT), then outer WHERE range params
  const params = hasRange ? [...rangeParams, ...rangeParams] : [];
  const rows: any = await db.execute(query, params);
  const data = Array.isArray(rows[0]) ? rows[0] : rows;

  return data.map((row: any) => ({
    id: row.customer_id,
    customer: row.customer,
    invoices: Number(row.invoices),
    sales: Number(row.sales),
    received: Number(row.received),
    outstanding: Number(row.sales) - Number(row.received),
  }));
};

export const getSalesByItem = async (from?: string, to?: string) => {
  const hasRange = !!(from && to);
  const itemDateFilter = hasRange ? "AND DATE(i.invoice_date) BETWEEN ? AND ?" : "";
  const rangeParams = hasRange ? [from, to] : [];

  // Hybrid grouping: use product_id when present, else fall back to
  // normalized item_name so legacy rows (product_id NULL) still roll up.
  const query = `
    SELECT
      ii.product_id,
      COALESCE(p.name, ii.item_name) AS item,
      SUM(ii.quantity) AS quantity,
      SUM(ii.amount) AS amount
    FROM invoice_items ii
    JOIN invoices i ON i.id = ii.invoice_id
    LEFT JOIN products p ON p.id = ii.product_id
    WHERE 1=1 ${itemDateFilter}
    GROUP BY COALESCE(ii.product_id, LOWER(TRIM(ii.item_name))), COALESCE(p.name, ii.item_name)
    ORDER BY amount DESC
  `;

  const rows: any = await db.execute(query, rangeParams);
  const data = Array.isArray(rows[0]) ? rows[0] : rows;

  return data.map((row: any) => ({
    id: row.product_id, // null for legacy name-only rows
    item: row.item,
    quantity: Number(row.quantity),
    amount: Number(row.amount),
  }));
};

// export const getSalesBySalesPerson = async (from?: string, to?: string) => {
//   const hasRange = !!(from && to);
//   const dateFilter = hasRange ? "AND DATE(i.invoice_date) BETWEEN ? AND ?" : "";
//   const rangeParams = hasRange ? [from, to] : [];

//   const query = `
//     SELECT
//       e.id AS employee_id,
//       COALESCE(e.name, 'Unassigned') AS name,
//       COUNT(i.id) AS invoices,
//       COALESCE(SUM(i.total), 0) AS sales
//     FROM invoices i
//     LEFT JOIN hrms_employees e ON e.id = i.salesperson_id
//     WHERE 1=1 ${dateFilter}
//     GROUP BY e.id, e.name
//     ORDER BY sales DESC
//   `;

//   const rows: any = await db.execute(query, rangeParams);
//   const data = Array.isArray(rows[0]) ? rows[0] : rows;

//   return data.map((row: any) => ({
//     id: row.employee_id, // null for "Unassigned" group
//     name: row.name,
//     invoices: Number(row.invoices),
//     sales: Number(row.sales),
//   }));
// };
export const getSalesBySalesPerson = async (from?: string, to?: string) => {
  const hasRange = !!(from && to);
  const dateFilter = hasRange ? "AND DATE(i.invoice_date) BETWEEN ? AND ?" : "";
  const rangeParams = hasRange ? [from, to] : [];

  const query = `
    SELECT
      e.id AS employee_id,
      COALESCE(e.name, 'Unassigned') AS name,
      COUNT(i.id) AS invoices,
      COALESCE(SUM(i.total), 0) AS sales
    FROM invoices i
    LEFT JOIN hrms_employees e ON e.id = i.salesperson_id
    WHERE 1=1 ${dateFilter}
    GROUP BY e.id, e.name
    ORDER BY sales DESC
  `;

  const rows: any = await db.execute(query, rangeParams);
  const data = Array.isArray(rows[0]) ? rows[0] : rows;

  return data.map((row: any) => ({
    id: row.employee_id,
    name: row.name,
    invoices: Number(row.invoices),
    sales: Number(row.sales),
  }));
};

export const getInventorySummaryReport = async () => {
  const query = `
    SELECT
      id,
      name AS item_name,
      sku,
      stock_quantity AS quantity_on_hand,
      COALESCE(cost, 0) AS unit_price,
      COALESCE(stock_quantity * cost, 0) AS stock_value
    FROM products
    ORDER BY name ASC
  `;

  const rows: any = await db.execute(query, []);
  const data = Array.isArray(rows[0]) ? rows[0] : rows;

  return data.map((row: any) => ({
    id: row.id,
    item_name: row.item_name,
    sku: row.sku,
    quantity_on_hand: Number(row.quantity_on_hand),
    unit_price: Number(row.unit_price),
    stock_value: Number(row.stock_value),
  }));
};
export const getInventoryValuationSummary = async () => {
  const query = `
    SELECT
      id,
      name AS item_name,
      stock_quantity AS stock,
      COALESCE(cost, 0) AS purchase_price,
      COALESCE(stock_quantity * cost, 0) AS inventory_value
    FROM products
    ORDER BY name ASC
  `;

  const rows: any = await db.execute(query, []);
  const data = Array.isArray(rows[0]) ? rows[0] : rows;

  return data.map((row: any) => ({
    id: row.id,
    item_name: row.item_name,
    stock: Number(row.stock),
    purchase_price: Number(row.purchase_price),
    inventory_value: Number(row.inventory_value),
  }));
};

export const getProductSalesReport = async () => {
  const query = `
    SELECT
      p.id AS product_id,
      p.name AS item_name,
      SUM(ii.quantity) AS quantity_sold,
      SUM(ii.amount) AS total_sales
    FROM invoice_items ii
    JOIN products p ON p.id = ii.product_id
    GROUP BY p.id, p.name
    ORDER BY total_sales DESC
  `;

  const rows: any = await db.execute(query, []);
  const data = Array.isArray(rows[0]) ? rows[0] : rows;

  return data.map((row: any) => {
    const quantity = Number(row.quantity_sold);
    const total = Number(row.total_sales);
    return {
      item_name: row.item_name,
      quantity_sold: quantity,
      total_sales: total,
      average_price: quantity > 0 ? total / quantity : 0,
    };
  });
};
export const getLandedCostSummary = async () => {
  const query = `
    SELECT
      p.id AS product_id,
      p.name AS item_name,
      SUM(poi.quantity) AS total_quantity,
      SUM(poi.amount) AS total_base_cost,
      SUM(
        poi.amount + (poi.amount / NULLIF(po.subtotal, 0)) * (po.shipping_charge + po.customs_duty)
      ) AS total_landed_cost
    FROM purchase_order_items poi
    JOIN purchase_orders po ON po.id = poi.po_id
    JOIN products p ON p.id = poi.product_id
    WHERE po.status = 'Received'
    GROUP BY p.id, p.name
    ORDER BY p.name ASC
  `;

  const rows: any = await db.execute(query, []);
  const data = Array.isArray(rows[0]) ? rows[0] : rows;

  return data.map((row: any) => {
    const qty = Number(row.total_quantity);
    const landed = Number(row.total_landed_cost);
    return {
      item_name: row.item_name,
      quantity: qty,
      base_cost: Number(row.total_base_cost),
      landed_cost: landed,
      landed_cost_per_unit: qty > 0 ? landed / qty : 0,
    };
  });
};

// Add this to report.service.ts

export const getFifoCostLotTracking = async () => {
  // 1. All received purchase lots, oldest first per product
  const lotRows: any = await db.execute(
    `SELECT
       poi.product_id,
       p.name AS item_name,
       po.id AS po_id,
       po.po_number,
       po.po_date,
       poi.quantity AS qty_received,
       poi.amount AS total_cost
     FROM purchase_order_items poi
     JOIN purchase_orders po ON po.id = poi.po_id
     JOIN products p ON p.id = poi.product_id
     WHERE po.status = 'Received'
     ORDER BY poi.product_id ASC, po.po_date ASC, po.id ASC`,
    []
  );
  const lotData = Array.isArray(lotRows[0]) ? lotRows[0] : lotRows;

  // 2. All sales events, oldest first per product
  const saleRows: any = await db.execute(
    `SELECT
       ii.product_id,
       i.id AS invoice_id,
       i.invoice_number,
       i.invoice_date,
       ii.quantity AS qty_sold
     FROM invoice_items ii
     JOIN invoices i ON i.id = ii.invoice_id
     WHERE ii.product_id IS NOT NULL
     ORDER BY ii.product_id ASC, i.invoice_date ASC, i.id ASC`,
    []
  );
  const saleData = Array.isArray(saleRows[0]) ? saleRows[0] : saleRows;

  // 3. Group lots by product
  const productMap = new Map<number, any>();

  for (const row of lotData) {
    const pid = row.product_id;
    if (!productMap.has(pid)) {
      productMap.set(pid, {
        product_id: pid,
        item_name: row.item_name,
        lots: [],
        ledger: [],
      });
    }
    const qtyReceived = Number(row.qty_received);
    const totalCost = Number(row.total_cost);
    const unitCost = qtyReceived > 0 ? totalCost / qtyReceived : 0;

    const lot = {
      lot_id: `PO-${row.po_id}`,
      po_number: row.po_number,
      po_date: row.po_date,
      qty_received: qtyReceived,
      qty_remaining: qtyReceived,
      unit_cost: unitCost,
    };

    const product = productMap.get(pid);
    product.lots.push(lot);
    product.ledger.push({
      date: row.po_date,
      type: 'purchase',
      reference: row.po_number,
      quantity: qtyReceived,
      unit_cost: unitCost,
      lot_id: lot.lot_id,
      remaining_after: qtyReceived,
    });
  }

  // 4. Walk sales in date order, deplete oldest lot first (FIFO)
  for (const row of saleData) {
    const pid = row.product_id;
    const product = productMap.get(pid);
    if (!product) continue; // sold but never received via a tracked PO

    let qtyToDeplete = Number(row.qty_sold);

    for (const lot of product.lots) {
      if (qtyToDeplete <= 0) break;
      if (lot.qty_remaining <= 0) continue;

      const take = Math.min(lot.qty_remaining, qtyToDeplete);
      lot.qty_remaining -= take;
      qtyToDeplete -= take;

      product.ledger.push({
        date: row.invoice_date,
        type: 'sale',
        reference: row.invoice_number,
        quantity: -take,
        unit_cost: lot.unit_cost,
        lot_id: lot.lot_id,
        remaining_after: lot.qty_remaining,
      });
    }

    // Oversold beyond all tracked lots — no purchase cost basis on record
    if (qtyToDeplete > 0) {
      product.ledger.push({
        date: row.invoice_date,
        type: 'sale',
        reference: row.invoice_number,
        quantity: -qtyToDeplete,
        unit_cost: 0,
        lot_id: 'UNALLOCATED',
        remaining_after: null,
        note: 'Exceeds tracked FIFO lots — no purchase cost on record',
      });
    }
  }

  // 5. Sort each product's ledger chronologically (purchases before sales on same date)
  return Array.from(productMap.values()).map((product) => {
    const ledger = product.ledger.slice().sort((a: any, b: any) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      if (dateA !== dateB) return dateA - dateB;
      return a.type === 'purchase' ? -1 : 1;
    });

    return {
      product_id: product.product_id,
      item_name: product.item_name,
      lots: product.lots.map((l: any) => ({
        ...l,
        status: l.qty_remaining > 0 ? 'active' : 'depleted',
      })),
      ledger,
    };
  });
};
// Add this to report.service.ts

export const getCustomerSummary = async () => {
  const query = `
    SELECT
      c.id AS customer_id,
      c.display_name AS customer_name,
      c.email,
      COALESCE(c.phone_mobile, c.phone_work) AS phone,
      COUNT(DISTINCT i.id) AS total_invoices,
      COALESCE(SUM(i.total), 0) AS total_sales,
      COALESCE((
        SELECT SUM(p.amount) FROM payments p
        WHERE p.invoice_id IN (SELECT id FROM invoices WHERE customer_id = c.id)
      ), 0) AS total_received,
      MAX(i.invoice_date) AS last_invoice_date
    FROM customers c
    LEFT JOIN invoices i ON i.customer_id = c.id
    GROUP BY c.id, c.display_name, c.email, c.phone_mobile, c.phone_work
    ORDER BY total_sales DESC
  `;

  const rows: any = await db.execute(query, []);
  const data = Array.isArray(rows[0]) ? rows[0] : rows;

  const now = new Date();
  const ninetyDaysMs = 90 * 24 * 60 * 60 * 1000;

  return data.map((row: any) => {
    const totalSales = Number(row.total_sales);
    const totalReceived = Number(row.total_received);
    const lastInvoiceDate = row.last_invoice_date ? new Date(row.last_invoice_date) : null;

    let status: 'Active' | 'Inactive' | 'No Activity' = 'No Activity';
    if (lastInvoiceDate) {
      const isRecent = now.getTime() - lastInvoiceDate.getTime() <= ninetyDaysMs;
      status = isRecent ? 'Active' : 'Inactive';
    }

    return {
      customer_id: row.customer_id,
      customer_name: row.customer_name,
      email: row.email,
      phone: row.phone,
      total_invoices: Number(row.total_invoices),
      total_sales: totalSales,
      total_received: totalReceived,
      outstanding: totalSales - totalReceived,
      last_invoice_date: row.last_invoice_date,
      status,
    };
  });
}; 


export const getCustomerAgingReport = async () => {
  const query = `
    SELECT
      c.id AS customer_id,
      c.display_name AS customer_name,
      i.id AS invoice_id,
      i.invoice_number,
      i.due_date,
      i.total,
      COALESCE((SELECT SUM(amount) FROM payments WHERE invoice_id = i.id), 0) AS paid_amount
    FROM invoices i
    JOIN customers c ON c.id = i.customer_id
    WHERE LOWER(i.status) != 'paid'
    ORDER BY c.display_name ASC, i.due_date ASC
  `;

  const rows: any = await db.execute(query, []);
  const data = Array.isArray(rows[0]) ? rows[0] : rows;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const customerMap = new Map<number, any>();

  for (const row of data) {
    const total = Number(row.total);
    const paid = Number(row.paid_amount);
    const outstanding = total - paid;

    // Fully paid via payments even though status wasn't updated — skip
    if (outstanding <= 0) continue;

    const pid = row.customer_id;
    if (!customerMap.has(pid)) {
      customerMap.set(pid, {
        customer_id: pid,
        customer_name: row.customer_name,
        current: 0,
        days_1_30: 0,
        days_31_60: 0,
        days_61_90: 0,
        days_90_plus: 0,
        total_outstanding: 0,
        invoices: [],
      });
    }

    const dueDate = row.due_date ? new Date(row.due_date) : null;
    let daysOverdue = 0;
    if (dueDate) {
      dueDate.setHours(0, 0, 0, 0);
      daysOverdue = Math.floor((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
    }

    let bucket: 'current' | 'days_1_30' | 'days_31_60' | 'days_61_90' | 'days_90_plus';
    if (daysOverdue <= 0) bucket = 'current';
    else if (daysOverdue <= 30) bucket = 'days_1_30';
    else if (daysOverdue <= 60) bucket = 'days_31_60';
    else if (daysOverdue <= 90) bucket = 'days_61_90';
    else bucket = 'days_90_plus';

    const customer = customerMap.get(pid);
    customer[bucket] += outstanding;
    customer.total_outstanding += outstanding;
    customer.invoices.push({
      invoice_id: row.invoice_id,
      invoice_number: row.invoice_number,
      due_date: row.due_date,
      outstanding,
      days_overdue: daysOverdue,
    });
  }

  return Array.from(customerMap.values())
    .map((c) => ({
      ...c,
      current: Number(c.current.toFixed(2)),
      days_1_30: Number(c.days_1_30.toFixed(2)),
      days_31_60: Number(c.days_31_60.toFixed(2)),
      days_61_90: Number(c.days_61_90.toFixed(2)),
      days_90_plus: Number(c.days_90_plus.toFixed(2)),
      total_outstanding: Number(c.total_outstanding.toFixed(2)),
    }))
    .sort((a, b) => b.total_outstanding - a.total_outstanding);
};

// Add this to report.service.ts

export const getLeadSummary = async () => {
  // Overall status breakdown
  const statusRows: any = await db.execute(
    `SELECT status, COUNT(*) AS count FROM leads GROUP BY status`,
    []
  );
  const statusData = Array.isArray(statusRows[0]) ? statusRows[0] : statusRows;

  // Source breakdown
  const sourceRows: any = await db.execute(
    `SELECT COALESCE(source, 'Unknown') AS source, COUNT(*) AS count
     FROM leads GROUP BY source ORDER BY count DESC`,
    []
  );
  const sourceData = Array.isArray(sourceRows[0]) ? sourceRows[0] : sourceRows;

  // Full lead list with assigned employee name
  const leadRows: any = await db.execute(
    `SELECT
       l.id,
       l.name,
       l.email,
       l.phone,
       l.source,
       l.status,
       l.created_at,
       e.name AS assigned_to_name
     FROM leads l
     LEFT JOIN hrms_employees e ON e.id = l.assigned_to
     ORDER BY l.created_at DESC`,
    []
  );
  const leadData = Array.isArray(leadRows[0]) ? leadRows[0] : leadRows;

  const statusCounts: Record<string, number> = {
    New: 0,
    Contacted: 0,
    Qualified: 0,
    Lost: 0,
    Won: 0,
  };
  for (const row of statusData) {
    statusCounts[row.status] = Number(row.count);
  }

  const totalLeads = Object.values(statusCounts).reduce((sum, c) => sum + c, 0);

  return {
    total_leads: totalLeads,
    status_breakdown: statusCounts,
    source_breakdown: sourceData.map((row: any) => ({
      source: row.source,
      count: Number(row.count),
    })),
    leads: leadData.map((row: any) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      source: row.source,
      status: row.status,
      assigned_to_name: row.assigned_to_name,
      created_at: row.created_at,
    })),
  };
};

// Add this to report.service.ts

export const getCustomerTransactions = async () => {
  const query = `
    SELECT
      'Invoice' AS type,
      i.invoice_number AS reference,
      i.invoice_date AS date,
      c.id AS customer_id,
      c.display_name AS customer_name,
      i.total AS amount,
      i.status AS status
    FROM invoices i
    JOIN customers c ON c.id = i.customer_id

    UNION ALL

    SELECT
      'Payment' AS type,
      COALESCE(p.payment_number, CONCAT('PAY-', p.id)) AS reference,
      p.payment_date AS date,
      c.id AS customer_id,
      c.display_name AS customer_name,
      p.amount AS amount,
      NULL AS status
    FROM payments p
    JOIN invoices i ON i.id = p.invoice_id
    JOIN customers c ON c.id = i.customer_id

    ORDER BY date DESC
  `;

  const rows: any = await db.execute(query, []);
  const data = Array.isArray(rows[0]) ? rows[0] : rows;

  return data.map((row: any) => ({
    type: row.type,
    reference: row.reference,
    date: row.date,
    customer_id: row.customer_id,
    customer_name: row.customer_name,
    amount: Number(row.amount),
    status: row.status,
  }));
};