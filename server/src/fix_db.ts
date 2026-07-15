import { query } from "./db";
import dotenv from "dotenv";
dotenv.config();

const fixDatabase = async () => {
  try {
    console.log("Cleaning up duplicate usernames in the database...");
    
    // Rename test account to Student Vin Cent to prevent login name collision with Admin
    const res = await query(
      "UPDATE users SET name = 'Student Vin Cent' WHERE email = 'vchidiebere.vc@gmail.com' RETURNING id, name, email"
    );
    
    console.log("Database update completed. Modified records:", res.rows);
  } catch (err) {
    console.error("Error fixing database:", err);
  }
};
fixDatabase();
