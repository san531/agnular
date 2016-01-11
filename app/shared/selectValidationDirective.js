(function() {
    "use strict";

    angular.module("shared")
        .directive("sv", ["timeFilterFilter", "$filter", "$compile", sv]);
    
    
    function sv(timeFilter, $filter, $compile) {
        return {
            require: "ngModel",

            link: function(scope, element, attrs, controller) {
                scope.$watch(function(){return  scope.course.authors.length}, function(newVal, oldVal){
                        if(!newVal){
                          controller.$setValidity('require', false)
                        } else {
                        controller.$setValidity('require', true)
                        }
                    });
                }      
        }
    }

})();
