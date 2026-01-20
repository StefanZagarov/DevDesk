import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { testDbConnection } from "./config/db";
import resourceRoutes from "./routes/resource.routes";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Translate raw bites into a javascript object
app.use(cors());
app.use(express.json());
// When we receive url address starting with this, we use resourceRoutes to handle it
app.use("/api/v1/resources", resourceRoutes);
app.use("/api/v1/auth", authRoutes);

app.get("/health", (_, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

const start = async () => {
  await testDbConnection();

  app.listen(port, () => {
    console.log(`Back-end listening at http://localhost:${port}...`);
  });
};

start();
