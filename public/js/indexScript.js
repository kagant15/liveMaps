var App = {};

    App.tweetsTime = [];
    App.data = [];
    App.totalPoints = 300;
    App.x = -1;
    App.plot = null;
    App.updateInterval = 10000; // every 5 seconds update the graph

    App.initialize = function() {
      var me = App;
          me.$inputBox = $('#hashtagInput');
          me.$stopButton = $('#stopButton');
          me.$startButton = $('#startButton');
          me.socket = io.connect(window.location.hostname);

          // everytime a tweet message is received from the server
          // add it to the list of tweets so that it can be counted later
          me.socket.on('tweet', function(data) {
            me.tweetsTime.push(data);
          });

          // close the connection every time the page loads
          me.socket.emit('close');

          me.$startButton.click(function(event){
            me.socket.emit('start');
          });

          me.$stopButton.click(function(event){
            me.socket.emit('close');
          });

          setTimeout(function(){
            console.log(me.$inputBox)
          }, 1000)

          me.$inputBox.keyup(function(event) {
            if (event.keyCode == 13) { //on Enter
              me.socket.emit('submit', me.$inputBox.val(), me.Map.getBounds()); //send the submit message and pass it the contents of the input box
              me.x = -1;
              me.data = []; // clear data
              me.$inputBox.val("");
            }
          });
    };

module.exports = App;  

