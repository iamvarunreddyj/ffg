var flyGenetics = angular.module('flyGenetics',['ngRoute'])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: '../html/homePage.html',
                controller: 'homePageController'
            })
    }]);