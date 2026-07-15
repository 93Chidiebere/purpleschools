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

export function generateNextStudentId(lastId: string | null): string {
  if (!lastId) {
    return "A001";
  }
  const letter = lastId.charAt(0);
  const numberPart = parseInt(lastId.slice(1), 10);
  if (numberPart < 999) {
    const nextNumber = numberPart + 1;
    return letter + String(nextNumber).padStart(3, "0");
  } else {
    const nextLetterCode = letter.charCodeAt(0) + 1;
    const nextLetter = String.fromCharCode(nextLetterCode);
    return nextLetter + "001";
  }
}

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
      ALTER TABLE users ADD COLUMN IF NOT EXISTS student_id TEXT UNIQUE DEFAULT NULL;
    `);
    console.log("Database columns check completed successfully.");

    // Run student_id backfill
    const usersWithoutId = await query("SELECT id FROM users WHERE student_id IS NULL ORDER BY id ASC");
    if (usersWithoutId.rows.length > 0) {
      console.log(`Backfilling student_id for ${usersWithoutId.rows.length} users...`);
      const lastAssigned = await query("SELECT student_id FROM users WHERE student_id IS NOT NULL ORDER BY student_id DESC LIMIT 1");
      let currentId = lastAssigned.rows.length > 0 ? lastAssigned.rows[0].student_id : null;
      
      for (const userRow of usersWithoutId.rows) {
        const nextId = generateNextStudentId(currentId);
        await query("UPDATE users SET student_id = $1 WHERE id = $2", [nextId, userRow.id]);
        currentId = nextId;
      }
      console.log("Backfill completed successfully.");
    }
    
    // Ensure Admin Account
    const adminEmail = "vincent.chidiebere@outlook.com";
    const adminPassword = "93Chid!ebere";
    const adminName = "Vin Cent";

    const existing = await query("SELECT id FROM users WHERE email = $1", [adminEmail]);
    if (existing.rows.length === 0) {
      console.log("Creating default administrator account...");
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(adminPassword, salt);
      const lastAssigned = await query("SELECT student_id FROM users WHERE student_id IS NOT NULL ORDER BY student_id DESC LIMIT 1");
      const nextId = generateNextStudentId(lastAssigned.rows.length > 0 ? lastAssigned.rows[0].student_id : null);
      await query(
        `INSERT INTO users (name, email, password_hash, school, class_name, role, streak, days_active, age, gender, school_state, favorite_subject, student_id)
         VALUES ($1, $2, $3, 'FSTC', 'SS2', 'admin', 0, 0, 16, 'Male', 'Lagos', 'Mathematics', $4)`,
        [adminName, adminEmail, hash, nextId]
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
