import { pool } from "../config/db";

export async function createRefreshToken(userId: string, token: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await pool.query(
    `INSERT INTO refresh_tokens (user_id, token, expires_at)
    VALUES ($1, $2, $3)
    `,
    [userId, token, expiresAt],
  );
}

export async function findValidRefreshToken(token: string) {
  const result = await pool.query(
    `SELECT * FROM refresh_tokens
    WHERE token = $1 AND expires_at > NOW()`,
    [token],
  );
  return result.rows[0] || null;
}

export async function deleteRefreshToken(token: string) {
  await pool.query(`DELETE FROM refresh_tokens WHERE token = $1`, [token]);
}

export async function deleteAllRefreshTokensForUser(userId: string) {
  await pool.query(`DELETE FROM refresh_tokens WHERE user_id = $1`, [userId]);
}
