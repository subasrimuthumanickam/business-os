import { createPool, type Pool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const mysqlPool: Pool = createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'business_os',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const db = {
  get: (sql: string, params: any[], callback: (err: any, row: any) => void) => {
    mysqlPool
      .query(sql, params)
      .then(([results]) => {
        const row = Array.isArray(results) && results.length > 0 ? results[0] : null;
        callback(null, row);
      })
      .catch((err) => callback(err, null));
  },

  run: function (sql: string, params: any[], callback: (this: any, err: any) => void) {
    mysqlPool
      .query(sql, params)
      .then(([results]) => {
        const context = {
          lastID: (results as any)?.insertId || null,
          changes: (results as any)?.affectedRows || 0
        };
        callback.call(context, null);
      })
      .catch((err) => callback(err));
  },

  all: (sql: string, params: any[], callback: (err: any, rows: any[]) => void) => {
    mysqlPool
      .query(sql, params)
      .then(([results]) => {
        const rows = Array.isArray(results) ? results : [];
        callback(null, rows);
      })
      .catch((err) => callback(err, []));
  },

  execute: async (sql: string, params?: any[]) => {
    try {
      const [results] = await mysqlPool.execute(sql, params);
      return results;
    } catch (err) {
      throw err;
    }
  }
};

export { mysqlPool as pool };
export default db;