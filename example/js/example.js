window.onload = function() {
	var jsonStr = '{ "cars" : ['
		jsonStr += '{ "make" : "volvo", "model" : "v70", "year" : 2010, "link" : "123abc" },'
		jsonStr += '{ "make" : "volkswagen", "model" : "passat", "year" : 2011, "owners" : [{"name":"aa", "purchaseDate": "2011-01-01"},{"name":"bb", "purchaseDate": "2007-01-01"}] },'
		jsonStr += '{ "make" : "volvo", "model" : "s70", "year" : 2008, "link" : "abc123" },'
		jsonStr += '{ "make" : "saab", "model" : "9-3", "year" : 1999, "accident" : {"id" : "2012-12-01", "report" : "Lorem ipsum dolor sit amet."} },' 
        jsonStr += '{ "make" : "opel", "model" : "vectra", "year" : 1993, "link" : "abc123" } ] }'
    
    var json = JSON.parse(jsonStr);

    var directive = { "enum" : "cars",
        "dir" : [
        {field: 'span.make', value: 'make'},
        {field: 'span.model', value: 'model'},
        {field: 'span.year', value: 'year'},
        {field: 'span.owners', value: 'owners' , f: function(n) {
            if(typeof n !== 'undefined') {
                var owners_info = "";

                for(var i=0; i < n.length; i++) {
                    owners_info += n[i].name + ' (' + n[i].purchaseDate + ')<br/>' ;
                }
                return owners_info;
            }
       }}
    ]};

    $("#template").punch(json, directive);
    
}


