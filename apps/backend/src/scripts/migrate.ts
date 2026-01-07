// A simple script to run the SQL against our database

import fs from "fs";
import path from "path";
import { pool } from "../config/db";
import dotenv from "dotenv";

dotenv.config();

const migrate = async () => {
  try {
    console.log("Starting migration...");

    // 1. Read the SQL file
    const sqlPath = path.join(__dirname, "../../migrations/001_init.sql");
    const sql = fs.readFileSync(sqlPath, "utf8");

    // 2. Connect and Execute
    const client = await pool.connect();
    await client.query(sql);
    client.release();

    console.log("Migration succsessful! Tables created.");
    process.exit(0);
  } catch (err) {
    console.log("Migration failed:", err);
    process.exit(1);
  }
};

migrate();
