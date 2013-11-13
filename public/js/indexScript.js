$(function() {
    var tweetsTime = [];
    var socket = io.connect('http://localhost');
        socket.on('tweet', function (data) {
          // console.log(data);
          tweetsTime.push(data);
      });

    var $inputBox = $('#hashtagInput');
        $inputBox.keyup(function(event) {
          if(event.keyCode == 13){
            socket.emit('submit', $inputBox.val());
            update();
            $inputBox.val("");
          }
        });

    var data = [],
      totalPoints = 300,
      x=-1;

    function getTwitterData() {
      x++;
      var res = tweetsTime.length;
          tweetsTime = [];
      data.push([x, res]);

      console.log(data);
         var thing = data;

        return thing;
    }

    // Set up the control widget
    var updateInterval = 10000;

    var plot = $.plot("#placeholder", [ getTwitterData() ], {
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

    function update() {

      plot.setData([getTwitterData()]);

      // Since the axes don't change, we don't need to call plot.setupGrid()
      plot.draw();
      setTimeout(update, updateInterval);
    }

    // update();
  });