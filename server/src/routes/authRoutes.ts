import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { query } from "../db";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";

// Register user
router.post("/register", async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, school, className, age, gender, schoolState, favoriteSubject } = req.body;

  if (!name || !password || !school || !className || !age || !gender || !schoolState || !favoriteSubject) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    // Check if name already exists
    const existingName = await query("SELECT id FROM users WHERE name = $1", [name]);
    if (existingName.rows.length > 0) {
      res.status(409).json({ error: "Username/Name is already taken" });
      return;
    }

    // Check if email already exists
    if (email) {
      const existingUser = await query("SELECT id FROM users WHERE email = $1", [email]);
      if (existingUser.rows.length > 0) {
        res.status(409).json({ error: "Email is already registered" });
        return;
      }
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Insert user
    const result = await query(
      `INSERT INTO users (name, email, password_hash, school, class_name, age, gender, school_state, favorite_subject, role, streak, days_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'user', 0, 0)
       RETURNING id, name, email, school, class_name, age, gender, school_state, favorite_subject, role, streak, days_active`,
      [name, email || null, passwordHash, school, className, parseInt(age) || null, gender, schoolState, favoriteSubject]
    );

    const user = result.rows[0];

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d"
    });

    res.status(201).json({
      token,
      user: {
        name: user.name,
        email: user.email,
        school: user.school,
        className: user.class_name,
        age: user.age,
        gender: user.gender,
        schoolState: user.school_state,
        favoriteSubject: user.favorite_subject,
        role: user.role,
        streak: user.streak,
        daysActive: user.days_active
      }
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server registration error" });
  }
});

// Login user
router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email/Name and password are required" });
    return;
  }

  try {
    // Get user details by email or name
    const result = await query(
      "SELECT id, name, email, password_hash, school, class_name, age, gender, school_state, favorite_subject, role, streak, days_active FROM users WHERE email = $1 OR name = $1",
      [email]
    );

    if (result.rows.length === 0) {
      res.status(401).json({ error: "Invalid email/name or password" });
      return;
    }

    const user = result.rows[0];

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      res.status(401).json({ error: "Invalid email/name or password" });
      return;
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d"
    });

    res.status(200).json({
      token,
      user: {
        name: user.name,
        email: user.email,
        school: user.school,
        className: user.class_name,
        age: user.age,
        gender: user.gender,
        schoolState: user.school_state,
        favoriteSubject: user.favorite_subject,
        role: user.role,
        streak: user.streak,
        daysActive: user.days_active
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server login error" });
  }
});

export default router;
