// var barData = [
//   { value: 150, color: 'red', label: 'foo' },
//   { value: 250, color: 'blue', label: 'baz' },
//   { value: 350, color: 'yellow', label: 'bar' },
//   { value: 200, color: 'green', label: 'qux' },
//   { value: 150, color: 'red', label: 'food' },
//   { value: 500, color: 'blue', label: 'bazbar' },
//   { value: 300, color: 'yellow', label: 'barbaz' },
//   { value: 200, color: 'green', label: 'quux' },
//   { value: 500, color: 'blue', label: 'bazbar' },
//   { value: 300, color: 'yellow', label: 'barbaz' },
//   { value: 200, color: 'green', label: 'quux' },
//   { value: 200, color: 'green', label: 'quux' },
//   { value: 500, color: 'blue', label: 'bazbar' },
//   { value: 300, color: 'yellow', label: 'barbaz' },
//   { value: 200, color: 'green', label: 'quux' },
//   { value: 150, color: 'black', label: 'norfwest' }
// ]

function makeData(n) {
  var arr = [];

  while (n > 0) {
    arr.push(1 + Math.round(Math.random() * n))
    n--;
  }
  return arr;
};

var barDataValues = makeData(100)

var height    = 400,
    width     = 600,
    barWidth  = 30,
    barOffset = 5;

var tempColor;

// add linear scale. without it, bars taller than svg height variable would overflow svg
var yScale = d3.scale.linear()
  .domain([0, d3.max(barDataValues)]) // input
  .range([0, height]) // output
   
// add orginal scale. without it,  additional bars would eventually overflow svg horizontally
// note rangeBands is range w/ some CSS, ie padding
var xScale = d3.scale.ordinal()
  .domain(d3.range(0, barDataValues.length))
  .rangeBands([0, width])

// number of items in domain must match number of items in range
// 2 item example
// var colors = d3.scale.linear()
//   .domain([0, barDataValues.length])
//   .range(['#FFB832', '#C61C6F']);

// 4 item example
var colors = d3.scale.linear()
  .domain([0, barDataValues.length * 0.33, barDataValues.length * 0.66, barDataValues.length]) // map value to decimal
  .range(['#B58929', '#C61C6F', '#268BD2', '#85992C']);

var toolTip = d3.select('#bar-chart-container')
                .append('div')
                .style({
                  'position': 'absolute',
                  'margin': '0 auto',
                  'padding': '0 10px',
                  'background': 'white',
                  'opacity': 0
                })

var barChart = d3.select('#bar-chart-container')
  .append('svg')
    .property('id', 'bar-chart')
    .selectAll('rect')
      .data(barDataValues) // once you invoke .data(), can then call data argument whatever you want - ie, d
      .enter()
      .append('rect')
        .style('fill', function(d, i){ // add color gradient scaled to length of xScale
          return colors(i);
        })
        .attr({
          'width': xScale.rangeBand(),
          'height': 0, // move height attribute to variable transition
          // 'height': function(barDataValues){
          //   return yScale(barDataValues); // scales data to height of svg
          // },
          'x': function(d, i){
            return xScale(i);
          },
          // 'y': function(barDataValues){
          //   return height - yScale(barDataValues);
          // }
          'y': height
        })
      // add JS events
      .on('mouseover', function(d){
          toolTip.transition()
            .style({
              'opacity': 0.9
            })

          toolTip.html(d)
            .style({ // add style so tooltip follows mouse, via pageX, pageY
              'left': (d3.event.pageX + 'px'),
              'top': (d3.event.pageY + 'px')
            })

          tempColor = this.style.fill; // note use SVG 'fill', not CSS 'background' or 'color'

          d3.select(this)
            // .transition(100) // add transition. default duration is 250ms
            .style({
              'opacity': 0.5,
              'fill': 'yellow'
            })
        })
     .on('mouseout', function(d){
        d3.select(this)
          // .transition().duration(800)
          .style({
            'opacity': 1,
            'fill': tempColor
          })
      })
        // .append('text')
        //   .text(function(barData){
        //     return barData.label;
        //   })

// add transitions to whole chart
barChart.transition()
    .attr({
          'height': function(d){
            return yScale(d); // scales data to height of svg
          },
          'y': function(d){
            return height - yScale(d);
          }
        })
    .delay(function(d,i){
      return i * 15;
    })
    .duration(1000)
    .ease('elastic') // add easing. see https://github.com/mbostock/d3/wiki/Transitions#ease

         
