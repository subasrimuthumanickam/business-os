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
  // const invFilter = from && to ? `AND DATE(invoice_date) BETWEEN '${from}' AND '${to}'` : '';
  // const expFilter = from && to ? `AND DATE(expense_date) BETWEEN '${from}' AND '${to}'` : '';

  let invFilter = "";
  let expFilter = "";
  
  const revenueRows: any = await db.execute(
    `SELECT COALESCE(SUM(subtotal),0) AS subtotal, COALESCE(SUM(tax),0) AS tax, COALESCE(SUM(total),0) AS total
     FROM invoices WHERE LOWER(status)='paid' ${invFilter}`,[]
  );

 const expenseRows: any = await db.execute(
    `SELECT ea.name AS category, COALESCE(SUM(e.amount),0) AS total
     FROM expenses e
     JOIN expense_accounts ea ON e.expense_account_id = ea.id
     WHERE 1=1 ${expFilter}
     GROUP BY ea.name ORDER BY total DESC`,[]
  );

  const rev = Array.isArray(revenueRows[0]) ? revenueRows[0][0] : revenueRows[0];
  const exps = Array.isArray(expenseRows[0]) ? expenseRows[0] : expenseRows;
  const totalExpenses = exps.reduce((s: number, e: any) => s + Number(e.total), 0);
  const totalRevenue = Number(rev?.total || 0);

  return {
    revenue: { subtotal: Number(rev?.subtotal||0), tax: Number(rev?.tax||0), total: totalRevenue },
    expenses: { breakdown: exps.map((e: any) => ({ category: e.category||'Uncategorized', total: Number(e.total) })), total: totalExpenses },
    grossProfit: Number(rev?.subtotal||0),
    netProfit: totalRevenue - totalExpenses,
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