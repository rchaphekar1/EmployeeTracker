create database employee_trackerDB;

use employee_trackerDB;

create table department (
    department_id integer not null auto_increment,
    name varchar(30) null,
    primary key (department_id)
);

create table role (
    role_id integer not null auto_increment,
    title varchar(30) null,
    salary decimal (10,4) null,
    department_id integer not null,
    primary key (role_id),
    foreign key (department_id) references department (department_id) 
);

create table employee (
    employee_id integer not null auto_increment,
    first_name varchar(30) null,
    last_name varchar(30) null,
    role_id integer not null,
    manager integer null,
    primary key (employee_id),
    foreign key (role_id) references role (role_id)
);

select * from department;
select * from role;
select * from employee;