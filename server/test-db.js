const { Client } = require("pg");
const dotenv = require("dotenv");
const path = require("path");

// Force load dotenv from the current directory
dotenv.config({ path: path.join(__dirname, ".env") });

const connString = process.env.DATABASE_URL;

if (!connString) {
  console.error("❌ ERROR: DATABASE_URL is not defined in your server/.env file!");
  process.exit(1);
}

console.log("Checking database connection parameters...");
if (connString.includes("[password]") || connString.includes("[YOUR-PASSWORD]")) {
  console.warn("⚠️  WARNING: Your connection string still contains the placeholder '[password]' or '[YOUR-PASSWORD]'. Make sure to replace this with the database password you chose when creating the Supabase project!");
}

const client = new Client({
  connectionString: connString,
  ssl: connString.includes("localhost") || connString.includes("127.0.0.1")
    ? false
    : { rejectUnauthorized: false }
});

console.log("Attempting to connect to database...");

client.connect()
  .then(() => {
    console.log("✅ SUCCESS: Successfully connected to your PostgreSQL database!");
    console.log("Checking if 'users' table exists...");
    return client.query("SELECT * FROM users LIMIT 1");
  })
  .then((res) => {
    console.log("✅ SUCCESS: Successfully queried the 'users' table! Columns matched.");
    client.end();
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ FAILURE: Connection test failed!");
    console.error("\n--- Error Log Details ---");
    console.error(err.message || err);
    console.error("-------------------------\n");
    console.error("Suggestions:");
    console.error("1. Verify the password in server/.env matches your Supabase database password.");
    console.error("2. If using Supabase, ensure your connection string includes: ?sslmode=require or check port 5432.");
    client.end();
    process.exit(1);
  });
