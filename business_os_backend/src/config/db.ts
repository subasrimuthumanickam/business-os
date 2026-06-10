import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

console.log("HOST =", process.env.DB_HOST);
console.log("USER =", process.env.DB_USER);
console.log("PASSWORD =", JSON.stringify(process.env.DB_PASSWORD));
console.log("DB =", process.env.DB_NAME);

// Create a connection pool to MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST ?? 'localhost',
  user: process.env.DB_USER ?? 'root',
  // Fix: Ensure an empty string "" from .env is preserved and not replaced by 'root'
  password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : 'root',
  database: process.env.DB_NAME ?? 'business_os',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// A wrapper object to emulate the SQLite syntax (get/run) used in your server.ts
const db = {
  // Executes a query expecting a single row result
  get: (sql: string, params: any[], callback: (err: any, row: any) => void) => {
    pool.query(sql, params, (err, results: any) => {
      if (err) return callback(err, null);
      // MySQL returns an array; return the first element to match SQLite's db.get behavior
      const row = results && results.length > 0 ? results[0] : null;
      callback(null, row);
    });
  },

  // Executes an INSERT, UPDATE, or DELETE query
  run: function (sql: string, params: any[], callback: (this: any, err: any) => void) {
    pool.query(sql, params, function (err, results: any) {
      if (err) return callback(err);
      
      // Contextual object matching SQLite's 'this.lastID' and 'this.changes'
      const context = {
        lastID: results?.insertId || null,
        changes: results?.affectedRows || 0
      };
      
      callback.call(context, null);
    });
  }
};

export default db;