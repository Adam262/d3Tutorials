d3.select('#svg-d3-container')
  .append('svg')
    .attr('id', 'svg-d3')
  .append('rect')
    .attr({
      x: 200,
      y: 100,
      height: 200,
      width: 200,
      fill: 'red'
    })
 
// now separate select for shape we just created
d3.select('#svg-d3')
  .append('circle')
    .attr({
      cx: 300,
      cy: 200,
      r: 100,
      fill: 'blue'
    })

d3.select('#svg-d3')
  .append('polyline')
  .attr({
    points: '225 270 300 100 400 200',
    fill: 'yellow'
  })
 