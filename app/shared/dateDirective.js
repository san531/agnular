(function() {
    "use strict";

    angular.module("shared")
        .directive("courseDate", ["timeFilterFilter", "$filter", "$compile", courseDate]);
    
    
    function courseDate(timeFilter, $filter, $compile) {
        return {
            require: "ngModel",
            scope: {},
            link: function(scope, element, attrs, controller) {
                var old = '';
                
                controller.$formatters.unshift(function(value){
                    if(value === undefined) {return ''};
                    old = $filter("date")(value, "dd.MM.yyyy");
                    return $filter("date")(value, "dd.MM.yyyy");
                    
                
                });
                
                controller.$parsers.push(function(value){
                    if(/^(0[1-9]?|[12][0-9]?|3[01]?)\.?(\.0[1-9]?|\.1[012]?)?\.?((\.0[1-9]?|\.1[012]?)(\.1([0-9]{1,3})?|\.2([0-9]{1,3})?))?$/.test(value))
                        {
                            old = value;
                            controller.$setViewValue(value);
                            controller.$commitViewValue();
                            controller.$render();
                        } else {
                            controller.$setViewValue(value == "" ? "" : old);
                            controller.$commitViewValue();
                            controller.$render();
                            
                        };
                 
                    return /^\d\d\.\d\d\.\d\d\d\d$/.test(old) ? Date.parse(old.match(/\d\d/g)[1]+"/"+ old.match(/\d\d/g)[0]+"/"+old.match(/\d\d/g)[2]+old.match(/\d\d/g)[3]) : undefined;      
                });
      
            }
        }
    }
})();