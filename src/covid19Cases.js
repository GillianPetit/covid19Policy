let body = d3.select("#body")

//Set dimensions and margins of graph
	let margin = {top: 20, right: 20, bottom: 30, left: 50}
	let bodyHeight = 500 - margin.top - margin.bottom
	let bodyWidth = 960 - margin.left - margin.right
	let textHeight = bodyHeight + 50



d3.csv("data/cases.csv").then(showData)

function showData(data) {


	data = data.map(d => ({
		days: +d.Days,
		ABcumulativeCases: +d.ABCumulativeCases,
		BCcumulativeCases: +d.BCCumulativeCases,
		ABnewCases: +d.ABNewCases,
		BCnewCases: +d.BCNewCases, 
		values: data.map(function(d){
			return {
				days: +d.Days,
				ABcumulativeCases: +d.ABCumulativeCases,
			}
		})
	}))
	console.log(data)



	let maxValue = d3.max(data, d => Math.max(d.BCcumulativeCases, d.ABcumulativeCases ))
	
//set ranges
	let yscale = d3.scaleLinear()
		.range([bodyHeight, 0])
		.domain([0, maxValue])

	let xscale = d3.scaleLinear()
		.domain(d3.extent(data, d => d.days))
		.range([0, bodyWidth])



	//Define AB line
	let ABvalueLine = d3.line()
		.x(d => xscale(d.days))
		.y(d => yscale(d.ABcumulativeCases))
		.defined(d => !! d.ABcumulativeCases)

	
	//Define BC line
	let BCvalueLine = d3.line()
		.x(d => xscale(d.days))
		.y(d => yscale(d.BCcumulativeCases))
		.defined(d => !! d.BCcumulativeCases)


	//Add the AB path
	body.append("path")
		.datum(data)
		.attr("transform" , "translate(50, 0)")
		.attr("d" , ABvalueLine)
		.attr("class" , "ABline")
	
	//Add the BC path
	body.append("path")
		.datum(data)
		.attr("transform" , "translate(50, 0)")
		.attr("d" , BCvalueLine)
		.attr("class" , "BCline")
	
	//Add the y axis
	body.append("g")
		.attr("transform" , "translate(50, 0)")
		.call(d3.axisLeft(yscale))

	//Add the x axis
	body.append("g")
		.attr("transform" , "translate(50, " + bodyHeight + ")" )
		.call(d3.axisBottom(xscale))
	
	//Add x axis label
	body.append("g")
		.append("text")
		.style("text-anchor" , "middle")
		.attr("transform" , "translate(200, " + textHeight  + ")" )
		.text("Days Since First Confirmed Case")



//create mouseover functions
	function infoBox(obj, d) {
		var coord = d3.mouse(obj);
		var infobox = d3.select(".infobox");

 		// now we just position the infobox roughly where our mouse is
 		infobox.style("left", (coord[0] + 100) + "px" );
 		infobox.style("top", (coord[1] - 175) + "px");
		 $(".infobox").html(d);
		 $(".infobox").show();
		 }
 
	function hideData() {
		 $(".infobox").hide();
	 }

	body.append("g").selectAll("dot")
		.data(data)
		.enter()
		.append("circle")
		.attr("fill" , "steelblue")
		.attr("r", function(d) { if (d.ABcumulativeCases === 0) {
			return 0} 
			else { return 5}} )
		.attr("cx" , d => xscale(d.days))
		.attr("cy" , d => yscale(d.ABcumulativeCases) )
		.attr("transform" , "translate(50, 0)")
		.on("mouseover", function(d) { infoBox(this, d.ABcumulativeCases)})
		.on("mouseout" , function(d) { hideData()})


	body.append("g").selectAll("dot")
		.data(data)
		.enter()
		.append("circle")
		.attr("fill" , "red")
		.attr("r", function(d) { if (d.BCcumulativeCases === 0) {
			return 0} 
			else { return 5}} )
		.attr("cx" , d => xscale(d.days))
		.attr("cy" , d => yscale(d.BCcumulativeCases) )
		.attr("transform" , "translate(50, 0)")
		.on("mouseover", function(d) { infoBox(this, d.ABcumulativeCases)})
		.on("mouseout" , function(d) { hideData()})



	body.append("<div class='infobox' style='display:none;'>Test</div>");
 


}
