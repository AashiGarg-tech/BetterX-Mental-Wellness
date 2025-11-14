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
  ssl: {
    rejectUnauthorized: false,
  },
});

async function checkUserGrowth() {
  try {
    console.log('🔍 Connecting to database...\n');

    // Query 1: Total users by role
    console.log('--- Total Users by Role ---');
    const roleCount = await pool.query(`
      SELECT role, COUNT(*) as count
      FROM users
      GROUP BY role
      ORDER BY count DESC;
    `);
    console.table(roleCount.rows);

    // Query 2: Users with role='user' grouped by month
    console.log('\n--- Users (role=user) by Month ---');
    const monthlyGrowth = await pool.query(`
      SELECT 
        to_char(date_trunc('month', created_at), 'YYYY-MM') AS month,
        COUNT(*)::int AS count
      FROM users
      WHERE role = 'user'
        AND created_at >= (CURRENT_DATE - INTERVAL '11 months')
      GROUP BY 1
      ORDER BY 1;
    `);
    console.table(monthlyGrowth.rows);

    // Query 3: Sample of 5 users with role='user'
    console.log('\n--- Sample of Users (role=user) ---');
    const sampleUsers = await pool.query(`
      SELECT id, name, email, role, created_at
      FROM users
      WHERE role = 'user'
      ORDER BY created_at DESC
      LIMIT 5;
    `);
    console.table(sampleUsers.rows);

    // Query 4: Date range of users with role='user'
    console.log('\n--- Date Range of Users (role=user) ---');
    const dateRange = await pool.query(`
      SELECT 
        MIN(created_at) as earliest_signup,
        MAX(created_at) as latest_signup,
        COUNT(*) as total_count
      FROM users
      WHERE role = 'user';
    `);
    console.table(dateRange.rows);

  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await pool.end();
    console.log('\n✅ Database connection closed.');
  }
}

checkUserGrowth();
