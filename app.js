const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const htmlGenerator = require("./lib/HTMLGenerator")
const questions = require("./lib/Questions")

// const { inherits } = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
 
var teamHTML = (``)
// const render = require("./lib/htmlRenderer");

init()

function init() {
    inquirer.prompt(questions.initiate)
    .then(function(data){
        if (data.choice === "Manager"){
            getmanagerQuestions();
        } else if (data.choice === "Engineer"){
            getengineerQuestions();
        } else if (data.choice === "Intern"){
            getinternQuestions();
        }
    })
};

function getmanagerQuestions(){
    inquirer.prompt(questions.managerQuestions)
    .then((res) => {
        const managerData = new Manager (res.name,
        res.id,
        res.email,
        res.officeNumber);

        var managerEl = htmlGenerator.managerHTMLGenerator(managerData);
        teamHTML = teamHTML + managerEl;
        init();
    }) .catch(function(error){
        console.log(error);
    })
};
