var d3 = require('d3');
    d3.layout.cloud = require('d3-cloud');

var d3WordCloud = {
	render : function(element){
	
		d3.select(element).append("svg")
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
	}
};

module.exports = d3WordCloud;