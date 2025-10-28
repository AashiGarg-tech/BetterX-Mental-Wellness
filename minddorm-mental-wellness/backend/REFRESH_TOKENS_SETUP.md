Refresh tokens setup

This project now supports a refresh-token flow to avoid permanent expired-token errors. Follow these steps to enable persistent refresh-token storage in PostgreSQL.

Required environment variables (add to `backend/.env`):

- JWT_SECRET="your-access-token-secret"
- JWT_REFRESH_SECRET="your-refresh-token-secret"
- ACCESS_TOKEN_EXPIRES_IN="15m"     # optional, defaults to 15m
- REFRESH_TOKEN_EXPIRES_IN="7d"     # optional, defaults to 7d

SQL: Create a table to store refresh tokens (PostgreSQL):

```sql
CREATE TABLE IF NOT EXISTS refresh_tokens (
  token TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE
);
```

Notes & recommendations
- Storing refresh tokens in the DB allows you to revoke them server-side (logout, suspicious activity).
- If you cannot modify the DB, the server falls back to an in-memory store (not persistent across restarts) — this is less secure and not recommended for production.
- Use strong, random secrets for `JWT_SECRET` and `JWT_REFRESH_SECRET` and keep them out of source control.
- Make sure your frontend uses the `accessToken` for authenticated requests and calls `/api/auth/token` with the `refreshToken` when the access token expires to obtain a fresh access token.

Minimal example flow (frontend):
1. POST /api/auth/login -> receives { accessToken, refreshToken }
2. Use accessToken in Authorization: Bearer <accessToken>
3. If a protected request returns 401/403 due to expiry, POST /api/auth/token with { refreshToken }
4. Receive new accessToken and retry the protected request
5. To logout, POST /api/auth/logout with { refreshToken } to revoke it on the server
