import { pool } from "../config/db";
import { RegisterInput, User } from "@devdesk/shared";
import { mapRow } from "../utils/toCamelCase";

interface UserWithSecrets extends User {
  passwordHash: string;
}

export class UserModel {
  static async findById(id: string): Promise<User | null> {
    const result = await pool.query(
      `SELECT id, email, name, created_at, updated_at
       FROM users
       WHERE id = $1`,
      [id],
    );
    return result.rows[0] ? (mapRow(result.rows[0]) as User) : null;
  }

  static async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query(
      `SELECT id, email, name, created_at, updated_at
       FROM users
       WHERE email = $1`,
      [email],
    );
    return result.rows[0] ? (mapRow(result.rows[0]) as User) : null;
  }

  static async findByEmailWithPassword(
    email: string,
  ): Promise<UserWithSecrets | null> {
    const result = await pool.query(
      `SELECT id, email, name, password_hash, created_at, updated_at
       FROM users
       WHERE email = $1`,
      [email],
    );
    return result.rows[0] ? (mapRow(result.rows[0]) as UserWithSecrets) : null;
  }

  static async create(
    userData: RegisterInput,
    passwordHash: string,
  ): Promise<User> {
    const result = await pool.query(
      `INSERT INTO users (email, password_hash, name)
       VALUES ($1, $2, $3)
       RETURNING id, email, name, created_at, updated_at`,
      [userData.email, passwordHash, userData.name || null],
    );
    return mapRow(result.rows[0]) as User;
  }
}
