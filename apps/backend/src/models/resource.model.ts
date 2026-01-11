import { pool } from "../config/db";
import type { Resource } from "@devdesk/shared";

export class ResourceModel {
  static async create(
    resource: Omit<Resource, "id" | "createdAt" | "updatedAt">,
  ): Promise<Resource> {
    const { title, description, type, content, tags } = resource;

    // We used Parameterized Queries ($1, $2, $3). The pg library sends the query template first, then sends the data separately. This makes it mathematically impossible for a hacker to inject malicious SQL commands
    const query = `
      INSERT INTO resources (title, description, type, content, tags)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [
      title,
      description,
      type,
      JSON.stringify(content), // Convert JS object to JSON string for Postgres
      tags || [],
    ];

    const result = await pool.query(query, values);
    return result.rows[0]; // Postgres returns the created row
  }
}
