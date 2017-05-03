var introductionModule = angular.module('introductionPageModule', []);

// Introduction Page Controller
introductionModule.controller('introPageController', ['$scope', '$state', function($scope, $state){
    $('#myLargeModalLabel').modal('show');
    
    $('#myLargeModalLabel').on('hidden.bs.modal', function (e) {
        $state.go('home.phenotypeSelection');
    })
}]);