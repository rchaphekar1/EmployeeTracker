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
                'Update employee roles.'
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
            choices: [
                'Add a department.',
                'Add a role.',
                'Add an employee'
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'Add a department':
                    break;

                case 'Add a role.':
                    break;

                case 'Add an employee':
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
                'View a department.',
                'View a role.',
                'View an employee'
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View a department':
                    break;

                case 'View a role.':
                    break;

                case 'View an employee':
                    break;
            }
        });
};