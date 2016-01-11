(function(){
"use strict";
    angular.module("app")
        .controller("appController", appController);

    function appController($scope, $location) {
        //$scope.$on("$routeChangeStart", function(evt){ alert($location.path()) })
        $scope.login = "";
        $scope.coursesHidden = true;
        $scope.currentCouseHidden = true;
        $scope.currentCouse = "";
        $scope.$on("user:logged_in", function(evt, args){$scope.login = args});
        $scope.$on("$routeChangeStart", function(event, next, current){
            if(!$scope.login){ $location.path( "/" )}
        });
        $scope.$on("user:logged_off", function(evt, args){$scope.login = ""});
        $scope.$on("hideCourses", function(evt, args){$scope.coursesHidden = true});
        $scope.$on("hideCurrentCourse", function(evt, args){$scope.currentCouseHidden = true;});
        $scope.$on("showCourses", function(evt, args){$scope.coursesHidden = false;});
        $scope.$on("showCurrentCourse", function(evt, args){$scope.currentCouseHidden = false; $scope.currentCouse = args});
        $scope.$on("showNameChanged", function(evt, args){$scope.currentCouse = args});
    };

})();
