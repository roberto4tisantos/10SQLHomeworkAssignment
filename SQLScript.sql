-- Create the database (optional, if you want to specify the database)
SELECT 'Creating Database...';
DROP DATABASE IF EXISTS uoftsql;
CREATE DATABASE uoftsql;

-- Connect to the database (if the database is already created)
\c uoftsql;

-- See database in use --
SELECT current_database();

-- Create department table
CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

-- Create role table
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Create employee table
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES role(id),    
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);