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

    setAttr = function(elmnts, attr, value) {
        for (var j=0;j<elmnts.length;j++) {
            elmnts[j].setAttribute(attr,value);        
            elmnts[j].removeAttribute('data-punch-attr');
        }
    };   
    setVal = function(elmnts, value) {
        for (var j=0;j<elmnts.length;j++) {
            elmnts[j].innerHTML = value;
            elmnts[j].removeAttribute('data-punch-val');
        }
    };

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
                        if(json_obj[i].hasOwnProperty(key)) {
                            if (Array.isArray(json_obj[i][key])) {
                                designator = key;
                                level++;
                                this.punch(json_obj[i][key], item);
                            }
                            else if (typeof json_obj[i][key] === "object") {
                                designator = key;
                                level++;
                                this.punch(json_obj[i][key], item);
                            }
                            else {
                                property = (designator.length > 0 ? "_" : "") + key;

                                console.log("designator_property: " + designator + property);

                                // value -> attribute 
                                if(item.querySelector('[data-punch-attr*=' + designator + property + ']')) {
                                    var attr = item.querySelector('[data-punch-attr*=' + designator + property + ']').getAttribute('data-punch-attr').split(';')[0];
                                    var value = json_obj[i][key];

                                    var elmnts = item.querySelectorAll('[data-punch-attr*=' + designator + property + ']');
                                    setAttr(elmnts, attr, value);

                                }

                                // value -> tag
                                if(item.querySelector('[data-punch-val=' + designator + property + ']')) {
                                    if(level > 0) {
                                        val += json_obj[i][key] + ",";
                                    }

                                    var elmnts = item.querySelectorAll('[data-punch-val=' + designator + property + ']');
                                    //This is insane!!!
                                    var value = (level > 0) ? json_obj[i][key] + "," : ((val==="") ? json_obj[i][key] : val.substring(0,val.length-1));
                                    setVal(elmnts,value);
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
                
                        // value -> attribute 
                        if(item.querySelector('[data-punch-attr*=' + designator + property + ']')) {
                            var attr = item.querySelector('[data-punch-attr*=' + designator + property + ']').getAttribute('data-punch-attr').split(';')[0];
                            var value = json_obj[key];

                            var elmnts = item.querySelectorAll('[data-punch-attr*=' + designator + property + ']');
                            setAttr(elmnts, attr, value);

                        }

                        // value -> tag
                        if(item.querySelector('[data-punch-val=' + designator + property + ']')) {

                            var elmnts = item.querySelectorAll('[data-punch-val=' + designator + property + ']');

                            setVal(elmnts,json_obj[key]);
                        }

                    }
                }
            }
            designator = "";
            level--;
            val = "";
            if (typeof top_item != "undefined") top_item.setAttribute('class', 'is-hidden');

        }
    }
})();