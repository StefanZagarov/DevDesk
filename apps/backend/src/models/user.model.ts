import { pool } from "../config/db";
import { RegisterInput, User } from "@devdesk/shared";

interface UserWithSecrets extends User {
  passwordHash: string;
}

export class UserModel {
  static async findByEmail(email: string): Promise<User | null> {
    // We will need password_hash later
    const result = await pool.query(
      `SELECT 
        id,
        email,
        name,
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM users
      WHERE email = $1`,
      [email],
    );
    return result.rows[0] || null;
  }

  static async findByEmailWithPassword(
    email: string,
  ): Promise<UserWithSecrets | null> {
    const result = await pool.query(
      `SELECT
        id,
        email,
        name,
        password_hash as "passwordHash",
        created_at as "createdAt",
        updated_at as "updatedAt"
        FROM users
        WHERE email = $1`,
      [email],
    );
    return result.rows[0] || null;
  }

  static async create(
    userData: RegisterInput,
    passwordHash: string,
  ): Promise<User> {
    const result = await pool.query(
      `
        INSERT INTO users (email, password_hash, name)
        VALUES ($1, $2, $3)
        RETURNING
            id,
            email,
            name,
            created_at as "createdAt",
            updated_at as "updatedAt"
      `,
      [userData.email, passwordHash, userData.name || null],
    );

    return result.rows[0];
  }
}
