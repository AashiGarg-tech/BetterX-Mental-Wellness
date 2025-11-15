import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: { rejectUnauthorized: false }
});

(async () => {
  try {
    console.log('Checking superadmin@gmail.com...');
    const result = await pool.query(
      'SELECT id, email, role, name FROM users WHERE email = $1 OR role = $2',
      ['superadmin@gmail.com', 'superadmin']
    );
    console.log('Users found:', result.rows);
    
    if (result.rows.length === 0) {
      console.log('\nNo superadmin user found. Creating one...');
      const bcrypt = await import('bcrypt');
      const hash = await bcrypt.default.hash('admin123', 10);
      const insertResult = await pool.query(
        'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *',
        ['Super Admin', 'superadmin@gmail.com', hash, 'superadmin']
      );
      console.log('Created user:', insertResult.rows[0]);
    }
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await pool.end();
  }
})();
