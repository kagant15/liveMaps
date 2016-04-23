var d3 = require('d3');
    d3.layout.cloud = require('d3-cloud');

var d3WordCloud = {

	cloudLayout : null,

	render : function(element, words){
	
		d3.select(element).append("svg")
      		.attr("width", 500)
      		.attr("height", 500)
      		.append("g")
        		.attr("transform", "translate(150,150)") 

		    // -- word cloud layout
		    this.cloudLayout = d3.layout.cloud().size([300, 300])
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
	},

	// TODO: need to fix this because I canged set state in its partent component
	update : function(cloudWords){
		console.debug("cloudWords.initialWords.cloudWords", cloudWords.initialWords.cloudWords);
		this.cloudLayout
        .stop()
        .words(cloudWords.initialWords.cloudWords.map(function(d){
          // return {text : d.text, size : 10 + Math.random() * 60} // use this with stock newWords
          return {text : d.text, size : d.size}  // use with words from twitter service
        }))
        .start();
	}

};

module.exports = d3WordCloud;