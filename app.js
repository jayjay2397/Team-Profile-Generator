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
        } else if (data.choice === "Exit") {
            fileGenerator();
        }
    })
};

function getmanagerQuestions(){
    inquirer.prompt(questions.managerQuestions)
    .then((res) => {
        const managerData = new Manager (res.name,
            res.id,
            res.email,
            res.officeNumber );

        var managerEl = htmlGenerator.managerHTMLGenerator(managerData);
        teamHTML = teamHTML + managerEl;
        init();
    }) .catch(function(error){
        console.log(error);
    })
};

function getengineerQuestions(){
    inquirer.prompt(questions.engineerQuestions)
    .then((res) => {
        const engineerData = new Engineer (res.name,
        res.id,
        res.email,
        res.github );

        var engineerEl = htmlGenerator.engineerHTMLGenerator(engineerData);
        teamHTML = teamHTML + engineerEl;
        init();
    }) .catch(function(error){
        console.log(error);
    })
};

function getinternQuestions(){
    inquirer.prompt(questions.internQuestions)
    .then((res) => {
        const internData = new Intern (res.name,
        res.id,
        res.email,
        res.school );

        var internEl = htmlGenerator.internHTMLGenerator(internData);
        teamHTML = teamHTML + internEl;
        init();
    }) .catch(function(error){
        console.log(error);
    })
};

function fileGenerator(){
    var mainEL = htmlGenerator.mainHTMLGenerator(teamHTML);
    fs.writeFile(outputPath, mainEL, function(err){
        if(err){
            return console.log(err)
        }
    
    });
};