// required packages
const inquirer = require("inquirer");
const fs = require("fs");
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
      console.log("view departments")
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