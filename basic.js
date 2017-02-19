var BasicFlashcard = function(front, back){
	this.front = front;
	this.back = back;
}

var arr = [];

var material = {
	"What was the name of the first electronic general-purpose computer": "ENIAC",
	"What does HTTP stand for in a website address": "HyperText Transfer Protocol",
	"In what year did Nintendo release its first game console in North America": "1985",
	"In what year was the iPhone first released": "2007"
};

for (var key in material){
	arr.push(new BasicFlashcard(key, material[key]));
};

module.exports = {arr, BasicFlashcard};