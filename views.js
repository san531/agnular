'format cjs';
module.exports = Object.create(null);
module.exports['components\courses\courses.html'] = '<section class="row search"><form class="form-inline col-sm-8" ng-submit=search()><div class=form-group><input type=text class="form-control form-control--medium" id=exampleInputEmail2 ng-model=searchPattern> <button type=submit class="btn btn-default">Найти</button></div></form><div class=col-sm-4><a class="btn btn-default pull-right" href=#/courses/new>Добавить курс</a></div></section><section class="section row" ng-repeat="course in courses | filter: filtered"><main class=col-sm-10><div class=section__main-info><div class=line><h2 class=section__header>{{course.name}}</h2><span class=section__time><span>{{course.time | timeFilter}}</span></span></div><div class=line><span class="section__date bottom-align-text-right">{{course.date | date:\'dd.MM.yyyy\'}}</span></div></div><p style="text-align: justify">{{course.description}}</p><span style="text-align: justify" ng-repeat="author in course.authors">{{author}}</span></main><nav class="nave col-sm-2"><button class="btn btn-primary btn-block" ng-click=deleteCourse(course.id)>Delete</button> <a class="btn btn-primary btn-block" ng-href=#/courses/{{course.id}}>Edit</a></nav></section>';
module.exports['components\currentCourse\currentCourse.html'] = '<form class=form-horizontal name=currentCourseForm ng-submit=saveCourse() novalidate><div class=form-group><label for=name class="col-sm-3 control-label">Название</label><div class=col-sm-4><input type=еуче class=form-control id=name ng-model=course.name required></div></div><div class=form-group><label for=description class="col-sm-3 control-label">Описание</label><div class=col-sm-9><textarea class=form-control id=description ng-model=course.description required></textarea></div></div><div class=form-group><label for=date class="col-sm-3 control-label">Дата</label><div class=col-sm-2><input type=text class=form-control id=date ng-model=course.date course-date required></div></div><div class=form-group><label for=time class="col-sm-3 control-label">Продолжительность</label><div class=col-sm-4><input type=text class="form-control form-control-static-float" id=name ng-model=course.time required course-time></div></div><div class=form-group><label for=time class="col-md-3 control-label">Имя автора</label><div class=col-md-4><select multiple class=form-control size=6 ng-model=people sv><option ng-repeat="author in authorList | filter: fAuthors">{{author}}</option></select></div><div class=col-md-1><button type=button class="btn btn-default btn-block" ng-click=addAuthor()>add</button> <button type=button class="btn btn-default btn-block" ng-click=delAuthor()>del</button></div><div class=col-md-4><select multiple class=form-control size=6 ng-model=coursepeople><option ng-repeat="author in course.authors">{{author}}</option></select></div></div><div class=form-group><div class="col-sm-offset-3 col-sm-2"><button type=submit class="btn btn-primary btn-block">Сохранить</button></div><div class=col-sm-2><a class="btn btn-primary btn-block" ng-href=#/courses>Отмена</a></div></div></form>';
module.exports['components\login\login.html'] = '<form name=loginForm class="form-horizontal form-login" ng-submit="loginForm.$valid && action()" novalidate><div class=form-group><div ng-show=submitError class="alert alert-warning">Вы ввели неправильный логин или пароль, попробуйте снова</div></div><div class=form-group><label for=login class="col-sm-2 control-label">Login</label><div class=col-sm-8><input name=loginField type=text class=form-control id=login placeholder=Login ng-pattern="/^[a-zA-z]+$/" ng-model=login required></div><div class=col-sm-2><p for=login class=form-control-static ng-show="loginForm.loginField.$touched && loginForm.loginField.$error.required && loginForm.loginField.$invalid">*введите</p></div></div><div class=form-group><label for=password class="col-sm-2 control-label">Password</label><div class=col-sm-8><input name=passwordField type=password class=form-control id=password placeholder=Password ng-model=password ng-pattern="/^[a-zA-z0-9]+$/" required></div><div class=col-sm-2><p for=login class=form-control-static ng-show="loginForm.passwordField.$touched && loginForm.passwordField.$error.required">*введите</p></div></div><div class=form-group><div class="col-sm-offset-2 col-sm-10"><button type=submit class=btn ng-class="[{\'btn-primary\': loginForm.$valid}, {disabled: loginForm.$invalid}]">Sign in</button></div></div></form>';
module.exports['components\currentCourse\directives\timeTemplate.html'] = '<p class=form-control-static>{{formattedTime}}</p>';
