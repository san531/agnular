(function() {
    "use strict";

    angular.module("shared")
        .directive("courseTime", ["timeFilterFilter", "$filter", "$compile", courseTime]);
    
    function courseTime(timeFilter, $filter, $compile) {
        return {
            scope: {
                time: "=ngModel"
            },
            link: function(scope, element, attrs, controller) {
                var pattern = new RegExp("^\\d*$");
                var elem = '<span class="form-control-static control-label">{{formattedTime}}</span>';
                element.after($compile(elem)(scope));
                scope.$watch("time", function(newVal, oldVal){
                    if(pattern.test(newVal) || newVal===undefined){
                        scope.formattedTime = $filter("timeFilter")(newVal);
                    } else {
                        scope.time = oldVal;
                    }
                });
            }    
        }
    }
})();
