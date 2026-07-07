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