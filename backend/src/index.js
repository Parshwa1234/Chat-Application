import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; 

import path from "path";

import { connectdb } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { initializeSocket } from "./lib/socket.js";
import http from "http";

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
initializeSocket(server);

dotenv.config();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// CORS configuration for both development and production
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://real-time-chatty-application.netlify.app", // Your actual Netlify URL
  "https://real-time-chatty-application.netlify.app/", // With trailing slash
  "https://real-time-chatty-application.netlify.app/*", // Wildcard
];

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://real-time-chatty-application.netlify.app"
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}));
app.use(express.json());
app.use(cookieParser()); 

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Health check endpoint for Render
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectdb();
});


