flyGenetics.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('welcome', {
            url: '/',
            templateUrl: 'app/welcomePage/welcomePage.html',
            controller: 'welcomePageController'
        })
        .state('home', {
            url: '/home',
            templateUrl: 'app/homePage/homePage.html',
            controller: 'homePageController'
        })
        .state('home.intro', {
            url: '/introduction',
            templateUrl: 'app/introduction/introduction.html',
            controller: 'introPageController'
        })
        .state('home.phenotypeSelection', {
            url: '/phenotypeSelection',
            templateUrl: 'app/phenotypeSelection/phenotypeSelectionTemplate.html',
            controller: 'phenotypeSelectionController'
        })
        .state('home.offspringDisplay', {
            url: '/offspringDisplay',
            templateUrl: 'app/offspringDisplay/offspringDisplayTemplate.html',
            controller: 'offspringDisplayController'
        })


    $urlRouterProvider.when('', '/');

    $urlRouterProvider.otherwise('/');

}]);
