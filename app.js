var express = require('express'),
	app = express(),
	server = require('http').createServer(app), // Express 3 requires that you instantiate a 'http.Server' to attach socket.io to first
	io = require('socket.io').listen(server),
	Twit = require("twit");

server.listen(process.env.PORT || 3000);

app.use(express.static('public'));

// routes
app.get('/', function(req, res) {
	res.sendfile(__dirname + '/public/views/index.html');
});
app.get('/maps', function(req, res) {
	res.sendfile(__dirname + '/public/views/maps.html');
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

	// when a user submits a hashtag
	socket.on('submit', function(hashtag) {
		var stream = T.stream('statuses/filter', {
			track: hashtag,
			language: 'en'
		});

		// when a tweet comes through
		stream.on('tweet', function(tweet) {
			if(tweet.coordinates!=null){
				console.log(tweet.text);
				socket.emit('geolocationTweet', {
					location: tweet.geo.coordinates,
					text: tweet.text
				});
				
				socket.emit('tweet', {
					tweetString: tweet.created_at
				});
			}
		});
	});

});