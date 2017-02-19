var arrOfFlashcards = require('./cloze.js');

var inquirer = require('inquirer');

var count = 0;

function quiz(){
	if(count < arrOfFlashcards.length){
		inquirer.prompt([

			{
				type: "input",
				message: `${arrOfFlashcards[count].displayQuestion()}`,
				name: "question",
				default: ""
			}

		]).then(function(data){

			if(data.question === arrOfFlashcards[count].cloze) {
				console.log('correct');
			}else {
				console.log(arrOfFlashcards[count].question);
			}
			
			count++;
			quiz();

		});
	};
};

quiz();
