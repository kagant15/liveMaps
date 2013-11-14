$(function() {
  var tweetsTime = [],
    data = [],
    totalPoints = 300,
    x = -1,
    $inputBox = $('#hashtagInput'),
    socket = io.connect('http://localhost');
  socket.on('tweet', function(data) {
    // console.log(data);
    tweetsTime.push(data);
  });

  $inputBox.keyup(function(event) {
    if (event.keyCode == 13) {
      socket.emit('submit', $inputBox.val());
      x = -1;
      data = [];
      update();
      $inputBox.val("");
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

  function getTwitterData() {
    x++;
    var res = tweetsTime.length;
    tweetsTime = [];
    data.push([x, res]);

    console.log(data);
    var thing = data;

    return thing;
  }

  var updateInterval = 10000;

  function update() {

    plot.setData([getTwitterData()]);

    // Since the axes don't change, we don't need to call plot.setupGrid()
    plot.draw();
    setTimeout(update, updateInterval);
  }

  var plot = $.plot("#placeholder", [getTwitterData()], {
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

});