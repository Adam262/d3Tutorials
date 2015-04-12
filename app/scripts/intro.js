$(document).ready(function(){
  $('.container > h2:first-child').html('D3 Selects Grunge')
})


// bind data to DOM element
var myStyles = [
  { color: 000, width: 1000, name: '' }, 
  { color: '#aaa', width: 800, name: 'Kurt Cobain' }, 
  { color: '#bbb', width: 700, name: 'Layne Staley' }, 
  { color: '#ccc', width: 600, name: 'Eddie Vedder' }, 
  { color: '#ddd', width: 500, name: 'Kris Novoselic' }, 
  { color: '#eee', width: 400, name: 'Rivers Cuomo' }, 
  { color: '#fff', width: 300, name: 'Nickelback' }
] // each element of array is a node of selectAll. 

d3.select('#d3-select').selectAll('div.item') // select a class that does not exist yet
  .data(myStyles)
  .enter() // set placeholder note. creates d3 sub-selection. often used with append, insert
  .append('div')
  .attr('class', 'item')
  .text(function(data){ 
    return data.name; // set text programatically. 
  }) 
  .style({
      'background': function(data){
        return data.color;
    },
      'width': function(data){
        return data.width + 'px';
    }
  })

  // add Dave Grohl to empty div and style
d3.select('.item:first-child')
  .style({
    'color': 'blue', 
    'border': '0.5em dotted blue', 
    'text-align': 'center',
    'padding': '2%'
  })
  .html('<h1> Dave Grohl </h1>')

// get rid of Nickelback
d3.select('.item:last-child').remove()

// append Taylor Hawkins. .property(), .attr() or .classed() work
d3.select('#d3-select')
  .append('div')
  // .property({'className': 'item'})  // overwrites existing class
  .attr({'class': 'item'}) // overwrites existing class
  .classed({
    'highlight': true,
    'lowlight': false,
    }) // appends to existing class. good for toggling
  .text('Taylor Hawkins')

// style globally
d3.selectAll('.item:nth-child(2n+1)').style('color', 'yellow')
d3.selectAll('.item:nth-child(2n+2)').style('color', 'green')