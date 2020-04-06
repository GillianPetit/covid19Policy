let table = d3.select("#incomeSupportsTable").append("table")


d3.csv("data/Income supports.csv" , function(d, i, columns) {
	return {
		prov: d.Government,
		What: d.Category,
		Who: d["Policy Target"],
		Policy: d["General Policy/policy name"]

	}
}).then(dataloaded)


function dataloaded(data){
	
	ABdata = data.filter(function(d) {
		return d.prov === "AB"
	})

	ABdata.sort( (a,b) => {
		return d3.ascending(a.What, b.What)
	})

	showData3(ABdata)
}


function showData3(data){
	console.log(data)

	//create header

	var headLabel = d3.keys(data[0])
		headLabel.splice(0, 1)
			console.log(headLabel)

	let header = table.append("thead").append("tr")

	header.selectAll("th")
		.data(headLabel)
		.enter()
		.append("th")
		.text(function(d) {
			return d
		})


	//create body
	
	let tableBody = table.append("tbody")

	let myArray = []

	data.forEach(function(d,i) {
		d.what = d.What;
		d.who = d.Who;
		d.policy = d.Policy;

		myArray.push([d.what, d.who, d.policy]);
	})

	//each array is one row
	let rows = tableBody.selectAll("tr")
		.data(myArray)
		.enter()
		.append("tr")

	let cells = rows.selectAll("td")
		.data(function(d) { console.log(d); return d })
		.enter()
		.append("td")
		.text(function(d) { return d })

	

}






