import { Pool } from "pg";

const { USER, PASSWORD, HOST, PORT, DATABASE, CA } = process.env;

export default new Pool({
  user: USER,
  password: PASSWORD,
  host: HOST,
  port: PORT,
  database: DATABASE,
  ssl: {
    rejectUnauthorized: true,
    ca: CA,
  },
});
