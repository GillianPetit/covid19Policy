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
		ONcumulativeCases: +d.ONCumulativeCases,
		SASKcumulativeCases: +d.SASKCumulativeCases,
		QUEcumulativeCases: +d.QUECumulativeCases,
		ABnewCases: +d.ABNewCases,
		BCnewCases: +d.BCNewCases, 
		ONnewCases: +d.ONNewCases, 
		values: data.map(function(d){
		})
	}))
	console.log(data)



	let maxValue = d3.max(data, d => Math.max(d.BCcumulativeCases, d.ABcumulativeCases, d.ONcumulativeCases,  d.SASKcumulativeCases,  d.QUEcumulativeCases,   ))
	
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

	//Define ON line	
	let ONvalueLine = d3.line()
		.x(d => xscale(d.days))
		.y(d => yscale(d.ONcumulativeCases))
		.defined(d => !! d.ONcumulativeCases)

		//Define SASK line	
	let SASKvalueLine = d3.line()
		.x(d => xscale(d.days))
		.y(d => yscale(d.SASKcumulativeCases))
		.defined(d => !! d.SASKcumulativeCases)


		//Define QUE line	
	let QUEvalueLine = d3.line()
		.x(d => xscale(d.days))
		.y(d => yscale(d.QUEcumulativeCases))
		.defined(d => !! d.QUEcumulativeCases)



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

	//Add the ON path
	body.append("path")
		.datum(data)
		.attr("transform" , "translate(100, 0)")
		.attr("d" , ONvalueLine)
		.attr("class" , "ONline")

		//Add the SASK path
	body.append("path")
		.datum(data)
		.attr("transform" , "translate(100, 0)")
		.attr("d" , SASKvalueLine)
		.attr("class" , "SASKline")


		//Add the QUE path
	body.append("path")
		.datum(data)
		.attr("transform" , "translate(100, 0)")
		.attr("d" , QUEvalueLine)
		.attr("class" , "QUEline")


	
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
		.text("Days Since First Confirmed Case in Province")


	//Add y axis label
	body.append("g")
		.append("text")
		.text("Cumulative Cases*")
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


		//Add dots for each data point for ON
	body.append("g").selectAll("dot")
		.data(data)
		.enter()
		.append("circle")
		.attr("fill" , "purple")
		.attr("r", function(d) { if (d.ONcumulativeCases === 0) {
			return 0} 
			else { return 5}} )
		.attr("cx" , d => xscale(d.days))
		.attr("cy" , d => yscale(d.ONcumulativeCases) )
		.attr("transform" , "translate(100, 0)")

			//Add dots for each data point for SASK
	body.append("g").selectAll("dot")
		.data(data)
		.enter()
		.append("circle")
		.attr("fill" , "olivedrab")
		.attr("r", function(d) { if (d.SASKcumulativeCases === 0) {
			return 0} 
			else { return 5}} )
		.attr("cx" , d => xscale(d.days))
		.attr("cy" , d => yscale(d.SASKcumulativeCases) )
		.attr("transform" , "translate(100, 0)")


			//Add dots for each data point for QUE
	body.append("g").selectAll("dot")
		.data(data)
		.enter()
		.append("circle")
		.attr("fill" , "chocolate")
		.attr("r", function(d) { if (d.QUEcumulativeCases === 0) {
			return 0} 
			else { return 5}} )
		.attr("cx" , d => xscale(d.days))
		.attr("cy" , d => yscale(d.QUEcumulativeCases) )
		.attr("transform" , "translate(100, 0)")




	//Add label to BC line
	
	let BCmax = d3.max(data, d => d.BCcumulativeCases)

	let BCmaxDays = d3.max(data, function(d) {if(d.BCcumulativeCases===BCmax){return d.days} } )

	console.log(BCmax, BCmaxDays)

	body.append("text")
		.attr("transform", "translate(" + xscale(BCmaxDays + 10)  + "," + yscale(BCmax) + ")")
		.attr("dy", ".35em")
		.attr("text-anchor", "end")
		.style("fill", "red")
		.text("BC")

	//Add label to AB line
	
		let ABmax = d3.max(data, d => d.ABcumulativeCases)

		let ABmaxDays = d3.max(data, function(d) {if(d.ABcumulativeCases===ABmax){return d.days} } )

	
		body.append("text")
		.attr("transform", "translate(" + xscale(ABmaxDays + 10)  + "," + yscale(ABmax) + ")")
		.attr("text-anchor", "end")
		.style("fill", "steelblue")
		.text("AB")


	//Add label to ON line
	
		let ONmax = d3.max(data, d => d.ONcumulativeCases)

		let ONmaxDays = d3.max(data, function(d) {if(d.ONcumulativeCases===ONmax){return d.days} } )

		body.append("text")
		.attr("transform", "translate(" + xscale(ONmaxDays + 10)  + "," + yscale(ONmax) + ")")
		.attr("text-anchor", "end")
		.style("fill", "purple")
		.text("ON")


	
	//Add label to SASK line
	
		let SASKmax = d3.max(data, d => d.SASKcumulativeCases)

		let SASKmaxDays = d3.max(data, function(d) {if(d.SASKcumulativeCases===SASKmax){return d.days} } )

		body.append("text")
		.attr("transform", "translate(" + xscale(SASKmaxDays + 10)  + "," + yscale(SASKmax) + ")")
		.attr("text-anchor", "end")
		.style("fill", "olivedrab")
		.text("SK")


	//Add label to QUE line
	
		let QUEmax = d3.max(data, d => d.QUEcumulativeCases)

		let QUEmaxDays = d3.max(data, function(d) {if(d.QUEcumulativeCases===QUEmax){return d.days} } )

		body.append("text")
		.attr("transform", "translate(" + xscale(QUEmaxDays + 10)  + "," + yscale(QUEmax - 100) + ")")
		.attr("text-anchor", "end")
		.style("fill", "chocolate")
		.text("QC")



		//Add footnote for QUE
	let text = body.append("g")
		.append("text")
		.style("text-anchor" , "left")
		.style("font-size", "small")
		.attr("y" , bodyHeight + 75)
		.attr("x" , 0)

	let text1 = text.append("tspan")
		.text("*The large jump in positive results for Quebec (QC) on day 24 corresponds to a directive that local PCR tests done by designated hospitals no longer need to be confirmed by the Public Health")
		
	text1.append("tspan")
		.attr("x" , 10)
    		.attr("dy", 17)
		.attr("transform" , "translate(0, " + (textHeight+30)  + ")" )
		.text("laboratory. Previously, tests confirmed only at designated hospitals were considered presumed rather than confirmed.")




}
