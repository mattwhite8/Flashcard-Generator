var clozeExports = require('./cloze.js');
var basicExports = require('./basic.js');

var inquirer = require('inquirer');
var fs = require('fs');

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
			choices: ["Quiz me with cloze flashcards!", 
			          "Quiz me with basic flashcards!",
			          "Add a cloze flashcard", 
					  "Add a basic flashcard", 
					  "End Program"],
			name: "choices"
		}

	]).then(function(data){

		if(data.choices === "Quiz me with cloze flashcards!"){
			quiz();
		}else if(data.choices === "Quiz me with basic flashcards!"){
			basicQuiz();
		}else if(data.choices === "Add a cloze flashcard"){
			newCloze();
		}else if(data.choices === "Add a basic flashcard"){
			newBasic();
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

function newBasic(){
	inquirer.prompt([

		{
			type: "input",
			message: "Enter the text that will be the front of the card",
			name: "front",
			default: ""
		},

		{
			type: "input",
			message: "Enter the text that will be the back of the card",
			name: "back",
			default: ""
		}

	]).then(function(data){
		basicExports.arr.push(new basicExports.BasicFlashcard(data.front, data.back));

		inquirer.prompt([

			{
				type: "confirm",
				name: "confirm",
				message: "Do you want to save your card to output.txt?"
			}

		]).then(function(data){
			if(data.confirm){
				saveBasic(basicExports.arr[basicExports.arr.length - 1]);
				start();
			}else {
				start();
			};
		});
	});
};

function saveBasic(flashcard){
	fs.appendFile('output.txt', `Front: ${flashcard.front} Back: ${flashcard.back}`, 'UTF-8', function(error){
		if (error) throw error;
	});
}

function saveCloze(){

}

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


function basicQuiz(){
	if(count < basicExports.arr.length){

		inquirer.prompt([

			{
				type: "input",
				message: `${basicExports.arr[count].front}`,
				name: "question",
				default: ""
			}

		]).then(function(data){

			if(data.question === basicExports.arr[count].back) {
				console.log('correct');
				rightCount++;
			}else {
				console.log(basicExports.arr[count].back);
				wrongCount++;
			};

			count++;
			basicQuiz();

		});

	}else {
		gameOverBasic();
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

function gameOverBasic(){
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
			basicQuiz();
		}else {
			start();
		}

	});

}

start();
