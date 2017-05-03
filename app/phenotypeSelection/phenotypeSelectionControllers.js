var phenotypeSelectionApp = angular.module("phenotypeSelectionModule", []);

phenotypeSelectionApp.controller("phenotypeSelectionController",['$scope', 'phenotypeFactory', '$cacheFactory', '$state', function($scope, phenotypeFactory, $cacheFactory, $state) {
    $scope.phenotypeData = phenotypeFactory.getPhenotypesList();
    $scope.crossTypesAvailable = phenotypeFactory.crossTypesAvailable;
    
    if($cacheFactory.get('offspring')) {
        $scope.cache = $cacheFactory.get('offspring');
    } else {
        $scope.cache = $cacheFactory('offspring');
    }
    
    $scope.$watch('selectedPhenotypeOne', function() {
        $scope.dataForPhenotypeOne = phenotypeFactory.getMasterDataForSelectedPhenotype($scope.selectedPhenotypeOne);
    });

    $scope.$watch('selectedPhenotypeTwo', function() {
        $scope.dataForPhenotypeTwo = phenotypeFactory.getMasterDataForSelectedPhenotype($scope.selectedPhenotypeTwo);
    });

     $scope.$watch('selectedPhenotypeThree', function() {
        $scope.dataForPhenotypeThree = phenotypeFactory.getMasterDataForSelectedPhenotype($scope.selectedPhenotypeThree);
    });

    $scope.monoHybridCross = function () {
        return $scope.crossCheck($scope.crossType,0)
    };

    $scope.diHybridCross = function () {
        return $scope.crossCheck($scope.crossType,1)
    };

    $scope.triHybridCross = function () {
        return $scope.crossCheck($scope.crossType,2)
    };

    $scope.crossCheck = function(type, crossIndex) {
        if (type == $scope.crossTypesAvailable[crossIndex]) {
            return true;
        }
        return false;
    }

    $scope.selectionData = {};

    $scope.generateOffspring = function() {
        var parentSelection = $scope.validateAndFetch()
        if(parentSelection != undefined && parentSelection.length > 0) {
            var preProcessSelection = phenotypeFactory.prepareForPrediction(parentSelection);
            $scope.offspringResult = phenotypeFactory.predict(phenotypeFactory.prepareForPrediction(parentSelection));
            if($scope.offspringResult) {
                $scope.cache.put('f1', $scope.offspringResult);
                $state.go('home.offspringDisplay')
            }
        } else {
           console.log("Please select required phenotypes.")
        }
    }

    $scope.validateAndFetch = function () {
        var parents = []
        var traitOne = $scope.getPhenotypeOneSelection()
        if (traitOne != undefined) {
            parents.push(traitOne);
        }

        var traitTwo = $scope.getPhenotypeTwoSelection()
        if (traitTwo != undefined) {
            parents.push(traitTwo);
        }

        var traitThree = $scope.getPhenotypeThreeSelection()
        if (traitThree != undefined) {
            parents.push(traitThree);
        }

        return parents;
    }

    $scope.getPhenotypeOneSelection = function () {
        if ($scope.selectionData!= undefined &&
            $scope.selectionData.phenotypeOne != undefined &&
            $scope.selectionData.phenotypeOne.dominant != undefined &&
            $scope.selectionData.phenotypeOne.recessive != undefined) {
            return [phenotypeFactory.getGenotypeForName($scope.selectionData.phenotypeOne.dominant), phenotypeFactory.getGenotypeForName($scope.selectionData.phenotypeOne.recessive)];
        }
    }

    $scope.getPhenotypeTwoSelection = function () {
        if ($scope.selectionData!= undefined &&
            $scope.selectionData.phenotypeTwo != undefined &&
            $scope.selectionData.phenotypeTwo.dominant != undefined &&
            $scope.selectionData.phenotypeTwo.recessive != undefined) {
            return [phenotypeFactory.getGenotypeForName($scope.selectionData.phenotypeTwo.dominant), phenotypeFactory.getGenotypeForName($scope.selectionData.phenotypeTwo.recessive)];
        }
    }

    $scope.getPhenotypeThreeSelection = function () {
        if ($scope.selectionData!= undefined &&
            $scope.selectionData.phenotypeThree != undefined &&
            $scope.selectionData.phenotypeThree.dominant != undefined &&
            $scope.selectionData.phenotypeThree.recessive != undefined) {
            return [phenotypeFactory.getGenotypeForName($scope.selectionData.phenotypeThree.dominant), phenotypeFactory.getGenotypeForName($scope.selectionData.phenotypeThree.recessive)];
        }
    }

}]);
