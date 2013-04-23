/**
 * 
 */
(function($) {
    "use strict";

    /*
     * Punch constructor
     */
    function Punch(element, json, directive) {
        this.$element = $(element);
        this.json = json;
        this.directive = directive;

        this.init();
    }

    /*
     * Punch prototype
     */
    Punch.prototype = {
        constructor : Punch,
        
        init : function() {

            this.process();
        },
        
        process : function (elmnt) {
            var self = this,
                item = '',
                dir = '',
                template = this.$element.children(0),
                clone = '';
            

            for(var i = 0; i < this.json[this.directive.enum].length; i++) {
                item = this.json[this.directive.enum][i];
                clone = template.clone();
                this.$element.append(clone);

                for(var j = 0; j < this.directive.dir.length; j++) {
                    dir = this.directive.dir[j];





                    if (dir.f) {
                        $(clone).find(dir.field).html(dir.f(item[dir.value])); 
                    }
                    else if (dir.attribute) {
                        $(clone).find(dir.field).attr(dir.attribute, item[dir.value]); 
                    }
                    else if (dir.field) {
                        $(clone).find(dir.field).text(item[dir.value]); 
                    }
                }
            }
            template.addClass("is-hidden");

        }
    };  

    /**
     * jQuery plugin definition, extends the jQuery object with our namespace
     * 'punch'
     */
    $.fn.punch = function(json, directive) {
        return this.each(function() {

            var $this = $(this),
                data = $this.data('punch');

            if(!data) {
                $this.data("punch", (data = new Punch($this, json, directive)));
            }
            else {
                data.init();
            }
        });
    };
    
    /**
     * Wire constructor on our jQuery namespace as well.
     */
    $.fn.punch.Constructor = Punch;
    
    /**
     * Automatically wire template functions for all price tag elements. 
     */
    $(function() {

        $(document).ready(function() {
            //$(".container").punch();
        });
    }());
    
})(window.jQuery);
