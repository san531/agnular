(function() {
    "use strict";
    

    angular.module("app")
        .config(configAppRouter)
        .run(whenHttp);

    function configAppRouter($routeProvider, $locationProvider) {
        
        var test = require('views');
        console.log(test['components\courses\courses.html']);
        
        $routeProvider
            .when("/", {
                template: test['components\login\login.html'],
                controller: "loginController"
            })
            .when("/courses", {
                template: test['components\courses\courses.html'],
                controller: "coursesController"
            })
            .when("/courses/new", {
                template: test['components\currentCourse\currentCourse.html'],
                controller: "currentCourseController"
            })
            .when("/courses/:courseId", {
                template: test['components\currentCourse\currentCourse.html'],
                controller: "currentCourseController"
            })
            .when("/app/components/currentCourse/directives/timeTemplate.html", {
                template: test['components\currentCourse\directives\timeTemplate.html']
//                controller: "currentCourseController"
            })
            .otherwise("/");
    }

    function whenHttp($httpBackend) {
        $httpBackend.whenGET(/login\//).passThrough();
        $httpBackend.whenGET(/courses\//).passThrough();
        $httpBackend.whenGET(/currentCourse\//).passThrough();
       
    }

})();
