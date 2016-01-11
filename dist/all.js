(function(){
"use strict";
    angular.module("app", ["ngRoute", "ngResource", "ngMockE2E", "mayDelay", "shared", "ui.bootstrap", "ngAnimate", "components"]);
})();

(function() {
    "use strict";

    angular.module("shared", []);

})();

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

(function() {
    "use strict";

    angular.module("components", ["courses", "currentCourse", "login"]);

})();

(function() {
    "use strict";

    angular.module("shared")
        .directive("courseDate", ["timeFilterFilter", "$filter", "$compile", courseDate]);
    
    
    function courseDate(timeFilter, $filter, $compile) {
        return {
            require: "ngModel",
            scope: {},
            link: function(scope, element, attrs, controller) {
                var old = '';
                
                controller.$formatters.unshift(function(value){
                    if(value === undefined) {return ''};
                    old = $filter("date")(value, "dd.MM.yyyy");
                    return $filter("date")(value, "dd.MM.yyyy");
                    
                
                });
                
                controller.$parsers.push(function(value){
                    if(/^(0[1-9]?|[12][0-9]?|3[01]?)\.?(\.0[1-9]?|\.1[012]?)?\.?((\.0[1-9]?|\.1[012]?)(\.1([0-9]{1,3})?|\.2([0-9]{1,3})?))?$/.test(value))
                        {
                            old = value;
                            controller.$setViewValue(value);
                            controller.$commitViewValue();
                            controller.$render();
                        } else {
                            controller.$setViewValue(value == "" ? "" : old);
                            controller.$commitViewValue();
                            controller.$render();
                            
                        };
                 
                    return /^\d\d\.\d\d\.\d\d\d\d$/.test(old) ? Date.parse(old.match(/\d\d/g)[1]+"/"+ old.match(/\d\d/g)[0]+"/"+old.match(/\d\d/g)[2]+old.match(/\d\d/g)[3]) : undefined;      
                });
      
            }
        }
    }
})();
(function() {
    "use strict";

    angular.module("shared")
        .factory("model",  function (randomId) {
            var users = [
                    {login: "aaa", password: "aaa"},
                    {login: "bbb", password: "bbb"},
                    {login: "ccc", password: "ccc"}
                ],
                 authors = [
                     "Пушкин",
                     "Лермонтов",
                     "Толстой",
                     "Достоевсий",
                     "Маяковский",
                     "Фет"
                 ],
                 courses = [
                    {
                        name: "course1",
                        description: "1Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem possimus numquam obcaecati distinctio vitae. Quaerat quibusdam soluta debitis itaque aliquam ullam id, similique distinctio obcaecati doloremque nesciunt et quis, saepe vitae perspiciatis odio ut, veniam aspernatur eum iure explicabo vel facere consequatur. Omnis ipsa, commodi maiores in similique possimus, hic dolorum odit repellat officia repudiandae nobis, earum vel illum impedit iusto eligendi laudantium temporibus architecto quo labore dicta voluptas assumenda quae. Non minima alias sequi adipisci fugiat in maiores deleniti beatae cumque quam exercitationem saepe est voluptatum ex, et unde minus veritatis iusto qui modi aspernatur vero aliquid. Saepe, distinctio?1",
                        time: "10",
                        date: "222222222222",
                        authors: ["Маяковский"]

                    },
                    {

                        name: "course2",
                        description: "2Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem possimus numquam obcaecati distinctio vitae. Quaerat quibusdam soluta debitis itaque aliquam ullam id, similique distinctio obcaecati doloremque nesciunt et quis, saepe vitae perspiciatis odio ut, veniam aspernatur eum iure explicabo vel facere consequatur. Omnis ipsa, commodi maiores in similique possimus, hic dolorum odit repellat officia repudiandae nobis, earum vel illum impedit iusto eligendi laudantium temporibus architecto quo labore dicta voluptas assumenda quae. Non minima alias sequi adipisci fugiat in maiores deleniti beatae cumque quam exercitationem saepe est voluptatum ex, et unde minus veritatis iusto qui modi aspernatur vero aliquid. Saepe, distinctio?2",
                         time: "20",
                         date: "333333333333",
                         authors: ["Толстой", "Пушкин"]

                    },
                    {

                        name: "course3",
                        description: "3Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem possimus numquam obcaecati distinctio vitae. Quaerat quibusdam soluta debitis itaque aliquam ullam id, similique distinctio obcaecati doloremque nesciunt et quis, saepe vitae perspiciatis odio ut, veniam aspernatur eum iure explicabo vel facere consequatur. Omnis ipsa, commodi maiores in similique possimus, hic dolorum odit repellat officia repudiandae nobis, earum vel illum impedit iusto eligendi laudantium temporibus architecto quo labore dicta voluptas assumenda quae. Non minima alias sequi adipisci fugiat in maiores deleniti beatae cumque quam exercitationem saepe est voluptatum ex, et unde minus veritatis iusto qui modi aspernatur vero aliquid. Saepe, distinctio?3",
                         time: "394",
                         date: "555555555",
                         authors: ["Фет", "Толстой", "Лермонтов"]
                    }

                ];
        
            for(var i=0; i<courses.length; i++){
                courses[i].id = randomId.getId();
            };

            return {
                getUser: getUser,
                getCourses: getCourses,
                editCourse: editCourse,
                deleteCourse: deleteCourse,
                addCourse: addCourse,
                getAuthors: getAuthors
            };


        function getUser(login, password) {
            for(var i=0; i<users.length; i++){
                if(login == users[i].login && password == users[i].password) {
                    return {isUser: true}
                };
            }
            return {isUser: false};

        };

        function getCourses(id) {
            if(id !== undefined) {
                for(var i=0; i<courses.length; i++){
                    if(courses[i].id === id){return courses[i]}
                 }
            };
            return courses
        };

        function editCourse(id, newCourse) {
            if(id !== undefined) {
                for(var i=0; i<courses.length; i++){
                    if(courses[i].id === id){
                        courses[i] = angular.fromJson(newCourse);
                        return courses[i]
                    }
                 }
            };

        };

        function deleteCourse(id) {
            if(id !== undefined) {
                 for(var i=0; i<courses.length; i++){
                    if(courses[i].id === id){
                       courses.splice(i, 1);
                        i--;
                    }
                 }

            };
            return courses
        };

        function addCourse(data) {
            var course = angular.fromJson(data);
            course.id = randomId.getId();
            courses.push(course);
            return courses[courses.length-1]
        };
        
        function getAuthors() {
            return authors;
        };
        
    });
})();

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

(function() {
    "use strict";

    angular.module("courses", []);

})();

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

(function() {
    "use strict";

    angular.module("login", []);

})();

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

(function() {
    "use strict";

    angular.module("currentCourse", []);

})();

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

angular.module('shared').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {

  $scope.ok = function () {
    $uibModalInstance.close();
  }
  
});
angular.module('shared').controller('ModalInstanceCtrl1', function ($scope, $uibModalInstance) {


  $scope.ok = function () {
    $uibModalInstance.close(true);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss(false);
  };
});