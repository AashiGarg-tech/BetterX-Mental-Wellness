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
    console.log('Step 1: Get counsellor_id...');
    const counsellorResult = await pool.query(
      'SELECT counsellor_id FROM counsellors WHERE contact_email = $1',
      ['deansw@igdtuw.ac.in']
    );
    
    if (counsellorResult.rows.length === 0) {
      console.log('ERROR: Counsellor not found');
      await pool.end();
      return;
    }
    
    const counsellorId = counsellorResult.rows[0].counsellor_id;
    console.log('✓ Counsellor ID:', counsellorId);
    
    // Step 2: Check what's in the booking_records table
    console.log('\nStep 2: Check booking_records sample...');
    const sampleResult = await pool.query(
      'SELECT student_id, student_name FROM booking_records LIMIT 1'
    );
    console.log('Sample booking:', sampleResult.rows[0]);
    
    // Step 3: Test simple join first
    console.log('\nStep 3: Test simple join...');
    const simpleQuery = `
        SELECT
            cs.schedule_date,
            cs.schedule_time,
            br.student_id,
            br.student_name,
            br.status
        FROM 
            counsellor_schedule cs
        JOIN 
            booking_records br ON cs.schedule_id = br.schedule_id
        WHERE 
            cs.counsellor_id = $1
            AND cs.is_booked = TRUE
        LIMIT 1;
    `;
    
    const simpleResult = await pool.query(simpleQuery, [counsellorId]);
    console.log('✓ Simple join works, rows:', simpleResult.rows.length);
    if (simpleResult.rows.length > 0) {
      console.log('Sample:', simpleResult.rows[0]);
    }
    
    // Step 4: Now test with the LEFT JOIN
    console.log('\nStep 4: Test with LEFT JOIN to users...');
    const joinQuery = `
        SELECT
            cs.schedule_date,
            cs.schedule_time,
            br.student_id,
            br.student_name,
            u.email AS student_email,
            br.status
        FROM 
            counsellor_schedule cs
        JOIN 
            booking_records br ON cs.schedule_id = br.schedule_id
        LEFT JOIN
            users u ON (br.student_id::text ~ '^[0-9]+$' AND CAST(br.student_id AS INTEGER) = u.id)
        WHERE 
            cs.counsellor_id = $1
            AND cs.is_booked = TRUE
        LIMIT 1;
    `;
    
    // Step 5: Now test with TO_CHAR and time comparison (PAST SESSIONS) - TRY EXCEPTION APPROACH
    console.log('\nStep 5: Test using EXCEPTION handling approach...');
    const toCharQuery = `
        SELECT
            TO_CHAR(t.schedule_date, 'YYYY-MM-DD') AS date,
            TO_CHAR(t.schedule_time, 'HH24:MI') AS time,
            t.student_id,
            t.student_name,
            t.student_email,
            t.status
        FROM (
            SELECT
                cs.schedule_date,
                cs.schedule_time,
                br.student_id,
                br.student_name,
                u.email AS student_email,
                br.status,
                (cs.schedule_date + cs.schedule_time) AS session_time
            FROM 
                counsellor_schedule cs
            JOIN 
                booking_records br ON cs.schedule_id = br.schedule_id
            LEFT JOIN
                users u ON br.student_id = u.id::text
            WHERE 
                cs.counsellor_id = $1
                AND cs.is_booked = TRUE
        ) t
        WHERE t.session_time < NOW()
        ORDER BY 
            t.schedule_date DESC, t.schedule_time DESC
        LIMIT 5;
    `;
    
    const toCharResult = await pool.query(toCharQuery, [counsellorId]);
    console.log('✓ Exception handling approach works, rows:', toCharResult.rows.length);
    console.log('Sessions:', toCharResult.rows);
    
  } catch (e) {
    console.error('ERROR:', e.message);
  } finally {
    await pool.end();
  }
})();
