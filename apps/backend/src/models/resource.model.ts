import { toSnakeCase } from "src/utils/toSnakeCase";
import { mapRow } from "src/utils/toCamelCase";
import { pool } from "../config/db";
import type { CreateResourceInput, Resource } from "@devdesk/shared";

export class ResourceModel {
  static async create(
    resource: CreateResourceInput,
    userId: string,
  ): Promise<Resource> {
    const { title, description, type, content, tags } = resource;

    // We used Parameterized Queries ($1, $2, $3). The pg library sends the query template first, then sends the data separately. This makes it mathematically impossible for a hacker to inject malicious SQL commands
    const query = `
      INSERT INTO resources (title, description, type, content, tags, user_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [
      title,
      description,
      type,
      JSON.stringify(content), // Convert JS object to JSON string for Postgres
      tags || [],
      userId,
    ];

    const result = await pool.query(query, values);
    return mapRow(result.rows[0]) as Resource; // Postgres returns the created row
  }

  static async findByUserId(
    userId: string,
    filters?: {
      type?: string;
      isFavorite?: boolean;
      isArchived?: boolean;
      tags?: string[];
      limit?: number;
      offset?: number;
      sortBy?: string;
      sortOrder?: "asc" | "desc";
    },
  ) {
    // Build the query based on given filters

    // Starting with the base query which every request needs
    let query = "SELECT * FROM resources WHERE user_id = $1";
    const params: any[] = [userId];
    let paramIndex = 2; // tracks which $N placeholder we are on, since $1 is taken by the user id, the next one is $2

    if (filters?.type) {
      query += ` AND type = $${paramIndex}`;
      params.push(filters.type);
      paramIndex++;
    }

    if (filters?.isFavorite !== undefined) {
      query += ` AND is_favorite = $${paramIndex}`;
      params.push(filters.isFavorite);
      paramIndex++;
    }

    if (filters?.isArchived !== undefined) {
      query += ` AND is_archived = $${paramIndex}`;
      params.push(filters.isArchived);
      paramIndex++;
    }

    // Tag filtering: the @> operator checks if the tags array contains all the provided tags
    // Example: tags @> '{react,typescript}' means "has both react AND typescript"
    if (filters?.tags && filters.tags.length > 0) {
      query += ` AND tags @> $${paramIndex}`;
      params.push(filters.tags);
      paramIndex++;
    }

    // Sorting - we whitelist allowed columns to prevent SQL injection
    // NEVER put user input directly into a query string
    const allowedSortColumns = ["created_at", "updated_at", "title"];
    const sortBy = allowedSortColumns.includes(filters?.sortBy || "")
      ? filters!.sortBy
      : "created_at";
    const sortOrder = filters?.sortOrder === "asc" ? "ASC" : "DESC";
    query += ` ORDER BY ${sortBy} ${sortOrder}`;

    // Pagination:
    // LIMIT = how many rows
    // OFFSET = how many to skip
    const limit = filters?.limit || 50;
    query += ` LIMIT $${paramIndex}`;
    params.push(limit);
    paramIndex++;

    if (filters?.offset) {
      query += ` OFFSET $${paramIndex}`;
      params.push(filters.offset);
    }

    const result = await pool.query(query, params);
    return result.rows.map(mapRow);
  }

  static async findById(id: string, userId: string) {
    const result = await pool.query(
      "SELECT * FROM resources WHERE id = $1 AND user_id = $2",
      [id, userId],
    );

    return result.rows[0] ? mapRow(result.rows[0]) : null;
  }

  static async update(
    id: string,
    userId: string,
    updates: Record<string, any>,
  ) {
    // Allow only specific fields to be updated, preventing someone from updating the user_id and taking ownership of the resource
    const allowedFields = [
      "title",
      "description",
      "content",
      "tags",
      "category",
      "is_favorite",
      "is_archived",
    ];

    const updateFields: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    // Build SET clause dynamically from the fields the user actually sent
    // If they only sent { title: "new title" }, we only update title
    for (const [key, value] of Object.entries(updates)) {
      const snakeKey = toSnakeCase(key);
      if (allowedFields.includes(snakeKey) && value !== undefined) {
        updateFields.push(`${snakeKey} = $${paramIndex}`);
        params.push(key === "content" ? JSON.stringify(value) : value);
        paramIndex++;
      }
    }

    if (updateFields.length === 0) return null;

    params.push(id, userId);
    const result = await pool.query(
      `UPDATE resources
        SET ${updateFields.join(", ")}
        WHERE id = $${paramIndex} AND user_id = $${paramIndex + 1}
        RETURNING *`,
      params,
    );
    // RETURNING * tells PostgreSQL to send back the updated row, so we don't need a separate SELECT query
    return result.rows[0] ? mapRow(result.rows[0]) : null;
  }

  static async delete(id: string, userId: string): Promise<boolean> {
    const result = await pool.query(
      "DELETE FROM resources WHERE id = $1 AND user_id = $2",
      [id, userId],
    );

    // rowCount tells us how many rows were deleted. If it returns 0, then the resource didn't exist, or it didn't belong to this user
    return (result.rowCount ?? 0) > 0;
  }
}
