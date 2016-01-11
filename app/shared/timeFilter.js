(function() {
    "use strict";

    angular.module("shared")
        .filter("timeFilter", timeFilter);
    
    function timeFilter() {
        function declOfNum(number, titles)  
            {  
                var cases = [2, 0, 1, 1, 1, 2];  
                return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
            };
        
        return function(value) {
            if(angular.isString(value)) {
                
                var hours = Math.floor(value/60);
                
                if(hours) {
                    var hoursTitle=declOfNum(hours,['час','часа','часов']);
                    var minutes = value % 60;
                    
                    if(minutes){
                        var minutesTitle=declOfNum(minutes,['минута','минуты','минут']);
                        
                    } else {
                        minutesTitle="";
                        minutes="";
                    }
                    
                } else {
                    hoursTitle="";
                    hours="";
                    minutes = value;
                    minutesTitle=declOfNum(minutes,['минута','минуты','минут']);
                };
                
                return hours+hoursTitle+minutes+minutesTitle;
       
                
            } else {
                return value;
            }
        
        
        }
    };
    

})();
