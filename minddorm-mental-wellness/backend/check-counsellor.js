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

async function checkCounsellor() {
  try {
    console.log('🔍 Checking counsellor deansw@igdtuw.ac.in...\n');

    // Check if counsellor exists
    const counsellorResult = await pool.query(
      'SELECT * FROM counsellors WHERE contact_email = $1',
      ['deansw@igdtuw.ac.in']
    );
    
    if (counsellorResult.rows.length === 0) {
      console.log('❌ Counsellor not found in database');
      console.log('\nAvailable counsellors:');
      const allCounsellors = await pool.query('SELECT counsellor_id, name, contact_email FROM counsellors LIMIT 10');
      console.table(allCounsellors.rows);
    } else {
      const counsellor = counsellorResult.rows[0];
      console.log('✅ Counsellor found:', counsellor);
      console.log('\n--- Upcoming Sessions ---');
      const upcomingResult = await pool.query(`
        SELECT cs.schedule_date, cs.schedule_time, br.student_name, br.status
        FROM counsellor_schedule cs
        JOIN booking_records br ON cs.schedule_id = br.schedule_id
        WHERE cs.counsellor_id = $1
          AND (cs.schedule_date + cs.schedule_time) >= NOW()
        ORDER BY cs.schedule_date ASC
        LIMIT 10;
      `, [counsellor.counsellor_id]);
      console.table(upcomingResult.rows);

      console.log('\n--- Past Sessions ---');
      const pastResult = await pool.query(`
        SELECT cs.schedule_date, cs.schedule_time, br.student_name, br.status
        FROM counsellor_schedule cs
        JOIN booking_records br ON cs.schedule_id = br.schedule_id
        WHERE cs.counsellor_id = $1
          AND (cs.schedule_date + cs.schedule_time) < NOW()
        ORDER BY cs.schedule_date DESC
        LIMIT 10;
      `, [counsellor.counsellor_id]);
      console.table(pastResult.rows);
    }

  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await pool.end();
    console.log('\n✅ Database connection closed.');
  }
}

checkCounsellor();
