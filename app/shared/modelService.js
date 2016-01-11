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
