var phenotypeSelectionApp = angular.module("phenotypeSelectionModule", []);

phenotypeSelectionApp.controller("phenotypeSelectionController",['$scope', 'phenotypeFactory', function($scope, phenotypeFactory) {
    console.log(phenotypeFactory.getPhenotypesList());
}]);
