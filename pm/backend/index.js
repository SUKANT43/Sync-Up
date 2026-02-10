import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import routes from "./routes/index.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(morgan("dev"));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB Connected successfully."))
  .catch(err => console.log("Failed to connect to DB:", err));

app.use("/api-v1", routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});
