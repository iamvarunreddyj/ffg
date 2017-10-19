var phenotypeSelectionApp = angular.module("phenotypeSelectionModule", ['offspringDisplayModule']);

phenotypeSelectionApp.controller("phenotypeSelectionController",['$scope', 'phenotypeFactory', '$cacheFactory', '$state', '$timeout', '$element', 'offspringDisplayFactory', function($scope, phenotypeFactory, $cacheFactory, $state, $timeout, $element, offspringDisplayFactory) {
    $scope.phenotypeData = phenotypeFactory.getPhenotypesList();
    $scope.crossTypesAvailable = phenotypeFactory.crossTypesAvailable;
    $scope.errorMessages = phenotypeFactory.getErrorMessages();
    $scope.displayErrors = false;


    if (typeof(sessionStorage) !== "undefined") {
      if(sessionStorage.getItem('offsprings')) {
          $scope.parents = angular.fromJson(sessionStorage.getItem('parents'));
          $scope.crossTypes = angular.fromJson(sessionStorage.getItem('crossTypes'));
          $scope.offsprings = angular.fromJson(sessionStorage.getItem('offsprings'));
          $scope.offspringsShortened = angular.fromJson(sessionStorage.getItem('offspringsShortened'));
          $scope.analyzedData = angular.fromJson(sessionStorage.getItem('analyzedData'));
          $scope.shortenedParents = angular.fromJson(sessionStorage.getItem('shortenedParents'));
      } else {
        $scope.parents = [];
        $scope.crossTypes = [];
        $scope.offsprings = [];
        $scope.offspringsShortened = [];
        $scope.analyzedData = [];
        $scope.shortenedParents = [];
      }
    } else {
        console.log("Sorry! No Web Storage support..");
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
            $scope.parents.push(parentSelection);
            $scope.crossTypes.push($scope.crossType);
            var preProcessedSelection = phenotypeFactory.preProcessSelectedData(parentSelection);
            if (preProcessedSelection != undefined && preProcessedSelection.length > 0) {
                var notation = phenotypeFactory.concatArrayContents(preProcessedSelection);
                $scope.shortenedParents.push([notation,notation]);
                $scope.offspringResult = phenotypeFactory.predict([phenotypeFactory.prepareForPrediction(preProcessedSelection),phenotypeFactory.prepareForPrediction(preProcessedSelection)]);
                if ($scope.offspringResult) {
                    // Offspring results
                    $scope.offsprings.push($scope.offspringResult);
                    $scope.offspringsShortened.push(phenotypeFactory.shortenOutcome($scope.offspringResult));

                    // Data analysis for visualization
                    // Analyze data for current generation.
                    $scope.analyzedData.push(offspringDisplayFactory.analyzeData($scope.offspringResult, parentSelection));

                    // Store data in sessionStorage
                    phenotypeFactory.saveDataToSessionStorage($scope);
                    $state.go('home.offspringDisplay');
                }
            }
        } else {
            console.log("Please select required phenotypes.");
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
            "dominant" : {
                "phenotype" : dominantPhenotype,
                "genotype" : phenotypeFactory.getGenotypeForName(dominantPhenotype),
                "imageLocation" : phenotypeFactory.getImageLocationForName(dominantPhenotype),
            },
            "recessive" : {
                "phenotype" : recessivePhenotype,
                "genotype" : phenotypeFactory.getGenotypeForName(recessivePhenotype),
                "imageLocation" : phenotypeFactory.getImageLocationForName(recessivePhenotype),
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
