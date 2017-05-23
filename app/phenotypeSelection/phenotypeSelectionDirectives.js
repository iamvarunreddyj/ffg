phenotypeSelectionApp.directive('selectionDirective', function () {
    return {
        restrict: 'A',
        replace: false,
        link: function ($scope, $element, $attrs) {

            $scope.validate = function () {
                
                if($scope.crossType == undefined || $scope.crossType == "") {
                    
                    $("p#crossType").html($scope.errorMessages.genericMessageOne + $scope.errorMessages.crossType);
                    $scope.displayErrorsForSomeTime(5);
                    return false;
                }

                if ($scope.triCross() || $scope.diCross() || $scope.monoCross()) {

                    if ($scope.selectedPhenotypeOne != undefined) {
                        if ($scope.phenotypeOne.dominant != undefined &&
                            $scope.phenotypeOne.recessive != undefined) {
                            // Do nothing
                        } else {
                            $("p#phenotypeOne").html($scope.errorMessages.genericMessageOne + $scope.errorMessages.phenotypeOne.parent);
                            $scope.displayErrorsForSomeTime(5);
                            return false;
                        }
                    } else {
                        $("p#phenotypeOne").html($scope.errorMessages.genericMessageOne + $scope.errorMessages.phenotypeOne.phenotype);
                        $scope.displayErrorsForSomeTime(5);
                        return false;
                    }
                }
                if ($scope.triCross() || $scope.diCross()) {
                    element = angular.element(document.getElementById("phenotypeTwo"));
                    if ($scope.selectedPhenotypeTwo != undefined) {
                        if ($scope.phenotypeTwo.dominant != undefined &&
                            $scope.phenotypeTwo.recessive != undefined) {
                            // Do nothing
                        } else {
                            $("p#phenotypeTwo").html($scope.errorMessages.genericMessageOne + $scope.errorMessages.phenotypeTwo.parent);
                            $scope.displayErrorsForSomeTime(5);
                            return false;
                        }
                    } else {
                        $("p#phenotypeTwo").html($scope.errorMessages.genericMessageOne + $scope.errorMessages.phenotypeTwo.phenotype);
                        $scope.displayErrorsForSomeTime(5);
                        return false;
                    }
                }
                if ($scope.triCross()) {
                    element = angular.element(document.getElementById("phenotypeThree"));
                    if ($scope.selectedPhenotypeThree != undefined) {
                        if ($scope.phenotypeThree.dominant != undefined &&
                            $scope.phenotypeThree.recessive != undefined) {
                            // Do nothing
                        } else {
                            $("p#phenotypeThree").html($scope.errorMessages.genericMessageOne + $scope.errorMessages.phenotypeThree.parent);
                            $scope.displayErrorsForSomeTime(5);
                            return false;
                        }
                    } else {
                        $("p#phenotypeThree").html($scope.errorMessages.genericMessageOne + $scope.errorMessages.phenotypeThree.phenotype);
                        $scope.displayErrorsForSomeTime(5);
                        return false;
                    }
                }
                
                return true;
            } // End validate()
        }
    }
});

phenotypeSelectionApp.directive('alertDangerDirective', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/phenotypeSelection/alertDangerTemplate.html',
        scope: {
            id: '@id'
        },
        link: function ($scope, $element, $attrs) {

        }
    }
});
