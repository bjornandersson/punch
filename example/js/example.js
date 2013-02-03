window.onload = function() {
	var jsonStr = '{ "cars" : ['
		jsonStr += '{ "make" : "volvo", "model" : "v70", "year" : 2010, "link" : "123abc" },'
		jsonStr += '{ "make" : "volkswagen", "model" : "passat", "year" : 2011, "owners" : [{"name":"aa", "purchaseDate": "2011-01-01"},{"name":"bb", "purchaseDate": "2007-01-01"}] },'
		jsonStr += '{ "make" : "volvo", "model" : "s70", "year" : 2008, "link" : "abc123" },'
		jsonStr += '{ "make" : "saab", "model" : "9-3", "year" : 1999, "accident" : {"id" : "2012-12-01", "report" : "Lorem ipsum dolor sit amet."} },' 
        jsonStr += '{ "make" : "opel", "model" : "vectra", "year" : 1993, "link" : "abc123" } ] }'

    var services = '{ "services" : ['
        services += '{ "id" : 0, "date" : "2001-01-01", "milage" : 1534, "comment" : "Oil change" },'
        services += '{ "id" : 1, "date" : "2002-02-02", "milage" : 2534, "comment" : "Oil change" },'
        services += '{ "id" : 2, "date" : "2003-03-03", "milage" : 3534, "comment" : "Oil change" },'
        services += '{ "id" : 3, "date" : "2004-04-04", "milage" : 4534, "comment" : "Oil change" } ] }'
    
    var json = JSON.parse(jsonStr);
    var services = JSON.parse(services);

    select("#template").punch(json);
    select('div[data-punch-index=id3] .services').punch(services);
}


