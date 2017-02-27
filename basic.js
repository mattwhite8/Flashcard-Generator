//Constructor for the basic flashcard
var BasicFlashcard = function(front, back){
	this.front = front;
	this.back = back;
}

//Empty array that will house our basic flashcard objects
var arr = [];

//Key Value pairs for the basic object
var material = {
	"What was the name of the first electronic general-purpose computer": "ENIAC",
	"What does HTTP stand for in a website address": "HyperText Transfer Protocol",
	"In what year did Nintendo release its first game console in North America": "1985",
	"In what year was the iPhone first released": "2007"
};

//Loop through material and construct objects
for (var key in material){
	arr.push(new BasicFlashcard(key, material[key]));
};

//Export the array of objects and the constructor out to flashcards.js
module.exports = {arr, BasicFlashcard};