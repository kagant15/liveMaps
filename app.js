/*
	THIS FILE ACTS AS THE ENTIRE BACKEND SERVER FOR THIS PROJECT
*/

var express = require('express'),
	app = express(),
	server = require('http').Server(app), // Express 3 requires that you instantiate a 'http.Server' to attach socket.io to first
	io = require('socket.io')(server),
	Twit = require("twit"),
	fs = require('fs');

server.listen(3000);

app.use(express.static('public'));

// routes
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/views/index.html');
});
// app.get('/public', function(req, res) {
// 	res.sendfile(__dirname + '/public/');
// });
// app.get('/node_modules', function(req, res) {
// 	res.sendfile(__dirname + '/node_modules/angular/angular.min.js');
// });

var configuration = JSON.parse(
    fs.readFileSync("config.json")
);

// Twitter credentials
var T = new Twit(configuration);

var stream;
var wordCount = {};
var tweets = [];
					//Long	Lat         long      lat
var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ]
var rockford = ['-89.14', '42.24', '-88.97', '42.31']
var newYork = ['-74','40','-73','41']
var sanFrancisco2 = [ '-122.52', '37.8', '-122.35', '37.7' ]
var washingtonDC = ['-77.208481', '38.794968', '-76.859665', '39.024718']
var US = ['-118.300781', '31.709476', '-65.917969', '46.118942']

//var bounds = ["-89.13999999999999", "42.24", "-88.97000000000003", "42.31"]

// setup websockets
io.on('connection', function(socket) {

	// when a user submits a hashtag
	socket.on('submit', function(hashtag, bounds) {
		console.log("submit");
		console.log("bounds: ", bounds);
		stream = T.stream('statuses/filter', {
			// track: hashtag,
		//	language: 'en',
			locations: bounds
		});

		// when a tweet comes through
		stream.on('tweet', function(tweet) {
			if(tweet.coordinates!=null){
				console.log("tweet coordinates:", tweet.geo.coordinates);
				// tweet.geo.coordinates[0] --- LAT tweet.geo.coordinates[1] --- Long
				// -- CHECK TO SEE IF THE CORDINATES LAY WITHIN THE BOUNDING BOX
				if((tweet.geo.coordinates[0] > bounds[1]) && (tweet.geo.coordinates[0] < bounds[3]) && (tweet.geo.coordinates[1] > bounds[0]) && (tweet.geo.coordinates[1] < bounds[2])){
					
					console.log("emit geolocationTweet event ")
					socket.emit('geolocationTweet', {
						cordinates : { 
							Lat : tweet.geo.coordinates[0], 
							Lng : tweet.geo.coordinates[1]
						},
						text: tweet.text
					});

					// -- keep the count of each word
					var tweetWords = tweet.text.split(" ")

					for(word in tweetWords){
					  if(wordCount[tweetWords[word]]){
					    wordCount[tweetWords[word]]+=1
					  }
					  else{
					    wordCount[tweetWords[word]]=1
					  }
					}

					// -- create an array of arrays [[word, count],[word, count]]
					// -- then sort it by word count size from low to high 
					var sortable = [];
					for(var word in wordCount){
						sortable.push([word, wordCount[word]])
					}
					sortable.sort(function(a,b){return a[1]-b[1]})

					// -- Take the ten words with the highest word count
					var newSortable = []
					for(var i=sortable.length-1; i>sortable.length-10; i--){
						if(sortable){
							// console.log("sortable", sortable);
							// console.log("i", i);
							newSortable.push({text: sortable[i][0], size: sortable[i][1]}) 
						}
						
					}

					console.log("emit cloud event")
					// -- used for word cloud
					socket.emit('cloud', {
						cloudWords : newSortable
					});
				
					socket.emit('tweet', {
						tweetString: tweet.text
					});

				}
				else{
					console.log("does not match")
				}
				
			}
		});

		// it would appear that everytime a tweet is received the connected message appears
		// stream.on('connected', function (response) {
  // 			console.log("connected: ");
		// })

		stream.on('limit', function (limitMessage) {
 			console.log("LIMIT MESSAGE: ", limitMessage);
		});

		stream.on('disconnect', function (disconnectMessage) {
			console.log("DISCONNECT MESSAGE: ");
		})

		stream.on('error', function (error) {
			console.log("ERROR MESSAGE: ", error);
		})

		stream.on('warning', function (warning) {
			console.log("warning");
		})

	});

	socket.on('close', function() {
		if(stream != undefined){
			stream.stop(); 
			console.log("stop Stream")
		}
	});

	socket.on('start', function() {
		if(stream != undefined){
			stream.start(); 
			console.log("start Stream");
		}
	});

});