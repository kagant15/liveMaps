var express = require('express'),
	app = express(),
	server = require('http').createServer(app), // Express 3 requires that you instantiate a 'http.Server' to attach socket.io to first
	io = require('socket.io').listen(server),
	Twit = require("twit");

server.listen(5000);

app.use(express.static('public'));

// routes
app.get('/', function(req, res) {
	res.sendfile(__dirname + '/index.html');
});
app.get('/maps', function(req, res) {
	res.sendfile(__dirname + '/maps.html');
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

// setup websockets
io.sockets.on('connection', function(socket) {
	socket.on('submit', function(hashtag) {
		var stream = T.stream('statuses/filter', {
			track: hashtag,
			language: 'en'
		});

		stream.on('tweet', function(tweet) {
			if(tweet.coordinates!=null){
				console.log(tweet.user.location +" >>> "+tweet.geo.coordinates);
				socket.emit('geolocationTweet', {
					location: tweet.geo.coordinates
				});
			}
		});
	});

});