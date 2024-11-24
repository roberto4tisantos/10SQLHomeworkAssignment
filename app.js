import inquirer from "inquirer";
import queries from "./queries.js";

// Main function to handle user interactions
async function start() {
    const answers = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]
    });

    switch (answers.action) {
        case 'View all departments':
            const departments = await queries.viewDepartments();
            console.table(departments);
            start();
            break;
        case 'View all roles':
            const roles = await queries.viewRoles();
            console.table(roles);
            start();
            break;
        case 'View all employees':
            const employees = await queries.viewEmployees();
            console.table(employees);
            start();
            break;
        case 'Add a department':
            const deptName = await inquirer.prompt({
                type: 'input',
                name: 'name',
                message: 'Enter department name:'
            });
            await queries.addDepartment(deptName.name);
            console.log(`Department ${deptName.name} added.`);
            start();
            break;
        case 'Add a role':
            const rolesData = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter role title:'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter salary for the role:'
                },
                {
                    type: 'input',
                    name: 'department_id',
                    message: 'Enter department ID for this role:'
                }
            ]);
            await queries.addRole(rolesData.title, rolesData.salary, rolesData.department_id);
            console.log(`Role ${rolesData.title} added.`);
            start();
            break;
        case 'Add an employee':
            const employeeData = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'Enter first name:'
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'Enter last name:'
                },
                {
                    type: 'input',
                    name: 'role_id',
                    message: 'Enter role ID for this employee:'
                },
                {
                    type: 'input',
                    name: 'manager_id',
                    message: 'Enter manager ID (leave empty if none):'
                }
            ]);
            await queries.addEmployee(employeeData.first_name, employeeData.last_name, employeeData.role_id, employeeData.manager_id || null);
            console.log(`Employee ${employeeData.first_name} ${employeeData.last_name} added.`);
            start();
            break;
        case 'Update an employee role':
            const updateData = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'employee_id',
                    message: 'Enter employee ID to update role:'
                },
                {
                    type: 'input',
                    name: 'new_role_id',
                    message: 'Enter new role ID for this employee:'
                }
            ]);
            await queries.updateEmployeeRole(updateData.employee_id, updateData.new_role_id);
            console.log(`Employee role updated.`);
            start();
            break;
        case 'Exit':
            console.log('End');
            process.exit();
            break;
        default:
            start();
            break;
    }
}

start();