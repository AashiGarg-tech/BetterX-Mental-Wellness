// import express from 'express';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import pool from '../config/db.js';

// const router = express.Router();

// router.post('/signup', async (req, res) => {
//   const { name, email, password } = req.body; // ✅ Extract name
  
//   if (!name || !email || !password) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   try {
//     const hash = await bcrypt.hash(password, 10);
//     await pool.query(
//       'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)', // ✅ Include name
//       [name, email, hash]
//     );
//     res.status(201).json({ message: 'Signup successful' });
//   } catch (err) {
//     console.error('Signup error:', err);
//     if (err.code === '23505') { // PostgreSQL unique violation
//       res.status(400).json({ error: 'Email already exists' });
//     } else {
//       res.status(500).json({ error: 'Signup failed' });
//     }
//   }
// });

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
  
//   if (!email || !password) {
//     return res.status(400).json({ error: 'Email and password required' });
//   }

//   try {
//     const result = await pool.query(
//       'SELECT * FROM users WHERE email = $1',
//       [email]
//     );
//     const user = result.rows[0];
//     if (!user) return res.status(401).json({ error: 'Invalid credentials' });

//     const match = await bcrypt.compare(password, user.password_hash);
//     if (!match) return res.status(401).json({ error: 'Invalid credentials' });

//     const token = jwt.sign(
//       { userId: user.id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );
//     res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ error: 'Login failed' });
//   }
// });

// export const authRoutes = router;



import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const router = express.Router();

// Access tokens short-lived, refresh tokens long-lived.
// Required env vars:
// - JWT_SECRET (for access tokens)
// - JWT_REFRESH_SECRET (for refresh tokens)
// Optional: create a DB table for refresh tokens:
// CREATE TABLE refresh_tokens (
//   token TEXT PRIMARY KEY,
//   user_id INTEGER NOT NULL,
//   issued_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
//   expires_at TIMESTAMP WITH TIME ZONE
// );

// In-memory fallback for refresh tokens when DB table is not available.
const inMemoryRefreshTokens = new Set();

async function storeRefreshTokenInDB(token, userId, expiresAt) {
  try {
    const query = `INSERT INTO refresh_tokens(token, user_id, expires_at) VALUES($1, $2, $3)`;
    await pool.query(query, [token, userId, expiresAt]);
    return true;
  } catch (err) {
    // If the table doesn't exist or DB fails, fallback to in-memory store.
    console.warn('Could not store refresh token in DB, falling back to memory store:', err.message);
    inMemoryRefreshTokens.add(token);
    return false;
  }
}

async function revokeRefreshTokenInDB(token) {
  try {
    const query = `DELETE FROM refresh_tokens WHERE token = $1`;
    const result = await pool.query(query, [token]);
    // if no rows affected and token exists in memory, remove
    inMemoryRefreshTokens.delete(token);
    return result.rowCount > 0;
  } catch (err) {
    console.warn('Could not revoke refresh token from DB, removing from memory store if present:', err.message);
    inMemoryRefreshTokens.delete(token);
    return false;
  }
}

async function isRefreshTokenValid(token) {
  try {
    const query = `SELECT token, expires_at FROM refresh_tokens WHERE token = $1`;
    const { rows } = await pool.query(query, [token]);
    if (rows.length === 0) {
      return inMemoryRefreshTokens.has(token);
    }
    const row = rows[0];
    if (row.expires_at && new Date(row.expires_at) < new Date()) {
      // expired server-side
      return false;
    }
    return true;
  } catch (err) {
    // DB not available: check in-memory
    return inMemoryRefreshTokens.has(token);
  }
}

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Restrict user signups to @igdtuw.ac.in domain only
  if (!email.endsWith('@igdtuw.ac.in')) {
    return res.status(400).json({ error: 'Only @igdtuw.ac.in email addresses are allowed for user registration' });
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4)',
      [name, email, hash, 'user'] // Default role is 'user'
    );
    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    console.error('Signup error:', err);
    if (err.code === '23505') {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'Signup failed' });
    }
  }
});

// Helper: create access and refresh tokens
function createTokens(user) {
  const accessToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m' }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d' }
  );

  return { accessToken, refreshToken };
}

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  try {
    const result = await pool.query(
      'SELECT id, name, email, password_hash, role, avatar_url FROM users WHERE email = $1',
      [email]
    );
    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    // Restrict user role logins to @igdtuw.ac.in domain only
    // Exception: allow superadmin@gmail.com for superadmin role
    if (user.role === 'user' && !email.endsWith('@igdtuw.ac.in')) {
      return res.status(403).json({ error: 'User account login is restricted to @igdtuw.ac.in domain only' });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const { accessToken, refreshToken } = createTokens(user);

    // Attempt to store the refresh token in DB; fallback to in-memory store if fails
    const refreshExpiry = new Date(Date.now() + (parseExpiryToMs(process.env.REFRESH_TOKEN_EXPIRES_IN || '7d')));
    await storeRefreshTokenInDB(refreshToken, user.id, refreshExpiry.toISOString());

    res.json({ 
      accessToken,
      // legacy alias for compatibility with existing frontend
      token: accessToken,
      refreshToken,
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email,
        role: user.role,
        avatarUrl: user.avatar_url
      } 
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Exchange refresh token for new access token
router.post('/token', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ error: 'Refresh token required' });

  // Check if token is known (DB or memory)
  const known = await isRefreshTokenValid(refreshToken);
  if (!known) return res.status(403).json({ error: 'Refresh token invalid or revoked' });

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET);
    const userId = payload.id;

    // Optionally fetch fresh user info from DB
    const result = await pool.query('SELECT id, email, role FROM users WHERE id = $1', [userId]);
    const user = result.rows[0];
    if (!user) return res.status(403).json({ error: 'User not found' });

    const accessToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m' });
    res.json({ accessToken });
  } catch (err) {
    console.warn('Refresh token verify failed:', err.message);
    return res.status(403).json({ error: 'Refresh token invalid or expired' });
  }
});

// Logout: revoke refresh token
router.post('/logout', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ error: 'Refresh token required' });

  await revokeRefreshTokenInDB(refreshToken);
  res.json({ success: true, message: 'Logged out' });
});

export const authRoutes = router;

// Utility to convert strings like '7d' or '15m' to milliseconds.
function parseExpiryToMs(exp) {
  if (!exp) return 0;
  // supports formats like '15m', '24h', '7d'
  const m = exp.match(/^(\d+)([smhd])$/);
  if (!m) return 0;
  const n = Number(m[1]);
  const unit = m[2];
  switch (unit) {
    case 's': return n * 1000;
    case 'm': return n * 60 * 1000;
    case 'h': return n * 60 * 60 * 1000;
    case 'd': return n * 24 * 60 * 60 * 1000;
    default: return 0;
  }
}