var offspringDisplay = angular.module('offspringDisplayModule', []);

offspringDisplay.controller('offspringDisplayController',['$scope', '$state', '$cacheFactory', function($scope, $state, $cacheFactory){
    $scope.cache = $cacheFactory.get('offspring');
    
    $scope.fOneOffspring = "";
    if($scope.cache) {
        $scope.fOneOffspring = $scope.cache.get('f1');
    } 
}]);