


d3.csv("data/Job Protection.csv").then(showData2)

function showData2(data) {



	console.log(data)

	let table = d3.select("#jobProtectionTable").append("table")

		
	let header = table.append("thead").append("tr")

	header.selectAll("th")
		.data(["Province", "Existing or Amendment?", "Type of Leave", "Maximum Length of Leave", "Paid or unpaid?", "Medical Certificate Required?", "Specific Reason for Leave", "Duration of time employee must be employed with same employer", "Does it cover parents caring for sick children?", "Does it cover parents leaving work due to child care duties?", "Source"])
		.enter()
		.append("th")
		.text( function(d) { return d })


	let tableBody = table.append("tbody")		
	let myArray = []

	data.forEach(function(d, i){
		d.prov = d.Province;
		d.exist = d.Existing;
		d.type = d.Type;
		d.length = d.Length;
		d.paid = d.Paid;
		d.med = d.Medical;
		d.reason = d.Reason;
		d.duration = d.Duration;
		d.sickChild = d.sickChild;
		d.childCare = d.childCare;
		d.source = d.Source;

		myArray.push([d.prov, d.exist, d.type, d.length, d.paid, d.med, d.reason, d.duration, d.sickChild, d.childCare, d.source]);

	})

	let colorScale = d3.scaleOrdinal()
		.domain(["BC" , "AB", "ON", "SASK", "QUE" , "NB" , "PEI" , "NS" , "MAN"])
		.range(["red" , "steelblue" , "purple" , "olivedrab", "chocolate", "darkkhaki" , "teal", "orange" , "darkblue"])

	let rows = tableBody.selectAll("tr")
		.data(myArray)
		.enter()
		.append("tr")
		.style("background-color" , function(d) {return colorScale(d[0])} )

		

	let cells = rows.selectAll("td")
		.data(function(d) { console.log(d); return d } )
		.enter()
		.append("td")
		.text(function(d) { return d })









}	
