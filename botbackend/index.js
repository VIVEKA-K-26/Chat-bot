import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
// Import routes
import authRoute from "./routes/auth.js";
import projectRoute from "./routes/projectroute.js";
import chatRoute from "./routes/chat.js";


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/projects", projectRoute);
app.use("/api/chat", chatRoute);

// Test route
app.get("/", (req, res) => {
  res.send("🚀 Chatbot Backend Running!");
});

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection failed:", err.message));
