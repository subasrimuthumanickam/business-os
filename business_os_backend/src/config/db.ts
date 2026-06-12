// src/config/db.ts
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Create a connection pool to MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'business_os',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Wrapper object matching SQLite behavior...
const db = {
  get: (sql: string, params: any[], callback: (err: any, row: any) => void) => {
    pool.query(sql, params, (err, results: any) => {
      if (err) return callback(err, null);
      const row = results && results.length > 0 ? results[0] : null;
      callback(null, row);
    });
  },

  run: function (sql: string, params: any[], callback: (this: any, err: any) => void) {
    pool.query(sql, params, function (err, results: any) {
      if (err) return callback(err);
      
      const context = {
        lastID: results?.insertId || null,
        changes: results?.affectedRows || 0
      };
      
      callback.call(context, null);
    });
  }
};

export default db;