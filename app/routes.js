flyGenetics.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'app/homePage/homePage.html',
            controller: 'homePageController'
        })
        .state('home.welcome', {
            url: '/welcome',
            
            controller: 'welcomePageController',
            views : {
                '' : {templateUrl: 'app/welcomePage/welcomePage.html'},
                'introduction@home.welcome' : {
                    templateUrl: 'app/introduction/introduction.html'
                }
            }
        })
        .state('home.introduction', {
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


    $urlRouterProvider.when('', '/home/welcome');

    $urlRouterProvider.otherwise('/home/welcome');

}]);
