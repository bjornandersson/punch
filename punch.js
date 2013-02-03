/**
*
* 	Bla bla bla
*
**/

//ExtensionManager
var EXT = {

    punch: function() {
        var node = this.node;
        this.config = node.defaults;

        if(this.config.firstrun) {
            var top_item = node.querySelector('[data-punch=item]');
            var item = top_item;
            var clone = "";
            var json_obj = arguments[0][item.getAttribute('data-punch-val')];
            this.config.firstrun = false;
        }
        else {
            var json_obj = arguments[0];

            if(arguments[1]) {
                item = arguments[1];
            }
        }

        if(Array.isArray(json_obj)) {
            for (var i = 0; i < json_obj.length; i++) {

                if (this.config.level === 0) {
                    clone = top_item.cloneNode(true);
                    clone.setAttribute("data-punch-index", "id" +i);
                    node.appendChild(clone);
                    item = clone;
                }
                for (var key in json_obj[i]) {
                    if(json_obj[i].hasOwnProperty(key)) {
                        if (Array.isArray(json_obj[i][key])) {
                            this.config.designator = key;
                            this.config.level++;
                            this.punch(json_obj[i][key], item);
                        }
                        else if (typeof json_obj[i][key] === "object") {
                            this.config.designator = key;
                            this.config.level++;
                            this.punch(json_obj[i][key], item);
                        }
                        else {
                            this.config.property = (this.config.designator.length > 0 ? "_" : "") + key;

                            console.log("designator_property: " + this.config.designator + this.config.property);

                            // value -> attribute 
                            if(item.querySelector('[data-punch-attr*=' + this.config.designator + this.config.property + ']')) {
                                var attr = item.querySelector('[data-punch-attr*=' + this.config.designator + this.config.property + ']').getAttribute('data-punch-attr').split(';')[0];
                                var value = json_obj[i][key];

                                var elmnts = item.querySelectorAll('[data-punch-attr*=' + this.config.designator + this.config.property + ']');
                                this.setAttr(elmnts, attr, value);

                            }

                            // value -> tag
                            if(item.querySelector('[data-punch-val=' + this.config.designator + this.config.property + ']')) {
                                if(this.config.level > 0) {
                                    this.config.val += json_obj[i][key] + ",";
                                }

                                var elmnts = item.querySelectorAll('[data-punch-val=' + this.config.designator + this.config.property + ']');
                                //This is insane, rewrite!!!
                                var value = (this.config.level > 0) ? this.config.val : ((this.config.val==="") ? json_obj[i][key] : this.config.val.substring(0,this.config.val.length-1));
                                this.setVal(elmnts,value);
                            }
                            
                        }
                    }
                }
            }
        }
        else if (typeof json_obj === "object") {
            for (var key in json_obj) {
                if(json_obj.hasOwnProperty(key)) {
                    this.config.property = (this.config.designator.length > 0 ? "_" : "") + key;
            
                    // value -> attribute 
                    if(item.querySelector('[data-punch-attr*=' + this.config.designator + this.config.property + ']')) {
                        var attr = item.querySelector('[data-punch-attr*=' + this.config.designator + this.config.property + ']').getAttribute('data-punch-attr').split(';')[0];
                        var value = json_obj[key];

                        var elmnts = item.querySelectorAll('[data-punch-attr*=' + this.config.designator + this.config.property + ']');
                        this.setAttr(elmnts, attr, value);

                    }

                    // value -> tag
                    if(item.querySelector('[data-punch-val=' + this.config.designator + this.config.property + ']')) {

                        var elmnts = item.querySelectorAll('[data-punch-val=' + this.config.designator + this.config.property + ']');

                        this.setVal(elmnts,json_obj[key]);
                    }

                }
            }
        }
        this.config.designator = "";
        this.config.level--;
        this.config.val = "";
        if (typeof top_item != "undefined") top_item.setAttribute('class', 'is-hidden');


    },
    setAttr: function(elmnts, attr, value) {
        for (var j=0;j<elmnts.length;j++) {
            elmnts[j].setAttribute(attr,value);        
            elmnts[j].removeAttribute('data-punch-attr');
        }
    },   
    setVal: function(elmnts, value) {
        for (var j=0;j<elmnts.length;j++) {
            elmnts[j].innerHTML = value;
        }
    }

}, select, _wrap;

//Wrapper function
_wrap = function(selector) {
    this.node = document.querySelector(selector);
    this.node.defaults = {
        designator : "", 
        property : "",
        val : "",
        level : 0,
        firstrun : true
    }  
};
_wrap.prototype = EXT;

//Select function
select = function(selector) {
    return new _wrap(selector);
};


