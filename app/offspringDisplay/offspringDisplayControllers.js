var offspringDisplay = angular.module('offspringDisplayModule', []);

offspringDisplay.controller('offspringDisplayController',['$scope', '$state', '$cacheFactory', function($scope, $state, $cacheFactory){
    $scope.cache = $cacheFactory.get('offspring');
    
    $scope.fOneOffspring = "";
    if($scope.cache) {
        $scope.fOneOffspring = $scope.cache.get('f1.results');
        $scope.fOneParents = $scope.cache.get('f1.parents');
        $scope.fOneCrossType = $scope.cache.get('f1.crossType');
    }
}]);
