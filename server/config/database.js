import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool, types } = pg;

// Override the parser for the NUMERIC type
types.setTypeParser(types.builtins.NUMERIC, (value) => {
  return value === null ? null : parseFloat(value);
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


export { pool };