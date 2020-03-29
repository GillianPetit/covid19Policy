let body = d3.select("#body")

//Set dimensions and margins of graph
	let margin = {top: 30, right: 40, bottom: 30, left: 50}
	let bodyHeight = 550 - margin.top - margin.bottom
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
		.domain([0, maxValue+20])

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
		.attr("transform" , "translate(100, 0)")
		.attr("d" , ABvalueLine)
		.attr("class" , "ABline")
	
	//Add the BC path
	body.append("path")
		.datum(data)
		.attr("transform" , "translate(100, 0)")
		.attr("d" , BCvalueLine)
		.attr("class" , "BCline")
	
	//Add the y axis
	body.append("g")
		.attr("transform" , "translate(100, 0)")
		.call(d3.axisLeft(yscale))

	//Add the x axis
	body.append("g")
		.attr("transform" , "translate(100, " + bodyHeight + ")" )
		.call(d3.axisBottom(xscale))
	
	//Add x axis label
	body.append("g")
		.append("text")
		.style("text-anchor" , "middle")
		.attr("transform" , "translate(500, " + textHeight  + ")" )
		.text("Days Since First Confirmed Case")


	//Add y axis label
	body.append("g")
		.append("text")
		.text("Cumulative Cases")
		.attr('transform', (d)=>{
       			 return 'translate( 50 , 300),'+ 'rotate(-90)';})		


	//Add dots for each data point for AB
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
		.attr("transform" , "translate(100, 0)")

	//Add dots for each data point for BC
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
		.attr("transform" , "translate(100, 0)")

	//Add label to BC line
	body.append("text")
		.attr("transform", "translate(" + (bodyWidth+60) + "," + yscale(data[data.length-1].BCcumulativeCases) + ")")
		.attr("dy", ".35em")
		.attr("text-anchor", "start")
		.style("fill", "red")
		.text("BC")

	//Add label to AB line
		body.append("text")
		.attr("transform", "translate(" + xscale(data[0].ABcumulativeCases + 27)   + "," + yscale(data[0].ABcumulativeCases + 420) + ")")
		.attr("text-anchor", "start")
		.style("fill", "steelblue")
		.text("AB")

}
