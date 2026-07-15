import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";
import chatRoutes from "./routes/chatRoutes";
import { query } from "./db";

dotenv.config();

// Ensure all progress, notes, and quote columns exist in Supabase
const initializeDatabase = async () => {
  try {
    console.log("Checking and initializing database columns...");
    await query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS streak INT DEFAULT 0;
      ALTER TABLE users ADD COLUMN IF NOT EXISTS days_active INT DEFAULT 0;
      ALTER TABLE users ADD COLUMN IF NOT EXISTS questions_asked INT DEFAULT 0;
      ALTER TABLE users ADD COLUMN IF NOT EXISTS topics_explored INT DEFAULT 0;
      ALTER TABLE users ADD COLUMN IF NOT EXISTS favorite_quote TEXT DEFAULT '';
      ALTER TABLE users ADD COLUMN IF NOT EXISTS personal_notes TEXT DEFAULT '';
      ALTER TABLE users ADD COLUMN IF NOT EXISTS xp INT DEFAULT 0;
      ALTER TABLE users ADD COLUMN IF NOT EXISTS highest_xp_ever INT DEFAULT 0;
    `);
    console.log("Database columns check completed successfully.");
  } catch (err) {
    console.error("Database initialization error:", err);
  }
};
initializeDatabase();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS middleware for frontend connection
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Main routers
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/chat", chatRoutes);

// Server status checking
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`PurpleSchool server running on port ${PORT}`);
});
