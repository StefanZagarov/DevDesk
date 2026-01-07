import express from "express";
import dotenv from "dotenv";
import { testDbConnection } from "./config/db";
import resourceRoutes from "./routes/resource.routes"

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/resources", resourceRoutes)

const start = async () => {
  await testDbConnection();

  app.listen(port, () => {
    console.log(`Back-end listening at http://localhost:${port}...`);
  });
};

start();
