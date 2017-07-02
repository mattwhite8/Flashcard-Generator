//Constructor for the cloze flashcard
var ClozeFlashcard = function(cloze, question){
	this.cloze = cloze;
	this.question = question;

	this.displayQuestion = function(){
		var display = question.replace(cloze, "...");
		return display;
	};

};

//Empty array that will house our cloze flashcard objects
var arr = [];

//Key Value pairs for the cloze object
var material = {
	"1976": "The first Apple computer was released in 1976",
	"2004": "Facebook was founded in 2004",
	"Graphical User Interface": "GUI stands for Graphical User Interface",
	"Structured Query Language": "SQL is an acronym for Structured Query Language",
	"1990": "CERN launched the first website in the year 1990",
	"Bill Gates": "Bill Gates, a Harvard dropout, co-founded Microsoft"
};

//Loop through material and construct objects
for (var key in material){
	arr.push(new ClozeFlashcard(key, material[key]));
}

//Export the array of objects and the constructor out to flashcards.js
module.exports = {arr, ClozeFlashcard};
