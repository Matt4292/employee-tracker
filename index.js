// required packages
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table")

const { listenerCount } = require("process");
const { resolve } = require("path");

inquirer.prompt([
  {
    name: "firstQuestion",
    type: "list",
    message: "What would you like to do?",
    choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update employee role"]
  }
]).then(response => {
  switch(response.firstQuestion) {
    case "View all departments":
      viewDepartment();
      break;
    case "View all roles":
      console.log("view roles")
      break;
    case "View all employees":
      console.log("view employees")
      break;
    case "Add a department":
      console.log("add departments")
      break;
    case "Add a role":
      console.log("add role")
      break;
    case "Add an employee":
      console.log("add employee")
      break;
    case "View all departments":
      console.log("update employee")
      break;
  }
})

function viewDepartment(){
  console.log("view departments asdf")
  db.query('')
}

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Password",
    database: "employee_db"
  },
  console.log("connected")
);