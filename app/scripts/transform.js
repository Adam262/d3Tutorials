function makeData(n) {
  var arr = [];

  while (n > 0) {
    arr.push(5 + Math.round(Math.random() * 100))
    n--;
  }
  return arr;
};

var data = makeData(100);

data = data.sort(function(a,b) {
 return a - b;
})

var margin = { // create margin object. see http://bl.ocks.org/mbostock/3019563
  top: 30,
  right: 30,
  bottom: 40,
  left: 50
}

var height    = 400 - margin.top - margin.bottom, // remove margins. add back below
    width     = 600 - margin.left - margin.right,
    barWidth  = 30,
    barOffset = 5;

var tempColor;

// add linear scale. without it, bars taller than svg height variable would overflow svg
var yScale = d3.scale.linear()
  .domain([0, d3.max(data)]) // input
  .range([0, height]) // output
   
// add orginal scale. without it,  additional bars would eventually overflow svg horizontally
// note rangeBands is range w/ some CSS, ie padding
var xScale = d3.scale.ordinal()
  .domain(d3.range(0, data.length))
  .rangeBands([0, width], 0.3) // add padding to rangeBands

// 4 item example
var colors = d3.scale.linear()
  .domain([0, data.length * 0.33, data.length * 0.66, data.length]) // map value to decimal
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

var barChart = d3.select('#data-transformations-container')
  .append('svg')
    .attr({
      'width': width + margin.left + margin.right,
      'height': height + margin.top + margin.bottom 
    })
    .property('id', 'data-transformation')
    .append('g') // add svg element group
    .property('id', 'bar-elements')
    .attr('transform', 'translate(' + margin.left + ',' + margin.right + ')')
    .selectAll('rect')
      .data(data) // once you invoke .data(), can then call data argument whatever you want - ie, d
      .enter()
      .append('rect')
        .style('fill', function(d, i){ // add color gradient scaled to length of xScale
          return colors(i);
        })
        .attr({
          'width': xScale.rangeBand(),
          'height': 0, // move height attribute to variable transition
          'x': function(d, i){
            return xScale(i);
          },
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

// create y axis scale. Existing yScale reads in wrong order
var vGuideScale = d3.scale.linear()
  .domain([0, d3.max(data)])
  .range([height, 0]) // reverse range from yScale

var hGuideScale = d3.scale.linear()
  .domain([])
  .range([])

// create y axis
var vAxis = d3.svg.axis()
  .scale(vGuideScale)
  .orient('left') // right, top, bottom
  .ticks(10)

// create svg element group for axis ticks
var vGuide = d3.select('svg#data-transformation')
  .append('g')
  .property('id', 'vGuide')

vAxis(vGuide)

vGuide.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

vGuide.selectAll('path')
    .style({
      'fill': 'none',  // remove thick bar from y axis - now just ticks
      'stroke': '#000' // replace with thin bar
    })

vGuide.selectAll('line')
    .style({
      'stroke': '#000' // set tick marks
    })

// create x axis
var hAxis = d3.svg.axis()
  .scale(xScale)
  .orient('bottom')
  .tickValues(xScale.domain().filter(function(d,i) {
    return !(i % (data.length/5));  // filters out ticks. in this case, only 5 ticks, regardless of data size
  }))    
 

var hGuide = d3.select('svg#data-transformation')
  .append('g')
  .property('id', 'hGuide')

hAxis(hGuide)

hGuide.attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')

hGuide.selectAll('path').attr({
  'fill': 'none',
  'stroke': '#000'
})

hGuide.selectAll('line').attr({
  'stroke': '#000'
})

