$(document).ready(function() {
	var x = ["Frank Bi","Hongfei Bi","Marley K","Steve Jobs"];
	var v = "g";
	window.onload = function() { Tabletop.init( { key: 'https://docs.google.com/spreadsheet/pub?key=0ApkOQ_YIvKtsdGRUcE9rNFlxZHc3V2ozNUxreldlQ3c&output=html', callback: showInfo } ); }	
	initMap(x, v);
});


function showInfo(data) {
	aml = data.Acute_myeloid_leukemia.elements;
	bladder = data.Bladder.elements;
	brain = data.Brain_nervous_system.elements;
	breast = data.Breast.elements;
	cll = data.Chronic_lymphocytic_leukemia.elements;
	colorectal = data.Colorectal.elements;
	esophagus = data.Esophagus.elements;
	kidney = data.Kidney.elements;
	larynx = data.Larynx.elements;
	leukemia = data.Leukemia.elements;
	liver = data.Liver.elements;
	lung = data.Lung_and_bronchus.elements;
	melanoma = data.Melanoma.elements;
	mesothelioma = data.Mesothelioma.elements;
	nhl = data.Non_Hodgkin_lymphoma.elements;
	thyroid = data.Thyroid.elements;
	pancreas = data.Pancreas.elements;
	oral = data.Oral_cavity_and_pharynx.elements;
}

function changeColor(x, colormapping) {
	var count = 0;
	g.transition()
		.selectAll("path")
		.attr("fill", function() {
			switch(colormapping) {
				case "a":
					count++;
					
					var c = x[count].numberofnewcancers;
					if (c > 10) {
						return "green";
					} else {
						return "red";
					}
					
					
					break;
				case "b":
					count++;
					var c = x[count].numberofnewcancers;
					return "red";
					break;
				case "c":
					count++;
					var c = x[count].numberofnewcancers;
					return "orange";
					break;
				default:
					return "pink";
			}
		})
}

function cancer1() {
	changeColor(lung, "a");
}

function cancer2() {
	changeColor(pancreas, "b");
}

function cancer3() {
	changeColor(oral, "c");
}

function initMap(x, colormapping) {
	d3.json("mn-county-2010.json", function(json) {
		g.selectAll("path")
		    .data(json.features)
		    .enter()
		    .append("path")
		    .attr("d", path)
		    .attr("stroke","white")
		    .attr("stroke-width","2")
		    .on("click", click);
		    
		    changeColor(x, "g");
	});
}


function colorMap(x, colormapping) {

	if (colormapping == "a") {
		return "red";
	} else if (colormapping == "b") {
		return "blue";
	} else if (colormapping == "c") {
		return "purple";
	}
}

function click(d) {
	console.log(d);
}

/**********************************
	d3
**********************************/

var width = 600, 
    height = 700, 
    centered;

var projection = d3.geo.mercator()
	.scale(4000)
	.translate([6825, 4000]);

var path = d3.geo.path()
	.projection(projection);

var svg = d3.select("#map").append("svg")
	.attr("width", width)
	.attr("height", height);

svg.append("rect")
	.attr("class", "background")
	.attr("width", width)
	.attr("height", height)
	.attr("fill", "none");

var g = svg.append("g")
	.attr("id", "states");
	
	
/*
	ISSUES:
	- Data is loaded last so technically there's no data to show when
	the page first loads. Figure this shit out. 
*/
