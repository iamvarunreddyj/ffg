flyGenetics.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
		.state('welcome', {
			url : '/',
			templateUrl : 'app/welcomePage/welcomePage.html',
			controller : 'welcomePageController'
		})
        .state('home', {
			url : '/home',
			templateUrl : 'app/homePage/homePage.html',
			controller : 'homePageController'
		})

}]);