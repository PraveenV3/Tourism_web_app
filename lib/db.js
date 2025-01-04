// lib/db.js
import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Mern107',
  port: '5432', 
});

export { pool };
