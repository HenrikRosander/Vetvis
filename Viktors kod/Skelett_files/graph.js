function drawGraph(data,points){

//delete

d3.select("svg").remove();


let r = data[0];
let g = data[1];
let b = data[2];
let a = data[3];

let colors = [];

for (var i = 0; i < r.length; i++) {
  colors.push(d3.rgb(data[0][i],data[1][i],data[2][i]));

}

var margin = {top: 50, right: 70, bottom: 60, left: 60},
    width = 700- margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#vis1")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("fill", "white")


var x = d3.scaleLinear()
  .domain([0,r.length])
  .nice()
  .range([ 0, width ]);

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 255])
  .nice()
  .range([ height, 0 ]);

  svg.attr("transform", "translate(50,0)");

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  svg.append("g")
    .call(d3.axisLeft(y));



    svg.on("click", function(){
    var coords = d3.mouse(this);
    console.log(coords);
    var newData= {
              x: Math.round( x.invert(coords[0])),  // Takes the pixel number to convert to number
              y: Math.round( y.invert(coords[1]))
            };
            console.log(newData);
            console.log(height-newData.y);
    addPoints(newData.x,newData.y, [Math.random() * 255,Math.random() * 255,Math.random() * 255]);
  });

    svg.selectAll("rect")
      .data(colors)
      .enter()
      .append("rect")
      .attr("x", function(d,i){
        return x(i);
      })
      .attr("y",height+20)
      .attr("width", width/colors.length +1)
      .attr("height", 40)
      .style("fill",function(d){
        return d;
        });


    // Add the line
    svg.append("path")
      .datum(a)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 4)
      .attr("d", d3.line()
        .x(function(d,i) { return x(i); })
        .y(function(d) { return y(d); })
        .curve(d3.curveBasis)
      );

  svg.append("text")
    .text('Value')
    .attr("text-anchor", "middle")
    .attr("class", "graph-title")
    .style("fill","black")
    .style("font-size", 20)
    .attr("y", 330)
    .attr("x", width+20);

    svg.append("text")
    .attr("class", "label")
    .attr("y", -50)
    .attr("x",2*(-height/3)+10)
    .attr("transform", "rotate(-90)")
    .attr("dy", ".71em")
    .style("font-size", "20")
    .style("fill", "black")
    .text("Opacity");

}
