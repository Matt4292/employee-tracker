// required packages
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table")

const { listenerCount, title } = require("process");
const { resolve } = require("path");

function init (){
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
        view("department");
        break;
      case "View all roles":
        view("role");
        break;
      case "View all employees":
        view("employee")
        break;
      case "Add a department":
        addDepartment()
        break;
      case "Add a role":
        addRole()
        break;
      case "Add an employee":
        addEmployee()
        break;
      case "Update employee role":
        updateEmployee()
        break;
    }
  })
}

function view(viewWhat){
  console.log(`view ${viewWhat}`)
  db.query(`SELECT * FROM employee_db.${viewWhat}`, function(err, res) {
    if (err) console.log(err);
    console.table(res)
    init();
  })
}

function addDepartment(){
  inquirer.prompt(
    {
      name: "departmentName",
      type: "input",
      message: "What is the name of the department?"
    }
  ).then( response => {
    console.log(response);
    db.query(`INSERT INTO department VALUES (id, '${response.departmentName}')`, function (err, res) {
      if (err) console.log(err);
      view("department");
    })
  })
};

function addRole(){
  inquirer.prompt([
    {
      name: "roleName",
      type: "input",
      message: "What is the new role?"
    },
    {
      name: "salary",
      type: "input",
      message: "What is this roles salary?"
    },
  ])
  .then( response => {
    const responses = response;
    db.query(`SELECT * FROM department`, function(err, res) {
      if (err) console.log(err);
      inquirer.prompt(
        {
          name: "department",
          type: "list",
          message: "Which department is this role a part of?",
          choices: res
        }
      ).then( response => {
        db.query(`SELECT * FROM department WHERE name = '${response.department}'`, function(err, res) {
          pushRole(responses, res[0].id)
          function pushRole(responses, responseId) {
            db.query(`INSERT INTO role VALUES (id, '${responses.roleName}', ${responses.salary}, ${responseId})`, function (err, res) {
              if (err) console.log(err);
              view("role");
            })
          }
        })
      })
    })
  })  
};

function addEmployee() {
  inquirer.prompt([
    {
      name: "firstName",
      type: "input",
      message: "What is this employees first name?"
    },
    {
      name: "lastName",
      type: "input",
      message: "What is this employees last name?"
    },
  ])
  .then( response => {
    const responses = response;
    db.query('SELECT *, id AS value FROM role', function(err, res) {
      if (err) console.log(err);
      inquirer.prompt(
        {
          name: "roleId",
          type: "list",
          message: "What title does this employee hold?",
          choices: res
        }
      )
      .then( response => {
        const roleId = response;
        db.query('SELECT *, CONCAT(first_name, " ", last_name) AS name, id AS value FROM employee', function(err, res) {
          if (err) console.log(err);
          inquirer.prompt(
            {
              name: "manager",
              type: "list",
              message: "Who is this employees manager?",
              choices: res
            }
          )
          .then( response => {
            db.query(`SELECT * FROM role WHERE name = '${response.roleId}'`, function(err, res) {
              db.query(`INSERT INTO employee VALUES (id, '${responses.firstName}', '${responses.lastName}', ${roleId.roleId}, '${response.manager}')`, function(err, res) {
                if (err) console.log(err);
                view("employee");
              })
            })
          })
        });
      })
    })
  })  
};

function updateEmployee() {
  db.query('SELECT *, CONCAT(first_name, " ", last_name) AS name, id AS value FROM employee', function(err, res) {
    if (err) console.log(err)
    console.log(res)
    inquirer.prompt(
      {
        name: "employee",
        type: "list",
        message: "Which employee do you want to update?",
        choices: res
      }
    )
    .then( response => {
      const employeeName = response;
      db.query('SELECT *, id AS value FROM role', function (err, res) {
        if (err) console.log(err);
        inquirer.prompt(
          {
            name: "newRole",
            type: "list",
            message: "What is this employees new role?",
            choices: res
          }
        )
        .then( response => {
          db.query(`UPDATE employee SET role_id = ${response.newRole} WHERE id = ${employeeName.employee}`)
          console.log(employeeName)
          console.log(response)
        })
      })
    })
  })

}

init();

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Password",
    database: "employee_db"
  },
  console.log("connected")
);