var welcomeModule = angular.module('welcomePageModule', []);

welcomeModule.controller('welcomePageController',['$scope', '$element', '$state', function($scope, $element, $state){
    $('#welcome-modal').modal('show');

    $('#welcome-modal').on('hidden.bs.modal', function (e) {
        $state.go('home');
    })
}]);