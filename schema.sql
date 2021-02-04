create database employee_trackerDB;

use employee_trackerDB;

create table department (
    id integer not null auto_increment,
    name varchar(30) null,
    primary key (id)
);

create table role (
    id integer not null auto_increment,
    title varchar(30) null,
    salary decimal (10,4) null,
    department_id integer not null
);

create table employee (
    id integer not null auto_increment,
    first_name varchar(30) null,
    last_name varchar(30) null,
    role_id integer not null,
    manager integer null
);

select * from department;
select * from role;
select * from employee;