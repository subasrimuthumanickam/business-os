// import mysql from 'mysql2';
// import dotenv from 'dotenv';

// dotenv.config();

// // Create a connection pool to MySQL
// const mysqlPool = mysql.createPool({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || '',
//   database: process.env.DB_NAME || 'business_os',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// const pool = mysqlPool.promise();

// // Wrapper object matching SQLite behavior... (UPDATED)
// const db = {
//   get: (sql: string, params: any[], callback: (err: any, row: any) => void) => {
//     mysqlPool.query(sql, params, (err, results: any) => {
//       if (err) return callback(err, null);
//       const row = results && results.length > 0 ? results[0] : null;
//       callback(null, row);
//     });
//   },

//   run: function (sql: string, params: any[], callback: (this: any, err: any) => void) {
//     mysqlPool.query(sql, params, function (err, results: any) {
//       if (err) return callback(err);
//       
//       const context = {
//         lastID: results?.insertId || null,
//         changes: results?.affectedRows || 0
//       };
//       
//       callback.call(context, null);
//     });
//   },

//   // ⚠️ ADD THIS NEW METHOD HERE: For fetching multiple rows/arrays matching SQLite behavior
//   all: (sql: string, params: any[], callback: (err: any, rows: any[]) => void) => {
//     mysqlPool.query(sql, params, (err, results: any) => {
//       if (err) return callback(err, []);
//       // Ensure it always returns an array
//       const rows = Array.isArray(results) ? results : [];
//       callback(null, rows);
//     });
//   }
// };

// export { pool };
// export default db;

import mysql from 'mysql2';
import type { Pool } from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Create a connection pool to MySQL
const mysqlPool: Pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'business_os',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Helper for promise-based queries
const promisePool = mysqlPool.promise();

const db = {
  // Method to get a single row
  get: (sql: string, params: any[], callback: (err: any, row: any) => void) => {
    mysqlPool.query(sql, params, (err, results: any) => {
      if (err) return callback(err, null);
      const row = results && results.length > 0 ? results[0] : null;
      callback(null, row);
    });
  },

  // Method to execute queries (UPDATE/INSERT/DELETE)
  run: function (sql: string, params: any[], callback: (this: any, err: any) => void) {
    mysqlPool.query(sql, params, function (err, results: any) {
      if (err) return callback(err);
      
      const context = {
        lastID: results?.insertId || null,
        changes: results?.affectedRows || 0
      };
      
      callback.call(context, null);
    });
  },

  // Method to get all rows
  all: (sql: string, params: any[], callback: (err: any, rows: any[]) => void) => {
    mysqlPool.query(sql, params, (err, results: any) => {
      if (err) return callback(err, []);
      const rows = Array.isArray(results) ? results : [];
      callback(null, rows);
    });
  },

  // 🎯 FIXED: Added the execute method using the promisePool
  execute: async (sql: string, params: any[]) => {
    try {
      const [results] = await promisePool.execute(sql, params);
      return results;
    } catch (err) {
      throw err;
    }
  }
};

export { promisePool as pool }; // Exporting the promise pool for model use
export default db;