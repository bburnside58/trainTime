$( document ).ready(function() {


// Firebase link to database:
var traData = new Firebase("https://traintiming.firebaseio.com/");

//Submit button function
$("#addTrainBtn").on("click", function(){

	console.log("add train button working")

	// Grabs user input
	var traName = $("#trainNameInput").val().trim();
	var traDest = $("#destinationInput").val().trim();
	// Need to get proper format for military time below, HH:mm
	var traFirst = moment($("#startInput").val().trim(), "HH:mm").format("X");
	var traFreq = moment($("#frequencyInput").val().trim(), "mm").format("X");

	

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

	//could put an alert on train addition...Modal?!?!?!

	// Clears all of the text-boxes
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#startInput").val("");
	$("#frequencyInput").val("");

	// Prevents moving to new page
	return false;
});

traData.on("child_added", function(childSnapshot, prevChildKey){

	console.log(prevChildKey);
	console.log(childSnapshot.val());


	// Store everything into a variable.
	var traName = childSnapshot.val().name;
	var traDest = childSnapshot.val().destination;
	var traFirst = childSnapshot.val().first;
	var traFreq = childSnapshot.val().frequency;

	//console logging all of the values stored in Firebase
	console.log(traName);
	console.log(traDest);
	console.log(traFirst);
	console.log(traFreq);



	//Too much converting, I know I do not need to include unix time for this exercise, for a later date to fix/make efficient.
	//Also, bug[can not enter frequency value larger than 59]

	//Format the first train's time
	var traStartFormat = moment.unix(traFirst).format("HH:mm");
		console.log("Your train started at " + traStartFormat);

	//Current time
	var currentTime = moment();
		console.log("Current Time is " + moment(currentTime).format("HH:mm"));

	//Difference between the current time and the first train's time
	var timeDiff = moment().diff(moment.unix(traFirst, 'X'), "minutes");
	console.log("The difference between the current time and the first time in minutes is " + timeDiff);

	//Format the frequency
	var traFreqFormat = moment.unix(traFreq).format("mm");
	console.log("Your frequency is " + traFreqFormat);

	//Time Apart (remainder)
	var tRemainder = timeDiff % traFreqFormat; 
		console.log("Remainder for calculation " + tRemainder);

	//Minutes till Train
	var tMinutesTillTrain = traFreqFormat - tRemainder;
	console.log("Minutes until the train " + tMinutesTillTrain)

	//Format the minutes away
	var tMinutesFormat = moment.unix(tMinutesTillTrain).format("mm")
		console.log("Minutes away formated " + tMinutesFormat)

	//nextTrain
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
		console.log("Planned Arrival Time: " + moment(nextTrain).format("HH:mm"));

	var nextArrival = moment(nextTrain).format("HH:mm");


	//Push to html table:
	$("#trainTable > tbody").append("<tr><td>" + traName + "</td><td>" + traDest + "</td><td>" + traFreqFormat + "</td><td>" + nextArrival + "</td><td>" + tMinutesTillTrain + "</td></tr>");



});

})
