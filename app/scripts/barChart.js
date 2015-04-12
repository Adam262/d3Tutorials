var barData = [
  { value: 150, color: 'red', label: 'foo' },
  { value: 250, color: 'blue', label: 'baz' },
  { value: 350, color: 'yellow', label: 'bar' },
  { value: 200, color: 'green', label: 'qux' },
  { value: 150, color: 'red', label: 'food' },
  { value: 500, color: 'blue', label: 'bazbar' },
  { value: 300, color: 'yellow', label: 'barbaz' },
  { value: 200, color: 'green', label: 'quux' },
  { value: 500, color: 'blue', label: 'bazbar' },
  { value: 300, color: 'yellow', label: 'barbaz' },
  { value: 200, color: 'green', label: 'quux' },
  { value: 150, color: 'black', label: 'norfwest' }
]

var barDataValues = barData.map(function(el){
  return el.value;
})

console.log(d3.range(0, barData.length));

var height    = 400,
    width     = 600,
    barWidth  = 50,
    barOffset = 1.1;

// add linear scale. without it, bars taller than svg height variable would overflow svg

var yScale = d3.scale.linear()
  .domain( [0, d3.max(barDataValues)] ) // input
  .range( [0, height] ) // output
    
// add orginal scale. without it,  additional bars would eventually overflow svg horizontally
// note rangeBands is range w/ some CSS, ie padding
var xScale = d3.scale.ordinal()
  .domain(d3.range(0, barDataValues.length))
  .rangeBands( [0, width] )

d3.select('#bar-chart-container')
  .append('svg')
    .property('id', 'bar-chart')
    .selectAll('rect')
      .data(barData)
      .enter()
      .append('rect')
        .style({
          'fill': function(barData){
            return barData.color;
            }
          })
        .attr({
          'width': xScale.rangeBand(),
          'height': function(barData){
            return yScale(barData.value); // scales data to height of svg
          },
          'x': function(barData, i){
            return xScale(i);
          },
          'y': function(barData){
            return height - yScale(barData.value);
          }
        })
        .append('text')
          .text(function(barData){
            return barData.label;
          })

         
