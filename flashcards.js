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
			choices: ["Quiz me!", "Add a flashcard", "End Program"],
			name: "choices"
		}

	]).then(function(data){

		if(data.choices === "Quiz me!"){
			quiz();
		}else if(data.choices === "Add a flashcard"){

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
				clozeExports.arr.push(new clozeExports.ClozeFlashcard(data.cloze, data.question));
				start();
			})

		}else {
			process.exit();
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

		if(data.confirm){

			count = 0;
			rightCount = 0;
			wrongCount = 0;

			quiz();

		}else {
			start();
		}

	});

};

start();
