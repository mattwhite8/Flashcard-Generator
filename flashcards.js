var clozeExports = require('./cloze.js');

var inquirer = require('inquirer');

var count = 0;
var rightCount = 0;
var wrongCount = 0;


function start(){
	console.log('');
	console.log('==================================');
	console.log('Welcome to the Flashcard Generator');
	console.log('==================================');

	inquirer.prompt([

		{
			type: "list",
			message: "Make your choice",
			choices: ["Quiz me!", "Add a cloze flashcard", "End Program"],
			name: "choices"
		}

	]).then(function(data){

		if(data.choices === "Quiz me!"){
			quiz();
		}else if(data.choices === "Add a cloze flashcard"){
			newCloze();
		}else {
			process.exit();
		};

	});
};

function newCloze(){
	inquirer.prompt([

		{
			type: "input",
			message: "Enter the text that will be your answer",
			name: "cloze",
			default: ""
		},

		{
			type: "input",
			message: "Enter the entire question including your answer",
			name: "question",
			default: ""
		}

	]).then(function(data){
		if(data.question.indexOf(data.cloze) !== -1){
			clozeExports.arr.push(new clozeExports.ClozeFlashcard(data.cloze, data.question));
			start();
		}else {
			console.log("Your answer is not included in the question");
			newCloze();
		};
	});
};

function quiz(){
	if(count < clozeExports.arr.length){

		inquirer.prompt([

			{
				type: "input",
				message: `${clozeExports.arr[count].displayQuestion()}`,
				name: "question",
				default: ""
			}

		]).then(function(data){

			if(data.question === clozeExports.arr[count].cloze) {
				console.log('correct');
				rightCount++;
			}else {
				console.log(clozeExports.arr[count].question);
				wrongCount++;
			};

			count++;
			quiz();

		});

	}else {
		gameOver();
	};

};

function gameOver(){
	console.log(`You had ${rightCount} right answers and ${wrongCount} wrong answers`);
	console.log("");

	inquirer.prompt([

		{
			type: "confirm",
			name: "confirm",
			message: "Play again?"
		}

	]).then(function(data){

		count = 0;
		rightCount = 0;
		wrongCount = 0;

		if(data.confirm){

			quiz();

		}else {

			start();
		}

	});

};

start();
