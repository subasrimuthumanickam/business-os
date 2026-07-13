import db from '../config/db.js';

export const getRevenueStats = async () => {
  const thisMonthRows: any = await db.execute(
    `SELECT COALESCE(SUM(total),0) as revenue FROM invoices 
     WHERE MONTH(invoice_date) = MONTH(CURDATE()) AND YEAR(invoice_date) = YEAR(CURDATE())`
  );
  const lastMonthRows: any = await db.execute(
    `SELECT COALESCE(SUM(total),0) as revenue FROM invoices 
     WHERE MONTH(invoice_date) = MONTH(CURDATE() - INTERVAL 1 MONTH) 
     AND YEAR(invoice_date) = YEAR(CURDATE() - INTERVAL 1 MONTH)`
  );

  const thisMonth = Number(thisMonthRows[0]?.revenue || 0);
  const lastMonth = Number(lastMonthRows[0]?.revenue || 0);
  const growth = lastMonth > 0
    ? Number((((thisMonth - lastMonth) / lastMonth) * 100).toFixed(1))
    : 0;

  return { thisMonth, growth };
};

export const getCustomerStats = async () => {
  const totalRows: any = await db.execute(`SELECT COUNT(*) as total FROM customers`);
  const newRows: any = await db.execute(
    `SELECT COUNT(*) as newCount FROM customers 
     WHERE MONTH(created_at) = MONTH(CURDATE()) AND YEAR(created_at) = YEAR(CURDATE())`
  );
  return {
    total: Number(totalRows[0]?.total || 0),
    newThisMonth: Number(newRows[0]?.newCount || 0),
  };
};

export const getProductStats = async () => {
  const totalRows: any = await db.execute(`SELECT COUNT(*) as total FROM products WHERE status = 'active'`);
  const lowStockRows: any = await db.execute(`SELECT COUNT(*) as lowStock FROM products WHERE stock_quantity < 5`);
  return {
    total: Number(totalRows[0]?.total || 0),
    lowStock: Number(lowStockRows[0]?.lowStock || 0),
  };
};

export const getInvoiceStats = async () => {
  const totalRows: any = await db.execute(`SELECT COUNT(*) as total FROM invoices`);
  const pendingRows: any = await db.execute(`SELECT COUNT(*) as pending FROM invoices WHERE status != 'Paid'`);
  return {
    total: Number(totalRows[0]?.total || 0),
    pending: Number(pendingRows[0]?.pending || 0),
  };
};

export const getRecentActivities = async () => {
  const rows: any = await db.execute(
    `SELECT id, type, title, description, created_at as timestamp 
     FROM activities ORDER BY created_at DESC LIMIT 6`
  );
  return rows;
};

export const getTopProducts = async () => {
  const rows: any = await db.execute(
    `SELECT p.id, p.name, 
       COALESCE(SUM(ii.amount),0) as revenue, 
       COALESCE(SUM(ii.quantity),0) as quantity
     FROM products p
     JOIN invoice_items ii ON ii.product_id = p.id
     GROUP BY p.id, p.name
     ORDER BY revenue DESC
     LIMIT 4`
  );
  return rows;
};

export const getUpcomingTasks = async () => {
  const rows: any = await db.execute(
    `SELECT id, name as title, due_date as dueDate, priority
     FROM projects
     WHERE status = 'active' AND due_date IS NOT NULL
     ORDER BY due_date ASC
     LIMIT 5`
  );
  return rows;
};

export const getDashboardData = async () => {
  const [revenue, customers, products, invoices, activities, topProducts, tasks] = await Promise.all([
    getRevenueStats(),
    getCustomerStats(),
    getProductStats(),
    getInvoiceStats(),
    getRecentActivities(),
    getTopProducts(),
    getUpcomingTasks(),
  ]);

  return {
    stats: { revenue, customers, products, invoices },
    activities,
    topProducts,
    tasks,
  };
};