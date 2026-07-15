import { query } from "./db";
import dotenv from "dotenv";
dotenv.config();

const checkFullUsers = async () => {
  try {
    const res = await query("SELECT id, name, email, role, student_id, school, class_name FROM users ORDER BY student_id ASC");
    console.log("FULL USER RECORDS:");
    console.log(JSON.stringify(res.rows, null, 2));
  } catch (err) {
    console.error("Error querying full users:", err);
  }
};
checkFullUsers();
