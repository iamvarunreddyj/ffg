var phenotypeSelectionApp = angular.module("phenotypeSelectionModule", []);

phenotypeSelectionApp.controller("phenotypeSelectionController",['$scope', 'phenotypeFactory', '$cacheFactory', '$state', '$timeout', '$element', function($scope, phenotypeFactory, $cacheFactory, $state, $timeout, $element) {
    $scope.phenotypeData = phenotypeFactory.getPhenotypesList();
    $scope.crossTypesAvailable = phenotypeFactory.crossTypesAvailable;
    $scope.errorMessages = phenotypeFactory.getErrorMessages();
    $scope.displayErrors = false;
    
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

    $scope.monoCross = function () {
        return $scope.crossCheck($scope.crossType,0)
    };

    $scope.diCross = function () {
        return $scope.crossCheck($scope.crossType,1)
    };

    $scope.triCross = function () {
        return $scope.crossCheck($scope.crossType,2)
    };

    $scope.crossCheck = function(type, crossIndex) {
        if (type == $scope.crossTypesAvailable[crossIndex]) {
            return true;
        }
        return false;
    }

    $scope.generateOffspring = function() {
        if ($scope.validate()) {
            var parentSelection = $scope.fetchSelectedData();
            parentSelection = phenotypeFactory.assignPunnettSquareNotations(parentSelection);
            $scope.cache.put('f1.parents', parentSelection);
            $scope.cache.put('f1.crossType', $scope.crossType);
            var preProcessedSelection = phenotypeFactory.preProcessSelectedData(parentSelection);
            if (preProcessedSelection != undefined && preProcessedSelection.length > 0) {
                $scope.offspringResult = phenotypeFactory.predict(phenotypeFactory.prepareForPrediction(preProcessedSelection));
                if ($scope.offspringResult) {
                    $scope.cache.put('f1.results', $scope.offspringResult);
                    $state.go('home.offspringDisplay')
                }
            }
        } else {
            console.log("Please select required phenotypes.")
        }
    }
    
    // Phenotype data
    $scope.phenotypeOne = {}
    $scope.phenotypeTwo = {}
    $scope.phenotypeThree = {}
    
    $scope.fetchSelectedData = function () {
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
    };
    
    $scope.displayErrorsForSomeTime = function(timeInSeconds) {
        $scope.displayErrors = true;
        
        $timeout(function(){
            $scope.displayErrors = false;
        }, timeInSeconds*1000);
    };

}]);
