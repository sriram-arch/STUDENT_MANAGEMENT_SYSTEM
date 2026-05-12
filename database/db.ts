import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "sms",
  password: "Sriram@2004",
  port: 7000,
});

export default pool;