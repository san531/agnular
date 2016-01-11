(function() {
    "use strict";

    angular.module("shared")
        .factory("getDat", ["$resource", "$httpBackend", "model", "$routeParams", function ($resource, $httpBackend, model, $routeParams) {

            var User = function(){
                return $resource("../app/api/users/",
                        {
                            login: "@login",
                            password: "@password"
                        },
                        {
                            "getUser": { method: "GET" }
                        }
                )
            };

            var Courses = function(){
                return $resource("../app/api/courses/",
                    {
                        courseId: "@id"
                    },
                    {
                        "getCourses": {method:"GET", isArray:true},
                        "getCourse": {method: "GET"},
                        "saveCourse": {method: "POST"},
                        "deleteCourse": {method: "DELETE"}
                    }
                )
            };
            
            var Authors = function(){
                return $resource("../app/api/authors/",
                    {},
                    {
                        "getAuthors": {method:"GET", isArray:true}
                    }
                )
            };

            $httpBackend
                .whenGET(/\.\.\/app\/api\/users.+/)
                    .respond(function(method, url, data) {
                        var patternLogin = /login=.+&/;
                        var patternPassword = /password=.+/;

                        var login = url.match(patternLogin)[0].slice(6, -1);
                        var password = url.match(patternPassword)[0].slice(9);

                        var result = model.getUser(login, password);

                        return [200, result, {}]
                    });

            $httpBackend
                .whenGET(/\.\.\/app\/api\/courses.*/)
                    .respond(function(method, url, data) {
                        var patternId = /courseId=.+/;
                        var id = url.match(patternId);
                         //console.log(id[0].slice(9));
                        if(id){
                            var result = model.getCourses(id[0].slice(9));
                        }
                        else {
                            var result = model.getCourses();
                        }

                        return [200, result, {}]
                    });
            
            $httpBackend
                .whenGET(/\.\.\/app\/api\/authors/)
                    .respond(function(method, url, data) {
                        return [200, model.getAuthors(), {}]
                    }, 1000);

             $httpBackend
                .whenDELETE(/\.\.\/app\/api\/courses.*/)
                    .respond(function(method, url, data, headers) {
                        var patternId = /courseId=.+/;
                        var id = url.match(patternId);
                        var result = model.deleteCourse(id[0].slice(9));

                        return [200, {result}, {}]
                    });


            $httpBackend
                .whenPOST(/\.\.\/app\/api\/courses.*/)
                    .respond(function(method, url, data, headers){
                        var patternId = /courseId=.+/;
                        var id = url.match(patternId);

                        if(id !== null){
                            var result = model.editCourse(id[0].slice(9), data);
                        }
                        else {
                            var result = model.addCourse(data);
                        }

                        return [200, result, {}];
                });

            return {
                     User: User,
                     Courses: Courses,
                     Authors: Authors
                    
                    }
        }

    ]);



})();
