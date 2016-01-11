(function() {
    "use strict";

    angular.module("shared")
        .factory("randomId",  function() {
            function getId(){
                return  Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                };

            return {getId: getId}
        }

    );
})();
