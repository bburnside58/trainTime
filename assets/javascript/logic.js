$( document ).ready(function() {



var traData = new Firebase("https://blazing-inferno-6961.firebaseio.com/");

$("#addTrainBtn").on("click", function(){

console.log("add train button working")

// Grabs user input
var traName = $("#trainNameInput").val().trim();
var traDest = $("#destinationInput").val().trim();
// Need to get proper format for military time below, HH:mm
var traFirst = moment($("#startInput").val().trim(), "HH:mm").format("X");
var traFreq = $("#frequencyInput").val().trim();

// Creates local "temporary" object for holding train data
var newTra = {
	name:  traName,
	destination: traDest,
	first: traFirst,
	frequency: traFreq
}

// Uploads train data to the database
traData.push(newTra);

// Logs everything to console
console.log(newTra.name);
console.log(newTra.destination); 
console.log(newTra.first);
console.log(newTra.frequency)

//could put an alert on train addition...

// Clears all of the text-boxes
$("#trainNameInput").val("");
$("#destinationInput").val("");
$("#startInput").val("");
$("#frequencyInput").val("");

// Prevents moving to new page
return false;
});






})
