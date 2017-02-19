
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
	"Graphical User Interface": "GUI stands for Graphical User Interface"
};

for (var key in material){
	arr.push(new ClozeFlashcard(key, material[key]));
}

module.exports = arr;
