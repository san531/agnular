(function(){
"use strict";
    angular.module("courses")
        .controller("coursesController", coursesController);

    function coursesController($scope, $location, $filter, getDat, $uibModal) {
       
        $scope.searchPattern = "";
        $scope.toRender = "";
        $scope.search = search;
        $scope.$emit('showCourses');
        $scope.$emit('hideCurrentCourse');
        $scope.courses = [];
        $scope.paramObj = {};
        $scope.deleteCourse = deleteCourse;
        getDat.Courses().getCourses()
            .$promise
                .then(function(data){
                    $scope.courses = data;
                    $scope.filtered = filtered;
                });

        function deleteCourse(id) {
            var modalInstance = $uibModal.open({
              animation: true,
              templateUrl: 'myModalContent1.html',
              controller: 'ModalInstanceCtrl1',
            });
            
            modalInstance.result.then( function(responce){
                $scope.paramObj.courseId = id;
                 getDat.Courses()
                 .deleteCourse($scope.paramObj)
                    .$promise
                        .then(function(data){
                            $scope.courses = data.result
                        })
            
            }
            
            )
            
             
        };

        function search() {
            $scope.toRender = $scope.searchPattern;
        };
  
        function filtered(course){
            return ~course.name.toLowerCase().indexOf($scope.toRender.toLowerCase()) || ~$filter("date")(course.date, "dd.MM.yyyy").indexOf($scope.toRender); 
        
        }

    };

})();
