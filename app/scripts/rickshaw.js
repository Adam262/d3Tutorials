var graph = new Rickshaw.Graph({
    element: document.querySelector('#rickshaw-line-graph-container'),
    height: 400,
    width: 600,
    renderer: 'line',
    series:[{
        color: 'steelblue',
        data: [
            { x: 0, y: 40 }, 
            { x: 1, y: 29 }, 
            { x: 2, y: 18.7 }, 
            { x: 3, y: 5 }, 
            { x: 4, y: 32 } 
        ]
    }, 
    {
        color: 'lightblue',
        data: [
            { x: 0, y: 5.5 }, 
            { x: 1, y: 19 }, 
            { x: 2, y: 28 }, 
            { x: 3, y: 30 }, 
            { x: 4, y: 32 } 
        ]
    }, 

    ]

});

// create time units
var time = new Rickshaw.Fixtures.Time(),
    weeks = time.unit('week');

// create axes
var xAxis = new Rickshaw.Graph.Axis.Time({
    graph: graph,
    timUnit: weeks
}), 
    yAxis = new Rickshaw.Graph.Axis.Y({
    graph: graph
});

// create tooltip
var hoverDetail = new Rickshaw.Graph.HoverDetail({
    graph: graph,
    xFormatter: function(x) { return x + "x" },
    yFormatter: function(y) { return Math.floor(y) + " y" }
})

yAxis.render();
xAxis.render();
graph.render();


console.log(graph)