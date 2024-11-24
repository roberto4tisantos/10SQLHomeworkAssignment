const pool = require('./db').default;

// View all departments
async function viewDepartments() {
    const result = await pool.query('SELECT * FROM department');
    return result.rows;
}

// View all roles
async function viewRoles() {
    const result = await pool.query('SELECT role.id, role.title, role.salary, department.name as department_name FROM role JOIN department ON role.department_id = department.id');
    return result.rows;
}

// View all Employees
async function viewEmployees() {
    const result = await pool.query('SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.id, role.title, role.salary, role.department_id, department.name FROM employee JOIN role ON role.id = employee.role_id JOIN department ON employee.role_id = role.id');
    return result.rows;
}

// Add a new employee
async function addEmployee(firstName, lastName, roleId, managerId) {
    const result = await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *', [firstName, lastName, roleId, managerId]);
    return result.rows[0];
}

// Add a new department
async function addDepartment(name) {
    const result = await pool.query('INSERT INTO department (name) VALUES ($1) RETURNING *', [name]);
    return result.rows[0];
}

// Add a new Role
async function addRole(title, salary, department_id) {
    const result = await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *', [title, salary, department_id]);
    return result.rows[0];
}

// Update employee role
async function updateEmployeeRole(employeeId, newRoleId) {
    const result = await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *', [newRoleId, employeeId]);
    return result.rows[0];
}

module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
};