
var ClozeFlashcard = function(cloze, question){
	this.cloze = cloze;
	this.question = question;

	this.displayQuestion = function(){
		var display = question.replace(cloze, "...");
		return display;
	}

}

var arr = [];

var material = {
	"1976": "The first Apple computer was released in 1976",
	"2004": "Facebook was founded in 2004",
	"Graphical User Interface": "GUI stands for Graphical User Interface",
	"Structured Query Language": "SQL is an acronym for Structured Query Language",
	"1990": "CERN launched the first website in the year 1990",
	"Bill Gates": "Bill Gates, a Harvard dropout, co-founded Microsoft"
};

for (var key in material){
	arr.push(new ClozeFlashcard(key, material[key]));
}

module.exports = {arr, ClozeFlashcard};
