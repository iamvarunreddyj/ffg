var flyGenetics = angular.module('flyGenetics',
                                ['ngRoute',
                                'ui.router',
                                'welcomePageModule',
                                'homePageModule',
                                'introductionPageModule',
                                'phenotypeSelectionModule']);

flyGenetics.controller('mainController', ['$scope', '$state', function($scope, $state) {
    $state.go('welcome');
}])
