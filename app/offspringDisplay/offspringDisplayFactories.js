offspringDisplay.factory('offspringDisplayFactory', ['phenotypeFactory', function (phenotypeFactory) {
  return {
    getNotationList : function(length){
      /*
        Returns the notationList in below format.
        Eg:-
          if length is 3, returns [[A,a],[B,b],[C,c]]
          if length is 1, returns [[A,a]]
      */
      var capitalAlphabets = phenotypeFactory.getCapitalAlphabets();
      var smallAlphabets = phenotypeFactory.getSmallAlphabets();
      notationList = [];
      for(i=0; i<length; i++) {
        notationList.push([capitalAlphabets[i], smallAlphabets[i]]);
      }

      //return the notation list
      return notationList;
    },
    getPhenotypeForNotation : function(notation, parents) {
      /*
        Returns phenotype for the provided notation.
        Eg:-
            notation : A
            parents : {
              "dominant": {
                  "phenotype":"Red Eye",
                  "genotype":"+",
                  "imageLocation":"resources/images/redEye.png",
                  "alphabet":"A"
                },
                "recessive": {
                  "phenotype":"Eyeless",
                  "genotype":"e-",
                  "imageLocation":"resources/images/eyeless.png",
                  "alphabet":"a"
                }
            }

            Returns "Red Eye"
      */
      for(i=0; i<parents.length; i++) {
        if(parents[i].dominant.alphabet == notation) {
          return parents[i].dominant.phenotype;
        } else if(parents[i].recessive.alphabet == notation) {
          return parents[i].recessive.phenotype;
        }
      }
    },
    analyzeData : function(data, parents) {
      /*
        Analyzes offspring outcome data and converts it into presentable format for data visualization

        Eg:-
            input : ["AA","Aa","aA","aa"]

            parents : {
            "dominant" : {
              "phenotype":"White Eye",
              "genotype":"w",
              "imageLocation":"resources/images/whiteEye.png",
              "alphabet":"A"
            },
            "recessive": {
              "phenotype":"Orange Eye",
              "genotype":"se",
              "imageLocation":"resources/images/orangeEye.png",
              "alphabet":"a"
            }

            output : {
              "Heterozygous White Eye": 2,
              "Homozygous White Eye": 1,
              "Homozygous Orange Eye": 1
            }
      */

      // Find the length of the data and get the skeleton designed for analysing the data.
      var self = this;
      var length = ((data[0].length)/2);
      // dataSkeleton = this.getDataSkeletonForAnalysis(length);

      // Get list of phenotype notations that needs to be analysed for in the data
      notationList = this.getNotationList(length);

      var outcome = {};
      // Analyze through data and notation list to for organised data for visualization
      angular.forEach(data, function (value, key) {

        angular.forEach(notationList, function (notationValue, notationKey) {
          // Regular expression to count occurence of a character in a string.
          var re =  new RegExp(notationValue[0], "g");
          var matchLength;
          if(value.match(re) != null) {
            matchLength = value.match(re).length;
          } else {
            matchLength = 0;
          }

          var heterozygousDominant = "Heterozygous " + self.getPhenotypeForNotation(notationValue[0], parents);
          var homozygousDominant = "Homozygous " + self.getPhenotypeForNotation(notationValue[0], parents);
          var homozygousRecessive = "Homozygous " + self.getPhenotypeForNotation(notationValue[1], parents);

          if(!outcome[heterozygousDominant]) {
            outcome[heterozygousDominant] = 0;
          }
          if(!outcome[homozygousDominant]) {
            outcome[homozygousDominant] = 0;
          }
          if(!outcome[homozygousRecessive]) {
            outcome[homozygousRecessive] = 0;
          }

          if(matchLength == 2) {
            // dataSkeleton[notationKey][0]++;
            // dataSkeleton[notationKey][1]++;
            outcome[homozygousDominant]++
          } else if (matchLength == 1) {
            // dataSkeleton[notationKey][0]++;
            // dataSkeleton[notationKey][2]++;
            outcome[heterozygousDominant]++
          }
          else if (matchLength == 0) {
            // dataSkeleton[notationKey][3]++;
            // dataSkeleton[notationKey][4]++;
            outcome[homozygousRecessive]++
          }

        });

      });

      return outcome;
    },
    checkForNextGenSelection: function(selection) {
      if(selection.length == 2) {
           return true;
      }

      return false;
    },
    predictNextGeneration: function(parentX,parentY) {
      var prePredictData = phenotypeFactory.processGenerationSelection([parentX, parentY]);
      var predictedNextGenerationOutcome = phenotypeFactory.predict([phenotypeFactory.prepareForPrediction(prePredictData[0]),phenotypeFactory.prepareForPrediction(prePredictData[1])]);

      return predictedNextGenerationOutcome;
    },
    dataForDistinctPhenotypes : function(offspringsShortened) {
      var data = {};
      data.labels = [];
      data.datasets = [];
      var numbers = [];
      angular.forEach(offspringsShortened, function(value, key) {
        data.labels.push('Generation ' + key);
        numbers.push(value.length);
      });

      data.datasets.push({'data': numbers})

      return data;
    },
    lineChartForDistinctPhenotypes : function(offspringsShortened, lineChart) {
      var self = this;
      var data = self.dataForDistinctPhenotypes(offspringsShortened);
    
      var chart = new Chart(lineChart, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
          labels: data.labels,
          datasets: [{
            label: "No.of distinct phenotypes for all generations",
            backgroundColor: 'RGB(102,178,255)',
            borderColor: 'blue',
            data: data.datasets[0].data,
          }]
        },

        // Configuration options go here
        options: {
          responsive: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero:true
              }
            }]
          },
        }
      });

      return true;
    },
    getRandomColor : function() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
  };
}]);
