import { query } from "./db";
import dotenv from "dotenv";
dotenv.config();

const checkUsers = async () => {
  try {
    const res = await query("SELECT id, name, email, role FROM users");
    console.log("USERS IN DATABASE:");
    console.log(JSON.stringify(res.rows, null, 2));
  } catch (err) {
    console.error("Error checking users:", err);
  }
};
checkUsers();
