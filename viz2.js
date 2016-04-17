// define global variabbles
var width = 600,
    height = 400,
    margin = {
        top: 20,
        left: 30,
        right: 20,
        bottom: 20
    },
    innerWidth = width - margin.left - margin.right,
    innerHeight = height - margin.top - margin.bottom;
var data = [];
//var scplot = d3.select('#viz').append('g')
//          .attr("transform", "translate(" 
//                                  + margin.left
//                                  + "," 
//                                  + margin.top + ")");
var scplot = d3.select('#viz');
var xAxisGroup = scplot.append('g')
    .attr("transform", "translate(" + margin.left + "," + (innerHeight + margin.top) + ")");
var yAxisGroup = scplot.append('g')
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var scc = scplot.append('g');
    
d3.csv("car.csv", function(error, result) {
    // define data
    data = result;
    var headerNames = d3.keys(data[0]);
    var headerValue = d3.values(data[1]);
    var xname = 'mpg';
    var yname = 'mpg';
    var condition = headerValue.map(function(d) {
        return parseFloat(d).toString().length == d.length;
    });
    var headerNum = [];
    for (var i = 0; i < condition.length + 1; i++) {
        if (condition[i]) {
            headerNum.push(headerNames[i]);
        }
    }
    optionviz(headerNum);
    dataViz(data, xname, yname);
});
function dataViz(vdata, xname, yname) {
    var max_displacement = d3.max(vdata, function(d) {
        return parseInt(d[xname]);
    });
    var max_mpg = d3.max(vdata, function(d) {
        return parseInt(d[yname]);
    });
    var min_mpg = d3.min(vdata, function(d) {
        return parseInt(d[yname]);
    })
    var min_displacement = d3.min(vdata, function(d) {
        return parseInt(d[xname]);
    });
    var mScale = d3.scale.linear().domain([min_mpg, max_mpg]).range([innerHeight, 0]);
    var dScale = d3.scale.linear().domain([0, max_displacement]).range([0, innerWidth]);
    var yAxis = d3.svg.axis().scale(mScale).orient('left');
    var xAxis = d3.svg.axis().scale(dScale).orient('bottom');
    var render_scc = scc.selectAll('circle').data(vdata);
    render_scc.enter()
        .append('circle')
        .on("mouseenter", function(d) {
            d3.select("h4").style({
                visibility: "visible",
                top: d3.event.clientY + 'px',
                left: d3.event.clientX + 'px',
                opacity: 1
            }).text(d.name)
        });
    render_scc.transition()
        .attr('cx', function(d) {
            return dScale(d[xname])
        })
        .attr('cy', function(d) {
            return mScale(d[yname]);
        })
        .attr('r', 2);
    render_scc.exit()
        .remove();
    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);
}
    
function optionCheck() {
    var optionX = document.getElementById("sel-x").value;
    var optionY = document.getElementById("sel-y").value;
    dataViz(data, optionX, optionY);
}
function optionviz(vdata) {
    var xoption = d3.select("select#sel-x")
        .selectAll("select#sel-x");
    var yoption = d3.select("select#sel-y")
        .selectAll("select#sel-y");
    xoption.data(vdata)
        .enter()
        .append('option')
        .attr("value", function(d) {
            return d;
        })
        .text(function(d) {
            return d;
        });
    yoption.data(vdata)
        .enter()
        .append('option')
        .attr("value", function(d) {
            return d;
        })
        .text(function(d) {
            return d;
        });
}