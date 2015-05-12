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
          me.$boxButton = $('#boxButton');
          me.socket = io.connect(window.location.hostname);

          // everytime a tweet message is received from the server
          // add it to the list of tweets so that it can be counted later
          me.socket.on('tweet', function(data) {
            me.tweetsTime.push(data);
          });

          // close the connection every time the page loads
          me.socket.emit('close');

          me.plot = $.plot("#chart", [me.getTwitterData()], {
            series: {
              shadowSize: 0 // Drawing is faster without shadows
            },
            yaxis: {
              min: 0,
              max: 50
            },
            xaxis: {
              max: 100,
              show: true
            }
          });

          me.$startButton.click(function(event){
            me.socket.emit('start');
          });

          me.$stopButton.click(function(event){
            me.socket.emit('close');
          });

          me.$inputBox.keyup(function(event) {
            if (event.keyCode == 13) { //on Enter
              me.socket.emit('submit', me.$inputBox.val(), me.Map.getBounds()); //send the submit message and pass it the contents of the input box
              me.x = -1;
              me.data = []; // clear data
              me.update(); // kick off the updatter method to repeat every 5 seconds
              me.$inputBox.val("");
              $.plot("#placeholder", [0,0], {
                series: {
                  shadowSize: 0 // Drawing is faster without shadows
                },
                yaxis: {
                  min: 0,
                  max: 50
                },
                xaxis: {
                  max: 100,
                  show: true
                }
              });
            }
          });
    };

  // RETURNS THE ARRAY OF CORDINATES FOR THE CHART TO PLOT
  //  Y VALUE OF CORDINATE EQUALS THE NUMBER OF TWEETS
  //  X VALUE OF CORDINATE EQUALS THE NUMBER OF TIMES THIS HAS BEEN PLOTTED
  App.getTwitterData = function() {
    var me = App;
        me.x++; // every time twitter data is requested we increase X on the chart
    var numberOfTweets = me.tweetsTime.length;
    me.tweetsTime = []; // clear the number of tweets
    me.data.push([me.x, numberOfTweets]);
    var plotPoint = me.data;

    return plotPoint;
  };

  // -- Update the chart
  App.update = function() {
    var me = App;
        me.plot.setData([me.getTwitterData()]);

    // Since the axes don't change, we don't need to call plot.setupGrid()
    me.plot.draw();
    setTimeout(me.update, me.updateInterval); // repeat the update every so many seconds
  };

