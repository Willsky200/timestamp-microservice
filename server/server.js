var express = require("express");
var app = express();
const hbs = require("hbs");
const timestamp = require("unix-timestamp");
const strftime = require("strftime");

var port = process.env.PORT || 3000;

var monthWords = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var monthValues = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];


app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
	res.render("index");
})

app.get("/:input", (req, res) => {
	var input = req.params.input;
	var fullDate = "";
	var unixDate = 0;

	if(!isNaN(input)){
		
		
		var inputDate = timestamp.toDate(+input);
		fullDate = (strftime('%B %d, %Y', inputDate));
		unixDate = +input;
	} else {
		var fullDate = input;
		var cleanInput = input.replace(",", "");
		var splitInput = cleanInput.split(" ");
		var monthWord = splitInput[0];
		var dayInput = splitInput[1];
		var dayFormatted = "";
		var monthNumber = "";
		for (var i = 0; i < monthWords.length; i++){
			if(monthWord === monthWords[i]){
				monthNumber = monthValues[i];
			}
		}
		// console.log(dayInput);
		if(dayInput.length < 2){
			dayFormatted = `0${dayInput}`;
		} else {
			dayFormatted = dayInput;
		}
		
		var isoTime = `${splitInput[2]}-${monthNumber}-${dayFormatted}`;
		//console.log(isoTime);

		var date = new Date(isoTime);
		var unixDate = timestamp.fromDate(date);
		// console.log(splitInput[1]);
		
	}

	res.json({
		"unix": unixDate,
		"natural": fullDate
	})
})


app.listen(port, function(){
	console.log(`Listening on port ${port}`)
})