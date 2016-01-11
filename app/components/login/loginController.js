(function(){
"use strict";
    angular.module("login")
        .controller("loginController",  loginController);

    function loginController($scope, $location, getDat) {
        $scope.submitError = false;
        $scope.logged = false;
        $scope.login = "";
        $scope.password = "";
        $scope.$emit('user:logged_off');
        $scope.$emit('hideCourses');
        $scope.$emit('hideCurrentCourse');

        $scope.action = function(){
            getDat.User().getUser({login: $scope.login, password: $scope.password})
                  .$promise
                  .then(function(ok){
                            $scope.logged = ok.isUser;
                            if(ok.isUser) {
                                $location.path("/courses");
                                $scope.$emit('user:logged_in', $scope.login)
                            }
                            else { $scope.password = "";
                                   $scope.submitError = true;

                                 };

                        })
        }

    };

})();
