var express = require('express'),
	app = express(),
	server = require('http').createServer(app), // Express 3 requires that you instantiate a 'http.Server' to attach socket.io to first
	io = require('socket.io').listen(server),
	Twit = require("twit");

server.listen(3000);

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/index.html');
});

app.get('/public', function(req, res) {
	res.sendfile(__dirname + '/public/');
});

// Twitter credentials
var T = new Twit({
	consumer_key: 'PxZSp53IY87VzRYKIxH21Q',
	consumer_secret: 'tuawwFvYcVsGUa9QjMqIuIaAIJqkG55D3FexkYBeGOo',
	access_token: '132621831-ZKuJVduMq3f4tLahp4YAHR8ncOBTE0q0y4ahydpb',
	access_token_secret: 'GTh9P834XaEvYE9FMOjGCtTOTibdqssKV8NnFlbw'
});



io.sockets.on('connection', function(socket) {
	socket.on('submit', function(hashtag) {
		var stream = T.stream('statuses/filter', {
			track: hashtag,
			language: 'en'
		});

		stream.on('tweet', function(tweet) {
			// console.log(tweet);
			socket.emit('tweet', {
				tweetString: tweet.created_at
			});
		});

	});



});