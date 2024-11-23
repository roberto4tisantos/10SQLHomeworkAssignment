const { Pool } = require('pg');

// Set up the PostgreSQL connection pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'uoftsql',
    password: 'postgres',
    port: 5432,
  });