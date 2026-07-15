import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";
import chatRoutes from "./routes/chatRoutes";
import adminRoutes from "./routes/adminRoutes";
import { query } from "./db";

import bcrypt from "bcryptjs";

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
      ALTER TABLE users ADD COLUMN IF NOT EXISTS age INT DEFAULT NULL;
      ALTER TABLE users ADD COLUMN IF NOT EXISTS gender TEXT DEFAULT '';
      ALTER TABLE users ADD COLUMN IF NOT EXISTS school_state TEXT DEFAULT '';
      ALTER TABLE users ADD COLUMN IF NOT EXISTS favorite_subject TEXT DEFAULT '';
      ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';
    `);
    console.log("Database columns check completed successfully.");
    
    // Ensure Admin Account
    const adminEmail = "vincent.chidiebere@outlook.com";
    const adminPassword = "93Chid!ebere";
    const adminName = "Vin Cent";

    const existing = await query("SELECT id FROM users WHERE email = $1", [adminEmail]);
    if (existing.rows.length === 0) {
      console.log("Creating default administrator account...");
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(adminPassword, salt);
      await query(
        `INSERT INTO users (name, email, password_hash, school, class_name, role, streak, days_active, age, gender, school_state, favorite_subject)
         VALUES ($1, $2, $3, 'FSTC', 'SS2', 'admin', 0, 0, 16, 'Male', 'Lagos', 'Mathematics')`,
        [adminName, adminEmail, hash]
      );
      console.log("Admin account created successfully.");
    } else {
      await query("UPDATE users SET role = 'admin' WHERE email = $1", [adminEmail]);
    }
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
app.use("/admin", adminRoutes);

// Server status checking
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`PurpleSchool server running on port ${PORT}`);
});
