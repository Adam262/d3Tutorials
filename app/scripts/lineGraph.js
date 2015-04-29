// data
var day = 0;

var Point = function() {
  this.x = new Date(2015, 2, day+=3);
  this.y = this.getRandom(100);
}

Point.prototype.getRandom = function(n){
  return Math.round(Math.random() * n);
}

Point.prototype.makeYearJson = function(){
  var json = [], 
  n = 0;

  while (n < 10) {
    json.push(new Point);
    n++;
  }

  return json;
}

var data = Point.prototype.makeYearJson(2015);
console.log(data);

// margin
var margin = { 
  top: 30,
  right: 30,
  bottom: 40,
  left: 50
}

// dimensions
var height    = 400 - margin.top - margin.bottom, // remove margins. add back below
    width     = 600 - margin.left - margin.right,
    barWidth  = 30,
    barOffset = 5;

// scales
var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

// axes
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(d3.time.format("%_b %e"))
    .tickSize(10)
    .tickPadding(10)

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

// line
var line = d3.svg.line()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });

// svg
var svg = d3.select("#line-graph-container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// tooltip
var toolTip = svg.append('div')
  .style({
    'position': 'absolute',
    'margin': '0 auto',
    'padding': '0 10px',
    'background': 'white',
    'opacity': 0
  })

x.domain(d3.extent(data, function(d) { return d.x; }));
y.domain(d3.extent(data, function(d) { return d.y; }));

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
     .selectAll("text")  
            .style("text-anchor", "end")
            .attr({
              'dx': '-0.em',
              'dy': '0.30em',
              'font-size': '0.5em',
              'transform': function(d) {
                return "rotate(-50)" 
                }
            })

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);

// js events

svg.on('mouseover', function(d){
  toolTip.transition()
    .style({
      'opacity': 0.9
    })

toolTip.html(data)
  .style({ 
    'left': (d3.event.pageX + 'px'),
    'top': (d3.event.pageY + 'px')
  })
})



