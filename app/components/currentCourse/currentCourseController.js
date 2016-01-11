(function(){
"use strict";
    angular.module("currentCourse")
        .controller("currentCourseController", currentCourseController);

    function currentCourseController($scope, $location, getDat, $routeParams, $filter, $uibModal) {
        $scope.authorList = [];
        $scope.course = {};
        $scope.course.authors = [];
        $scope.saveCourse = saveCourse;
        $scope.fAuthors = fAuthors;
        $scope.addAuthor = addAuthor;
        $scope.delAuthor = delAuthor;
        $scope.people=[];
        $scope.coursepeople=[];
       
        
        getDat.Authors().getAuthors().$promise.then(function(data){$scope.authorList = data})
        if($routeParams.courseId) {
            getDat.Courses().getCourse($routeParams)
                  .$promise
                      .then(function(data){
                          $scope.course = data;
                          $scope.$emit("showCurrentCourse", $scope.course.name);
                          $scope.$emit('showCourses');

                      })
        } else {$scope.$emit("showCurrentCourse", "new"); $scope.$emit('showCourses')};
        
        
         $scope.$watch('course.name', function(){
             if($scope.course.name) {
                $scope.$emit("showCurrentCourse", $scope.course.name);
             } else { $scope.$emit("showCurrentCourse", "new")}
             
         
         });


        function saveCourse() {
            
            if($scope.currentCourseForm.$valid){
                getDat.Courses().saveCourse($routeParams, $scope.course)
                    .$promise
                        .then(function(data){
                            $scope.course = data;
                            $location.path("/courses");
                        })
            } else {$scope.open()}
        };
        
        function fAuthors(author) {
            for (var i =0; i < $scope.course.authors.length; i++) {
                if (author === $scope.course.authors[i]) { return false }
            };
            return true;
        };
        
        function addAuthor() {
            for (var i =0; i < $scope.people.length; i++) {
                if(fAuthors($scope.people[i])){$scope.course.authors.push($scope.people[i])}
            }
        };
        
        function delAuthor() {
            for (var i =0; i < $scope.coursepeople.length; i++) {
               for (var j =0; j < $scope.course.authors.length; j++) {
                    if ($scope.coursepeople[i] === $scope.course.authors[j]){
                        $scope.course.authors.splice(j, 1);
                    }    
               }
            }
        };
        
        $scope.open = function () {
            var modalInstance = $uibModal.open({
              animation: true,
              templateUrl: 'myModalContent.html',
              controller: 'ModalInstanceCtrl',
            });

        };
        
    }

})();
