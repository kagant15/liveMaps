var mapScript = require('./mapScript');
var d3 = require('d3');
    d3.layout.cloud = require('d3-cloud');

var App = {

  initialize : function(socket){
    var me = this;
    
    var $stopButton = $('#stopButton');
    var $startButton = $('#startButton');
    var $inputBox = $('#hashtagInput');

    // close the connection every time the page loads
    socket.emit('close');

    // -- start button
    $startButton.click(function(event){
      socket.emit('start');
    });

    // -- stop button
    $stopButton.click(function(event){
      socket.emit('close');
    });

    // -- input box
    $inputBox.keyup(function(event) {
      if (event.keyCode == 13) { //on Enter
        socket.emit('submit', $inputBox.val(), mapScript.getBounds()); //send the submit message and pass it the contents of the input box
        $inputBox.val("");
      }
    });

    // -- cloud words
    var cloudWords = []

    // -- received updated cloud words from server
    socket.on('cloud', function(data) {
      cloudWords = data.cloudWords
    });

    // -- The word cloud svg canvas
    d3.select("body").append("svg")
      .attr("width", 500)
      .attr("height", 500)
      .append("g")
        .attr("transform", "translate(150,150)") 

    // -- default starting words
    var words = [
      {text : "One", size : 20},
      {text : "Two", size : 30},
      {text : "Three", size : 40},
      {text : "Four", size : 50},
      {text : "Five", size : 60},
      {text : "Six", size : 70},
      {text : "Seven", size : 20},
      {text : "Eight", size : 30},
      {text : "Nine", size : 40},
      {text : "Ten", size : 50},
      {text : "Eleven", size : 60},
      {text : "Zero", size : 70}
    ]

    // -- word cloud layout
    var cloudLayout = d3.layout.cloud().size([300, 300])
        .words(words)
        .padding(0)
        .rotate(function() { return ~~(Math.random() * 2) * 90; })
        .font("Impact")
        .fontSize(function(d) { return d.size; })
        .on("end", draw)
        .start();
    
    function draw(words) {
      var fill = d3.scale.category20();
      var text = d3.select("g").selectAll("text") // select all text
                   .data(words, function(d) {return d.text});

      // -- update
      text.transition()
        .duration(750)
        .style("font-size", function(d){ return d.size + "px"; })
        .attr("transform", function(d){ 
          return "translate(" + [d.x, d.y] +")rotate(" + d.rotate + ")"
        });
      
      // -- create
      text.enter()
        .append("text")
          .style("font-size", function(d) { return d.size + "px"; })
          .style("font-family", "Impact")
          .style("fill", function(d, i) { return fill(i); })
          // .style("fill-opacity", 1e-6)
          .attr("text-anchor", "middle")
          .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .text(function(d) { return d.text; });

      // -- delete
      text.exit().transition()
        .duration(750)
        .style("fill-opacity", 1e-6)
        .remove();  
    
    } // -- end of draw    

    // -- update the word cloud with the lastest from the server
    setInterval(function(){  
      cloudLayout
        .stop()
        .words(cloudWords.map(function(d){
          // return {text : d.text, size : 10 + Math.random() * 60} // use this with stock newWords
          return {text : d.text, size : d.size}  // use with words from twitter service
        }))
        .start()
    }, 3000)    

  } // -- end of initialize

};

module.exports = App;  

