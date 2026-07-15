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
      "SELECT name, email, school, class_name, streak, days_active, questions_asked, topics_explored, favorite_quote, personal_notes, xp, highest_xp_ever FROM users WHERE id = $1",
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
        daysActive: user.days_active,
        questionsAsked: user.questions_asked,
        topicsExplored: user.topics_explored,
        favoriteQuote: user.favorite_quote,
        personalNotes: user.personal_notes,
        xp: user.xp,
        highestXpEver: user.highest_xp_ever
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
  const { name, school, className, streak, daysActive, questionsAsked, topicsExplored, favoriteQuote, personalNotes, xp, highestXpEver } = req.body;

  if (!userId) {
    res.status(401).json({ error: "Access token validation failed" });
    return;
  }

  try {
    const result = await query(
      `UPDATE users
       SET name = COALESCE($1, name),
           school = COALESCE($2, school),
           class_name = COALESCE($3, class_name),
           streak = COALESCE($4, streak),
           days_active = COALESCE($5, days_active),
           questions_asked = COALESCE($6, questions_asked),
           topics_explored = COALESCE($7, topics_explored),
           favorite_quote = COALESCE($8, favorite_quote),
           personal_notes = COALESCE($9, personal_notes),
           xp = COALESCE($10, xp),
           highest_xp_ever = COALESCE($11, highest_xp_ever),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $12
       RETURNING name, email, school, class_name, streak, days_active, questions_asked, topics_explored, favorite_quote, personal_notes, xp, highest_xp_ever`,
      [name, school, className, streak, daysActive, questionsAsked, topicsExplored, favoriteQuote, personalNotes, xp, highestXpEver, userId]
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
        daysActive: updatedUser.days_active,
        questionsAsked: updatedUser.questions_asked,
        topicsExplored: updatedUser.topics_explored,
        favoriteQuote: updatedUser.favorite_quote,
        personalNotes: updatedUser.personal_notes,
        xp: updatedUser.xp,
        highestXpEver: updatedUser.highest_xp_ever
      }
    });
  } catch (err) {
    console.error("Profile PUT error:", err);
    res.status(500).json({ error: "Server profile update error" });
  }
});

export default router;
