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

    $scope.generateOffspring = function() {
        var parentSelection = $scope.validateAndFetchSelectedData();
        parentSelection = phenotypeFactory.assignPunnettSquareNotations(parentSelection);
        $scope.cache.put('f1.parents', parentSelection);
        var preProcessedSelection = phenotypeFactory.preProcessSelectedData(parentSelection);
        if(preProcessedSelection != undefined && preProcessedSelection.length > 0) {
            $scope.offspringResult = phenotypeFactory.predict(phenotypeFactory.prepareForPrediction(preProcessedSelection));
            if($scope.offspringResult) {
                $scope.cache.put('f1.results', $scope.offspringResult);
                $state.go('home.offspringDisplay')
            }
        } else {
           console.log("Please select required phenotypes.")
        }
    }
    
    // Phenotype data
    $scope.phenotypeOne = {}
    $scope.phenotypeTwo = {}
    $scope.phenotypeThree = {}
    
    $scope.validateAndFetchSelectedData = function () {
        $scope.selectedData = [];
        if ($scope.phenotypeOne != undefined &&
            $scope.phenotypeOne.dominant != undefined &&
            $scope.phenotypeOne.recessive != undefined) {
            $scope.selectedData.push($scope.formatSelectedDataAndReturnFullSelectionDetails($scope.phenotypeOne.dominant, $scope.phenotypeOne.recessive));
        }
        if ($scope.phenotypeTwo != undefined &&
            $scope.phenotypeTwo.dominant != undefined &&
            $scope.phenotypeTwo.recessive != undefined) {
            $scope.selectedData.push($scope.formatSelectedDataAndReturnFullSelectionDetails($scope.phenotypeTwo.dominant, $scope.phenotypeTwo.recessive));
        }
        if ($scope.phenotypeThree != undefined &&
            $scope.phenotypeThree.dominant != undefined &&
            $scope.phenotypeThree.recessive != undefined) {
            $scope.selectedData.push($scope.formatSelectedDataAndReturnFullSelectionDetails($scope.phenotypeThree.dominant, $scope.phenotypeThree.recessive));
        }

        return $scope.selectedData;
    }
    
    $scope.formatSelectedDataAndReturnFullSelectionDetails = function(dominantPhenotype, recessivePhenotype) {
        return {
            dominant : {
                phenotype : dominantPhenotype,
                genotype : phenotypeFactory.getGenotypeForName(dominantPhenotype)
            },
            recessive : {
                phenotype : recessivePhenotype,
                genotype : phenotypeFactory.getGenotypeForName(recessivePhenotype)
            }
        }
    }

}]);
