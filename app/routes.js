flyGenetics.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '../html/introduction.html',
            controller: 'introPageController'
        })
        .when('/home', {
            templateUrl: '../html/homePage.html',
            controller: 'homePageController'
        })
}]);