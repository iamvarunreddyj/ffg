var offspringDisplay = angular.module('offspringDisplayModule', ['phenotypeSelectionModule', 'dndLists']);

offspringDisplay.controller('offspringDisplayController',['$scope', '$state', '$cacheFactory', 'offspringDisplayFactory', 'phenotypeFactory', '$route', function($scope, $state, $cacheFactory, offspringDisplayFactory, phenotypeFactory, $route){

  // Retrieve data from sessionStorage
  $scope.offsprings = angular.fromJson(sessionStorage.getItem('offsprings'));   // Offspring outcome
  // Current generation number is one less than the size of the offsprings outcome array.
  $scope.currentGeneration = $scope.offsprings.length - 1;
  // Get shortened offsprings outcome
  $scope.offspringsShortened = angular.fromJson(sessionStorage.getItem('offspringsShortened'));
  // Get parent selections
  $scope.parents = angular.fromJson(sessionStorage.getItem('parents'));
  $scope.shortenedParents = angular.fromJson(sessionStorage.getItem('shortenedParents'));
  // Get crossTypes for parent selections
  $scope.crossTypes = angular.fromJson(sessionStorage.getItem('crossTypes'));
  // Get analyzedData from sessionStorage
  $scope.analyzedData = angular.fromJson(sessionStorage.getItem('analyzedData'));


  $scope.nextGenSelection = [];

  $scope.checkForNextGenSelection = function(selection) {
    // Check if we have two offsprings for next generation.
    // If not, throw an error.
    if(offspringDisplayFactory.checkForNextGenSelection(selection)) {
      $("p#next-gen-error-message").hide();
      $("p#next-gen-success-message").html('<a class="badge badge-success">Successfully</a> generated next generation offspring and updated the contents on this page.');
      $("p#next-gen-success-message").show();
      var nextGenOutcome = offspringDisplayFactory.predictNextGeneration(selection[0].notation,selection[1].notation);
      $scope.shortenedParents.push([selection[0].notation,selection[1].notation]);
      $scope.offsprings.push(nextGenOutcome);
      $scope.offspringsShortened.push(phenotypeFactory.shortenOutcome(nextGenOutcome));
      $scope.crossTypes.push($scope.crossTypes[$scope.currentGeneration]);
      //$scope.analyzedData
      phenotypeFactory.saveDataToSessionStorage($scope);
      $scope.nextGenSelection = [];
      $scope.currentGeneration = $scope.offsprings.length - 1;
      // $state.go('home.generationDisplay');
      $scope.drawCharts();
      $route.reload();
    } else {
        var count = 2 - selection.length;
        $("p#next-gen-success-message").hide();
        $("p#next-gen-error-message").html('<a class="badge badge-danger">Error</a> Drag and drop ' + count + ' offsprings from outcome box (left) into next generation selection box (right).');
        $("p#next-gen-error-message").show();
    }
  }

  $scope.startOver = function() {
    sessionStorage.clear();
    $state.go('home.welcome');
  }

  // Toggle glyphicon on button click
  $('#previousGenBtn').click(function(){
    $('#prevGenGlyphicon').toggleClass('glyphicon-plus').toggleClass('glyphicon-minus');
    $scope.drawDonutCharts();
  });

  // Toggle glyphicon on button click
  $('#initialSelectionBtn').click(function(){
    $('#initialSelectionGlyphicon').toggleClass('glyphicon-plus').toggleClass('glyphicon-minus');
  });

    // Fetch notation symbols
    var capitalAlphabets = phenotypeFactory.getCapitalAlphabets();
    var smallAlphabets = phenotypeFactory.getSmallAlphabets();


    var lineChart = document.getElementById("distinctPhenotypes").getContext('2d');
    $scope.drawCharts = function() {
      offspringDisplayFactory.lineChartForDistinctPhenotypes($scope.offspringsShortened, lineChart);
    }

    $scope.drawCharts();

    $scope.drawDonutCharts = function() {
      angular.forEach($scope.offspringsShortened, function(value,key) {
        var id = "ratioChart-" + key;
        var data = [];
        var labels = [];
        var backgroundColor = [];
        angular.forEach(value, function(x, y) {
          data.push(x.occurence);
          labels.push(x.notation);
          backgroundColor.push(offspringDisplayFactory.getRandomColor());
        });

        id = new Chart(id, {
          type: 'doughnut',
          data: {
            datasets: [{
              data: data,
              backgroundColor: backgroundColor
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: labels
          },
          options: {
            responsive: false
          }
        });
      });
    }

}]);
