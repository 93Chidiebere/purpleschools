import { Router, Response } from "express";
import { authenticateToken, AuthenticatedRequest } from "../middleware/authMiddleware";
import { query } from "../db";

const router = Router();

// Get list of all registered users (Admin only)
router.get("/users", authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const requesterId = req.user?.id;

    // Verify if requester is admin
    const checkAdmin = await query("SELECT role FROM users WHERE id = $1", [requesterId]);
    if (checkAdmin.rows.length === 0 || checkAdmin.rows[0].role !== "admin") {
      res.status(403).json({ error: "Access denied. Administrator privileges required." });
      return;
    }

    // Query all users (excluding password hashes) ordered by registration id descending
    const usersResult = await query(
      `SELECT id, name, email, school, class_name AS "className", age, gender, 
              school_state AS "schoolState", favorite_subject AS "favoriteSubject", 
              role, streak, days_active AS "daysActive", xp
       FROM users 
       ORDER BY id DESC`
    );

    res.status(200).json({ users: usersResult.rows });
  } catch (err) {
    console.error("Admin fetch users error:", err);
    res.status(500).json({ error: "Failed to fetch registered users list" });
  }
});

export default router;
