import express from "express";
import dotenv from "dotenv";
import { testDbConnection } from "./config/db";
import resourceRoutes from "./routes/resource.routes"

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Translate raw bites into a javascript object
app.use(express.json());
// When we receive url address starting with this, we use resourceRoutes to handle it
app.use("/api/v1/resources", resourceRoutes)

const start = async () => {
  await testDbConnection();

  app.listen(port, () => {
    console.log(`Back-end listening at http://localhost:${port}...`);
  });
};

start();
