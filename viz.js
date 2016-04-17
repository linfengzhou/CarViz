var width = 600,
            height = 400,
            margin = {top: 20, left: 30, right: 20, bottom: 20},
            innerWidth = width - margin.left-margin.right,
            innerHeight = height - margin.top - margin.bottom;

var data = [];


function optionviz(vdata){
    var xoption = d3.select("select#sel-x")
                    .selectAll("select#sel-x");
    
    var yoption = d3.select("select#sel-y")
                    .selectAll("select#sel-y");
    
    xoption.data(vdata)
            .enter()
            .append('option')
            .attr("value", function(d) {return d;})
            .text(function(d) {return d;});
    
    yoption.data(vdata)
            .enter()
            .append('option')
            .attr("value", function(d) {return d;})
            .text(function(d) {return d;});
}


function optionCheck(){
    var optionX = document.getElementById("sel-x").value;
    var optionY = document.getElementById("sel-y").value;
    
     dataViz1(data,optionX,optionY);
    
}

function dataViz1(vdata,xname,yname){
    var scplot = d3.select('#viz');
    
    var max_displacement = d3.max(vdata,function(d){
        return parseInt(d[xname]);})
    var max_mpg = d3.max(vdata, function(d) {
        return parseInt(d[yname]);})
    var min_mpg = d3.min(vdata, function(d){
        return parseInt(d[yname]);
    })
    var min_displacement = d3.min(vdata, function(d){
        return parseInt(d[xname]);
    })
    
    var mScale = d3.scale.linear().domain([min_mpg,max_mpg]).range([innerHeight,0]);
    var dScale = d3.scale.linear().domain([0,max_displacement]).range([0,innerWidth]);
    
    var yAxis = d3.svg.axis().scale(mScale).orient('left');
    var xAxis = d3.svg.axis().scale(dScale).orient('bottom');
    
    var scc = scplot.selectAll('g').data(vdata);
    
    scc.enter()
        .append('circle')
        .on("mouseenter", function(d){
            d3.select("h4").style({
             visibility: "visible",
             top: d3.event.clientY + 'px',
             left:d3.event.clientX + 'px',
             opacity: 1
             }).text(d.name)});
    
    scc.transition()
        .attr('cx', function(d) {
        return dScale(d[xname])})
        .attr('cy',function(d) {return mScale(d[yname]);})
        .attr('r',2);
    
    scc.exit().remove();
    
    
//    d3.select("svg")
    scplot.append("g")
        .attr('id','xAxisG')
        .call(xAxis)
        .attr("transform", "translate(" 
                                  + margin.left
                                  + "," 
                                  + (innerHeight+ margin.top) + ")");
//    d3.select("svg")
    scplot.append("g")
        .attr('id','yAxisG')
        .call(yAxis)
        .attr("transform", "translate(" 
                                  + margin.left
                                 + "," 
                                 + margin.top + ")");
    


}

function dataViz(vdata,xname,yname){
    var scplot = d3.select('#viz');
        
    var max_displacement = d3.max(vdata,function(d){
        return parseInt(d[xname]);})
    var max_mpg = d3.max(vdata, function(d) {
        return parseInt(d[yname]);})
    var min_mpg = d3.min(vdata, function(d){
        return parseInt(d[yname]);
    })
    var min_displacement = d3.min(vdata, function(d){
        return parseInt(d[xname]);
    })

    var mScale = d3.scale.linear().domain([min_mpg,max_mpg]).range([innerHeight,0]);
    var dScale = d3.scale.linear().domain([0,max_displacement]).range([0,innerWidth]);
    
    var yAxis = d3.svg.axis().scale(mScale).orient('right');
    var xAxis = d3.svg.axis().scale(dScale).orient('bottom');
    
    var scc = scplot.selectAll('g').data(vdata);
    
    scc.enter()
        .append('circle')
        .on("mouseenter", function(d){
                d3.select("h4").style({
                visibility: "visible",
                top: d3.event.clientY + 'px',
                left:d3.event.clientX + 'px',
                opacity: 1
            }).text(d.name)});
    
    scc.transition()
        .attr('cx', function(d) {
        return dScale(d.displacement)})
         .attr('cy',function(d) {return mScale(d[yname]);})
         .attr('r',2);
    
    scc.exit().remove();
    
    scc.append("g")
        .attr('id','xAxisG')
        .call(xAxis)
        .attr("transform", "translate(" 
                                  + margin.left
                                  + "," 
                                  + (innerHeight+ margin.top) + ")");
    scc.append("g")
        .attr('id','yAxisG')
        .call(yAxis)
        .attr("transform", "translate(" 
                                  + margin.left
                                 + "," 
                                 + margin.top + ")");
    

}

d3.csv("car.csv", function(error,data){
    
    var headerNames = d3.keys(data[0]);
    var headerValue = d3.values(data[1]);
    var xname = 'mpg';
    var yname = 'mpg';
    
    condition = headerValue.map(function(d) {return parseFloat(d).toString().length == d.length});
    
    var headerNum = []; 
    for (var i=0; i<condition.length+1;i++){
        if (condition[i]) {
            headerNum.push(headerNames[i]);
        }
    }
    optionviz(headerNum);
    
    dataViz1(data,xname,yname);
    
});