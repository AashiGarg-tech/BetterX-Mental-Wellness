// import express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";
// import fetch from "node-fetch";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(bodyParser.json());

// // Use API key from environment file
// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// app.post("/api/chat", async (req, res) => {
//   const userMessage = req.body.message;

//   try {
//     const response = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: "gpt-3.5-turbo",
//         messages: [
//           { role: "system", content: "You are a supportive AI wellness chatbot." },
//           { role: "user", content: userMessage },
//         ],
//       }),
//     });

//     const data = await response.json();
//     const botReply = data.choices[0].message.content;

//     res.json({ reply: botReply });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ reply: "Sorry, something went wrong!" });
//   }
// });

// app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));



// import express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";
// import fetch from "node-fetch";
// import dotenv from "dotenv";
// //
// import mongoose from "mongoose";
// //
// import { authRoutes } from "./routes/auth.js"; // ✅ Named import

// //
// import announcementsRoutes from "./routes/announcements.js";
// import storiesRoutes from "./routes/stories.js";
// import chatRoutes from "./routes/chat.js";
// import usersRoutes from "./routes/users.js";
// //

// import pool from "./config/db.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// dotenv.config();

// const app = express();
// const PORT = 5000;

// // ✅ Allow frontend to connect (adjust port if needed)
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(bodyParser.json());


// //🔌 MongoDB Connection
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log("✅ Connected to MongoDB"))
//   .catch(err => console.error("❌ MongoDB error:", err));

// //


// // 🔐 Authentication Routes
// app.use("/api/auth", authRoutes);


// // 📣 New Feature Routes
// app.use("/api/announcements", announcementsRoutes);
// app.use("/api/stories", storiesRoutes);
// app.use("/api/chat", chatRoutes);
// app.use("/api/users", usersRoutes);
// //


// // 🤖 Chatbot Route
// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// app.post("/api/chat", async (req, res) => {
//   const userMessage = req.body.message;

//   try {
//     const response = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: "gpt-3.5-turbo",
//         messages: [
//           { role: "system", content: "You are a supportive AI wellness chatbot." },
//           { role: "user", content: userMessage },
//         ],
//       }),
//     });

//     const data = await response.json();
//     const botReply = data.choices[0].message.content;

//     res.json({ reply: botReply });
//   } catch (error) {
//     console.error("Chatbot error:", error);
//     res.status(500).json({ reply: "Sorry, something went wrong!" });
//   }
// });

// app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));

// import express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";
// import fetch from "node-fetch";
// import dotenv from "dotenv";
// import mongoose from "mongoose";

// import { authRoutes } from "./routes/auth.js"; 
// //
// import announcementsRoutes from "./routes/announcements.js";
// import storiesRoutes from "./routes/stories.js";
// import chatRoutes from "./routes/chat.js";
// import usersRoutes from "./routes/users.js";
// import chatBotRoutes from "./routes/chatServer.js";
// import assessmentRoutes from "./routes/assessmentRoutes.js";

// // 👇 IMPORT THE NEW MOOD ROUTES FILE
// import moodRoutes from "./routes/moodRoutes.js"; 
// //

// import pool from "./config/db.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// dotenv.config();

// const app = express();
// const PORT = 5050;

// // ✅ Allow frontend to connect (adjust port if needed)
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(bodyParser.json());


// //🔌 MongoDB Connection (This section is already perfect)
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log("✅ Connected to MongoDB"))
//   .catch(err => console.error("❌ MongoDB error:", err));


// // 🔐 Authentication Routes
// app.use("/api/auth", authRoutes);


// // 📣 New Feature Routes
// app.use("/api/announcements", announcementsRoutes);
// app.use("/api/stories", storiesRoutes);
// app.use("/api/chat", chatRoutes);
// app.use("/api/users", usersRoutes);
// // 🤖 Gemini ChatBot Routes
// app.use("/api/gemini-chat", chatBotRoutes);
// app.use("/api/assessment", assessmentRoutes(pool));
// // 👇 REGISTER THE NEW MOOD TRACKER ROUTES
// app.use("/api/moods", moodRoutes); 
// //


// // 🤖 Chatbot Route (Existing code unchanged)
// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// app.post("/api/chat", async (req, res) => {
//   const userMessage = req.body.message;

//   try {
//     const response = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: "gpt-3.5-turbo",
//         messages: [
//           { role: "system", content: "You are a supportive AI wellness chatbot." },
//           { role: "user", content: userMessage },
//         ],
//       }),
//     });

//     const data = await response.json();
//     const botReply = data.choices[0].message.content;

//     res.json({ reply: botReply });
//   } catch (error) {
//     console.error("Chatbot error:", error);
//     res.status(500).json({ reply: "Sorry, something went wrong!" });
//   }
// });

// app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import { authRoutes } from "./routes/auth.js"; 
import announcementsRoutes from "./routes/announcements.js";
import storiesRoutes from "./routes/stories.js";
import chatRoutes from "./routes/chat.js";
import usersRoutes from "./routes/users.js";
import chatBotRoutes from "./routes/chatServer.js";
import assessmentRoutes from "./routes/assessmentRoutes.js";
import moodRoutes from "./routes/moodRoutes.js"; 
import userStatsRoutes from "./routes/userStatsRoutes.js";

import pool from "./config/db.js"; 
// ⚠️ IMPORTANT: Assuming you have this middleware
import authenticateToken from './middleware/authenticateToken.js'; 

// CRITICAL FIX: Call dotenv.config() immediately after ALL imports
dotenv.config();

const app = express();
const PORT = 5050;

// Middleware for parsing and CORS
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());
app.use(express.json());

// 🔌 MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB error:", err));

// Ensure refresh_tokens table exists in Postgres
async function ensureRefreshTokensTable() {
    try {
        const createSql = `
            CREATE TABLE IF NOT EXISTS refresh_tokens (
                token TEXT PRIMARY KEY,
                user_id INTEGER NOT NULL,
                issued_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
                expires_at TIMESTAMP WITH TIME ZONE
            );
        `;
        await pool.query(createSql);
        console.log('✅ refresh_tokens table ensured');
    } catch (err) {
        console.warn('Could not ensure refresh_tokens table at startup:', err.message);
    }
}
ensureRefreshTokensTable();

// ----------------------------------------------------
//         🛡️ ROLE CHECK MIDDLEWARE 
// ----------------------------------------------------

/**
 * Middleware to check if the authenticated user has the 'superadmin' role.
 */
const authenticateSuperAdmin = (req, res, next) => {
    // If authenticateToken didn't run or didn't attach the role, deny access.
    if (!req.userRole || req.userRole !== 'superadmin') {
        return res.status(403).json({ success: false, message: "Forbidden: Super Admin access required." });
    }
    next();
};

// ----------------------------------------------------
//          🛡️ COUNSELLING BOOKING ROUTES (PostgreSQL)
// ----------------------------------------------------

// 1. GET /api/counsellors/availability (Publicly accessible)
app.get('/api/counsellors/availability', async (req, res) => {
    try {
        const query = `
            SELECT
                cs.schedule_id,
                c.name,
                c.title,
                cs.schedule_date,
                cs.schedule_time
            FROM 
                counsellor_schedule cs
            JOIN 
                counsellors c ON cs.counsellor_id = c.counsellor_id
            WHERE 
                cs.is_booked = FALSE
                AND (cs.schedule_date + cs.schedule_time) >= NOW() 
            ORDER BY 
                cs.schedule_date ASC, cs.schedule_time ASC;
        `;
        const { rows } = await pool.query(query);
        res.json(rows);
    } catch (err) {
        console.error("Error fetching availability:", err);
        res.status(500).json({ error: "Failed to fetch schedule data." });
    }
});

// 2. 🔒 GET /api/bookings/my-appointments (Requires JWT)
app.get('/api/bookings/my-appointments', authenticateToken, async (req, res) => {
    // ID securely attached by the middleware
    const studentEnrollmentNumber = req.userId; 

    try {
        const query = `
            SELECT
                br.booking_id,
                br.status,
                c.name AS counsellor_name,
                c.title AS counsellor_title,
                cs.schedule_date,
                cs.schedule_time
            FROM 
                booking_records br
            JOIN 
                counsellor_schedule cs ON br.schedule_id = cs.schedule_id
            JOIN 
                counsellors c ON cs.counsellor_id = c.counsellor_id
            WHERE 
                br.student_id = $1
                AND (cs.schedule_date + cs.schedule_time) >= NOW() 
            ORDER BY 
                cs.schedule_date ASC, cs.schedule_time ASC;
        `;
        const { rows } = await pool.query(query, [studentEnrollmentNumber]);
        res.json(rows);
    } catch (err) {
        console.error("Error fetching secure student bookings:", err);
        res.status(500).json({ error: "Failed to retrieve booking history." });
    }
});

app.get('/api/bookings/my-past-sessions', authenticateToken, async (req, res) => {
    const studentEnrollmentNumber = req.userId; 

    try {
        const query = `
            SELECT
                br.booking_id,
                br.status,
                c.name AS counsellor_name,
                c.title AS counsellor_title,
                cs.schedule_date,
                cs.schedule_time
            FROM 
                booking_records br
            JOIN 
                counsellor_schedule cs ON br.schedule_id = cs.schedule_id
            JOIN 
                counsellors c ON cs.counsellor_id = c.counsellor_id
            WHERE 
                br.student_id = $1
                AND (cs.schedule_date + cs.schedule_time) < NOW() 
                AND br.status IN ('Completed', 'Confirmed') 
            ORDER BY 
                cs.schedule_date DESC, cs.schedule_time DESC; 
        `;
        const { rows } = await pool.query(query, [studentEnrollmentNumber]);
        res.json(rows);
    } catch (err) {
        console.error("Error fetching secure past student sessions:", err);
        res.status(500).json({ error: "Failed to retrieve past session history." });
    }
});


// 3. 🔒 POST /api/bookings/create (Requires JWT + Transaction)
app.post('/api/bookings/create', authenticateToken, async (req, res) => {
    // CRITICAL FIX: Get the secure ID from the middleware, NOT req.body
    const studentEnrollmentNumber = req.userId;
    const { schedule_id, student_name } = req.body; 
    
    if (!schedule_id || !student_name) {
        return res.status(400).json({ success: false, message: "Missing schedule ID or student name." });
    }
    
    const client = await pool.connect(); 

    try {
        await client.query('BEGIN');

        const checkQuery = `
            SELECT is_booked
            FROM counsellor_schedule
            WHERE schedule_id = $1
            FOR UPDATE;
        `;
        const result = await client.query(checkQuery, [schedule_id]);

        if (result.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ success: false, message: "Schedule slot not found." });
        }
        if (result.rows[0].is_booked === true) {
            await client.query('ROLLBACK');
            return res.status(409).json({ success: false, message: "This slot was just booked by another student. Please choose another one." });
        }

        const updateQuery = `
            UPDATE counsellor_schedule
            SET is_booked = TRUE
            WHERE schedule_id = $1;
        `;
        await client.query(updateQuery, [schedule_id]);

        const insertQuery = `
            INSERT INTO booking_records (schedule_id, student_id, student_name, status)
            VALUES ($1, $2, $3, 'Confirmed')
            RETURNING booking_id;
        `;
        const bookingResult = await client.query(insertQuery, [schedule_id, studentEnrollmentNumber, student_name]);

        await client.query('COMMIT'); 

        res.json({ 
            success: true, 
            message: "Booking confirmed successfully.", 
            booking_id: bookingResult.rows[0].booking_id 
        });

    } catch (err) {
        await client.query('ROLLBACK'); 
        console.error("Booking transaction failed:", err);
        res.status(500).json({ success: false, message: "An internal server error occurred during booking." });
    } finally {
        client.release(); 
    }
});

// ----------------------------------------------------
//         👑 SUPER ADMIN BOOKING ROUTES 
// ----------------------------------------------------

// 4. 🔒 GET /api/admin/all-booked-slots
app.get('/api/admin/all-booked-slots', authenticateToken, authenticateSuperAdmin, async (req, res) => {
    try {
        const query = `
            SELECT
                cs.schedule_date AS date,
                cs.schedule_time AS time,
                c.counsellor_id, 
                c.name AS counselor_name,
                c.title AS specialization
            FROM 
                counsellor_schedule cs
            JOIN 
                counsellors c ON cs.counsellor_id = c.counsellor_id
            JOIN
                booking_records br ON cs.schedule_id = br.schedule_id 
            WHERE 
                cs.is_booked = TRUE 
                AND (cs.schedule_date + cs.schedule_time) >= NOW() 
                AND br.status = 'Confirmed'
            ORDER BY 
                cs.schedule_date ASC, cs.schedule_time ASC;
        `;
        const { rows } = await pool.query(query);

        // Map and format the results for the frontend
        const slots = rows.map(row => ({
            date: row.date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
            time: row.time,
            counsellor_id: row.counsellor_id, // Pass ID for filtering
            counselor_name: row.counselor_name,
            specialization: row.specialization
        }));
        
        res.json({ slots });
    } catch (err) {
        console.error("Error fetching all booked slots for admin:", err);
        res.status(500).json({ error: "Failed to fetch global booked schedule data." });
    }
});

// 5. 🔒 GET /api/admin/counselors-roster-with-load
app.get('/api/admin/counselors-roster-with-load', authenticateToken, authenticateSuperAdmin, async (req, res) => {
    try {
        const query = `
            SELECT
                c.counsellor_id AS id,
                c.name,
                c.title AS specialization,
                c.contact_email,
                COUNT(br.booking_id) AS "activeBookings"
            FROM
                counsellors c
            LEFT JOIN
                counsellor_schedule cs ON c.counsellor_id = cs.counsellor_id
            LEFT JOIN
                booking_records br ON cs.schedule_id = br.schedule_id
                                    AND (cs.schedule_date + cs.schedule_time) >= NOW() 
                                    AND br.status = 'Confirmed'
            GROUP BY
                c.counsellor_id, c.name, c.title, c.contact_email
            ORDER BY
                c.name;
        `;
        const { rows } = await pool.query(query);

        // Map the contact_email to a generic 'email' key for frontend consistency
        const roster = rows.map(row => ({
            ...row,
            email: row.contact_email // Keep the frontend expecting 'email'
        }));

        res.json({ roster: roster });
    } catch (err) {
        console.error("Error fetching counselor roster with load:", err);
        res.status(500).json({ error: "Failed to fetch counselor management data." });
    }
});


// ----------------------------------------------------
//         🧑‍💼 COUNSELOR PORTAL ROUTE (NEW)
// ----------------------------------------------------

// 6. 🔒 GET /api/staff/my-bookings
app.get('/api/staff/my-bookings', authenticateToken, async (req, res) => {
    // CRITICAL: Ensure authenticateToken middleware attaches email and role
    const counselorEmail = req.userEmail;
    const userRole = req.userRole;

    if (userRole !== 'counsellor' && userRole !== 'superadmin') {
        return res.status(403).json({ success: false, message: "Access Denied. Only counselors can view this portal." });
    }

    // ⭐ FIX: Prevent server crash if the email is missing from the token payload
    if (!counselorEmail) {
        console.error("Authentication Error: Token payload is missing user email (req.userEmail).");
        return res.status(401).json({ error: "Authentication details incomplete. Please re-login." });
    }

    try {
        // 1. Find the counsellor_id using the email
        const counselorResult = await pool.query(
            'SELECT counsellor_id FROM counsellors WHERE contact_email = $1',
            [counselorEmail]
        );
        
        if (counselorResult.rows.length === 0) {
            // This happens if a user with 'counsellor' role is not in the 'counsellors' table
            // This is a 404, not a 500, which is correct error handling.
            return res.status(404).json({ error: "Counselor profile not found in database." });
        }
        
        const counsellorId = counselorResult.rows[0].counsellor_id;

        // 2. Fetch only the appointments tied to that counsellor_id
        const query = `
            SELECT
                cs.schedule_date AS date,
                cs.schedule_time AS time,
                br.student_name,  -- Counselor needs to see who they are meeting
                br.status
            FROM 
                counsellor_schedule cs
            JOIN 
                booking_records br ON cs.schedule_id = br.schedule_id
            WHERE 
                cs.counsellor_id = $1 
                AND cs.is_booked = TRUE
                -- Only show appointments that haven't passed
                AND (cs.schedule_date + cs.schedule_time) >= NOW() 
            ORDER BY 
                cs.schedule_date ASC, cs.schedule_time ASC;
        `;
        const { rows } = await pool.query(query, [counsellorId]);
        
        // Rows contain only the logged-in counselor's upcoming appointments
        res.json({ bookings: rows });
    } catch (err) {
        console.error("Error fetching secure counselor bookings:", err);
        // Fallback for general database errors
        res.status(500).json({ error: "Failed to retrieve personal schedule due to internal server error." });
    }
});


// ----------------------------------------------------
//                ⚡ EXISTING ROUTES
// ----------------------------------------------------

// 🔐 Authentication Routes
app.use("/api/auth", authRoutes);

// 📣 Feature Routes
app.use("/api/announcements", announcementsRoutes);
app.use("/api/stories", storiesRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/users", usersRoutes);

// 🤖 Gemini ChatBot Routes
app.use("/api/gemini-chat", chatBotRoutes);

// 📊 Assessment Routes
app.use("/api/assessment", assessmentRoutes(pool));

// 🎭 MOOD TRACKER ROUTES (NEW)
app.use("/api/mood", moodRoutes(pool)); 
app.use("/api/user-stats", userStatsRoutes(pool));


// 🤖 Chatbot Route (OpenAI)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/api/chatbot", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a supportive AI wellness chatbot." },
          { role: "user", content: userMessage },
        ],
      }),
    });

    const data = await response.json();
    const botReply = data.choices[0].message.content;

    res.json({ reply: botReply });
  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({ reply: "Sorry, something went wrong!" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📡 Booking API endpoints active.`);
});