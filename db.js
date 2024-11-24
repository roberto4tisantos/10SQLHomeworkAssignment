// const { Pool } = require('pg');
// const inquirer = require('inquirer');
// import { Pool } from "pg";

import pkg from 'pg';
const { Pool } = pkg;

import inquirer from "inquirer";

// Set up the PostgreSQL connection pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'uofsql',
    password: 'postgres',
    port: 5432,
  });

  export default pool;