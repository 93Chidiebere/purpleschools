import { Router, Response } from "express";
import { AuthenticatedRequest, authenticateToken } from "../middleware/authMiddleware";
import { query } from "../db";

const router = Router();

// Get active user profile
router.get("/me", authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ error: "Access token validation failed" });
    return;
  }

  try {
    const result = await query(
      "SELECT name, email, school, class_name, streak, days_active FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "User profile not found" });
      return;
    }

    const user = result.rows[0];

    res.status(200).json({
      data: {
        name: user.name,
        email: user.email,
        school: user.school,
        className: user.class_name,
        streak: user.streak,
        daysActive: user.days_active
      }
    });
  } catch (err) {
    console.error("Profile GET error:", err);
    res.status(500).json({ error: "Server profile retrieval error" });
  }
});

// Update user profile
router.put("/me", authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.id;
  const { name, school, className } = req.body;

  if (!userId) {
    res.status(401).json({ error: "Access token validation failed" });
    return;
  }

  if (!name || !school || !className) {
    res.status(400).json({ error: "Name, school, and className are required" });
    return;
  }

  try {
    const result = await query(
      `UPDATE users
       SET name = $1, school = $2, class_name = $3, updated_at = CURRENT_TIMESTAMP
       WHERE id = $4
       RETURNING name, email, school, class_name, streak, days_active`,
      [name, school, className, userId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "User profile not found" });
      return;
    }

    const updatedUser = result.rows[0];

    res.status(200).json({
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        school: updatedUser.school,
        className: updatedUser.class_name,
        streak: updatedUser.streak,
        daysActive: updatedUser.days_active
      }
    });
  } catch (err) {
    console.error("Profile PUT error:", err);
    res.status(500).json({ error: "Server profile update error" });
  }
});

export default router;
