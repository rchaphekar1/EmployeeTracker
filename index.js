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
                    break;
                
                case 'View departments, roles, or employees.':
                    break;

                case 'Update employee roles.':
                    break;
                
                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};