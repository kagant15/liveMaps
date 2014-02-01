var App = {};

    App.tweetsTime = [];
    App.data = [];
    App.totalPoints = 300;
    App.x = -1;
    App.$inputBox = $('#hashtagInput');
    App.socket = io.connect('http://localhost');
    App.plot = null;
    App.updateInterval = 10000; // every 5 seconds update the graph

    App.initialize = function() {
      var me = App;
          me.socket.on('tweet', function(data) {
            console.log(data);
            me.tweetsTime.push(data);
          });

          me.plot = $.plot("#chart", [me.getTwitterData()], {
            series: {
              shadowSize: 0 // Drawing is faster without shadows
            },
            yaxis: {
              min: 0,
              max: 30
            },
            xaxis: {
              max: 100,
              show: true
            }
          });

          me.$inputBox.keyup(function(event) {
            if (event.keyCode == 13) { //on Enter
              me.socket.emit('submit', me.$inputBox.val());
              me.x = -1;
              me.data = []; // clear data
              me.update();
              me.$inputBox.val("");
              $.plot("#placeholder", [0,0], {
                series: {
                  shadowSize: 0 // Drawing is faster without shadows
                },
                yaxis: {
                  min: 0,
                  max: 30
                },
                xaxis: {
                  max: 100,
                  show: true
                }
              });
            }
          });
    };

  App.getTwitterData = function() {
    var me = App;
        me.x++;
    var res = me.tweetsTime.length;
    me.tweetsTime = [];
    me.data.push([me.x, res]);

    console.log(me.data);
    var thing = me.data;

    return thing;
  };

  App.update = function() {
    var me = App;
        me.plot.setData([me.getTwitterData()]);

    // Since the axes don't change, we don't need to call plot.setupGrid()
    me.plot.draw();
    setTimeout(me.update, me.updateInterval);
  };

