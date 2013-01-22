/*
 *  punch.js - A simple templating engine
 *
 *  Copyright (c) 2013 Björn Andersson, http://github.org/bjornandersson/punch/
 *
 *  Published under BSD License
 *
 *  Dependency framworks: none.
 *  Usage: see example. 
 *
 */

 (function() {
    var designator = "", 
        property = "",
        val = "",
        attr = "",
        level = 0,
        firstrun = true;

    if(typeof(Object.prototype.punch) === "undefined") {
        Object.prototype.punch = function() {
            if(firstrun) {
                var top_item = this.querySelector('[data-punch=item]');
                var item = top_item;
                var clone = "";
                var json_obj = arguments[0][item.getAttribute('data-punch-val')];
                firstrun = false;
            }
            else {
                var json_obj = arguments[0];

                if(arguments[1]) {
                    item = arguments[1];
                }
            }

            if(Array.isArray(json_obj)) {
                for (var i = 0; i < json_obj.length; i++) {

                    if (level === 0) {
                        clone = top_item.cloneNode(true);
                        this.appendChild(clone);
                        item = clone;
                    }
                    for (var key in json_obj[i]) {
                        //console.log(json_obj[i] + key);
                        if(json_obj[i].hasOwnProperty(key)) {
                            //console.log(json_obj[i][key]);
                            if (Array.isArray(json_obj[i][key])) {
                                //console.log("ISARRAY");
                                designator = key;
                                level++;
                                this.punch(json_obj[i][key], item);
                            }
                            else if (typeof json_obj[i][key] === "object") {
                                //console.log("ISOBJECT");
                                designator = key;
                                level++;
                                this.punch(json_obj[i][key], item);
                            }
                            else {
                                //console.log("ISSTRING");
                                property = (designator.length > 0 ? "_" : "") + key;
                                console.log(level + ". " + designator + property + ": " + json_obj[i][key]);


                                // value -> attribute 
                                if(item.querySelector('[data-punch-attr*=' + designator + property + ']')) {
                                    var attr = item.querySelector('[data-punch-attr*=' + designator + property + ']').getAttribute('data-punch-attr').split(';')[0];
                                    var value = json_obj[i][key];
                                    console.log(key + " " + value);
                                    item.querySelector('[data-punch-attr*=' + designator + property + ']').setAttribute(attr,value);
                                    item.querySelector('[data-punch-attr*=' + designator + property + ']').removeAttribute('data-punch-attr');
                                }

                                // value -> tag
                                if(item.querySelector('[data-punch-val=' + designator + property + ']')) {
                                    if(level > 0) {
                                        val += json_obj[i][key] + ",";
                                    }
                                    item.querySelector('[data-punch-val=' + designator + property + ']').innerHTML = (val==="") ? json_obj[i][key] : val.substring(0,val.length-1);
                                }
                                
                            }
                        }
                    }
                }
            }
            else if (typeof json_obj === "object") {
                for (var key in json_obj) {
                    if(json_obj.hasOwnProperty(key)) {
                        property = (designator.length > 0 ? "_" : "") + key;
                        console.log(level + ". " + designator + property + ": " + json_obj[key]);
                
                        if(item.querySelector('[data-punch-val=' + designator + property + ']')) {
                            item.querySelector('[data-punch-val=' + designator + property + ']').innerHTML = json_obj[key];
                        }

                    }
                }
            }
            designator = "";
            level--;
            val = "";

        }
    }
})();