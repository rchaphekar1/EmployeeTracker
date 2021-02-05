const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'root',
    database: 'employee_trackerDB',
});

connection.connect((err) => {
    if (err) throw err;
    initialPrompt();
});

const initialPrompt = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'Add a department, role, or employee.',
                'View departments, roles, or employees.',
                'Update employee roles.',
                'Exit'
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'Add a department, role, or employee.':
                    addPrompt();
                    break;
                
                case 'View departments, roles, or employees.':
                    viewPrompt();
                    break;

                case 'Update employee roles.':
                    changeRole();
                    break;

                case 'Exit':
                    connection.end();
                    break;
                
                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};

const addPrompt = () => {
    inquirer
        .prompt({
            name: 'addAction',
            type: 'rawlist',
            message: 'What would you like to add?',
            choices: [
                'Add a department.',
                'Add a role.',
                'Add an employee.'
            ],
        })
        .then((answer) => {
            switch (answer.addAction) {
                case 'Add a department.':
                    addDepartment();
                    break;

                case 'Add a role.':
                    addRole();
                    break;

                case 'Add an employee.':
                    addEmployee();
                    break;
            }
        });
};

const viewPrompt = () => {
    inquirer
        .prompt({
            name: 'viewAction',
            type: 'rawlist',
            choices: [
                'View departments.',
                'View roles.',
                'View employees.'
            ],
        })
        .then((answer) => {
            switch (answer.viewAction) {
                case 'View departments.':
                    viewDepartment();
                    break;

                case 'View roles.':
                    viewRole();
                    break;

                case 'View employees.':
                    viewEmployee();
                    break;
            }
        });
};

const addDepartment = () => {
    inquirer
        .prompt({
            name: 'departmentName',
            type: 'input',
            message: 'Which department would you like to add?',
        })
        .then((answer) => {
            connection.query(
                'insert into department set ?',
                {
                    name: answer.departmentName
                },
                (err) => {
                    if (err) throw err;
                    console.log('Department added succesfully!');
                    initialPrompt();
                }
            );
        });
};

const addRole = () => {
    inquirer
        .prompt([
            {
                name: 'roleName',
                type: 'input',
                message: 'Which role would you like to add?',
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary?',
            },
        ])
        .then((answer) => {
            connection.query(
                'insert into role set ?',
                {
                    title: answer.roleName,
                    salary: answer.salary
                },
                (err) => {
                    if (err) throw err;
                    console.log('Role added succesfully!');
                    initialPrompt();
                }
            );
        });
};

const addEmployee = () => {
    inquirer
        .prompt([
            {
                name: 'firstName',
                type: 'input',
                message: 'What is their first name?'
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'What is their last name?'
            },
            {
                name: 'manager',
                type: 'input',
                message: 'Who is their manager?'
            }
        ])
        .then((answer) => {
            connection.query(
                'insert into employee set ?',
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    manager: answer.manager
                },
                (err) => {
                    if (err) throw err;
                    console.log('Employee added succesfully!');
                    initialPrompt();
                }
            );
        });
};

const viewDepartment = () => {
    const query = 'select name from department';
    connection.query(query, (err, res) => {
        res.forEach(({ name }) => console.log(name));
        initialPrompt();
    });
};

const viewRole = () => {
    const query = 'select title from role';
    connection.query(query, (err, res) => {
        res.forEach(({ title }) => console.log(title));
        initialPrompt();
    })
};

const viewEmployee = () => {
    const query = 'select first_name, last_name from employee';
    connection.query(query, (err, res) => {
        res.forEach(({ first_name, last_name}) => console.log (first_name, last_name));
        initialPrompt();
    })
};

const changeRole = () => {
    connnection.query('select * from role', (err, results) => {
        if (err) throw err;
        const roleArray = [];
        results.forEach(({ title }) => {
            roleArray.push(title);
        });
        inquirer
            .prompt([
                {
                    name: 'choice',
                    type: 'rawlist',
                    message: 'What role would you like to change?',
                    choices: roleArray
                }
            ])
            .then((answer) => {
                let chosenRole;
                results.forEach((role) => {
                    if (role.title === answer.choice) {
                        chosenRole = role;
                    }
                });
            });
    });
};