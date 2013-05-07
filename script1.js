function adder(colormapping, minimum, maximum, count) {
console.log(colormapping);
var color = d3.scale.quantile().domain([minimum,maximum]).range(colorbrewer.YlGn[8]);
var c = cancer[count].incidencerateper100000;
count++;						
return color(c);
}
