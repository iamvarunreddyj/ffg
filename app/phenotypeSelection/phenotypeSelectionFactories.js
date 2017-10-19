phenotypeSelectionApp.factory('phenotypeFactory', [function () {
    return {
        getPhenotypesList : function () {
            var dataList = [
                {
                    "phenotype": "Eye Color",
                    "alleles": [
                        {
                            "name": "Red Eye",
                            "genotype": "+",
                            "descrition": "Wild type",
                            "isDominant": "true",
                            "imageLocation": "resources/images/redEye.png"
                        },
                        {
                            "name": "White Eye",
                            "genotype": "w",
                            "descrition": "White eyes",
                            "isDominant": "false",
                            "imageLocation": "resources/images/whiteEye.png"
                        },
                        {
                            "name": "Orange Eye",
                            "genotype": "se",
                            "descrition": "Orange eyes",
                            "isDominant": "false",
                            "imageLocation": "resources/images/orangeEye.png"
                        },
                        {
                            "name": "Eyeless",
                            "genotype": "e-",
                            "descrition": "Eyeless Fruit Fly",
                            "isDominant": "false",
                            "imageLocation": "resources/images/eyeless.png"
                        }
                    ]
                },
                {
                    "phenotype": "Wing Type",
                    "alleles": [
                        {
                            "name": "Normal",
                            "genotype": "+",
                            "descrition": "Wild type",
                            "isDominant": "true",
                            "imageLocation": "resources/images/normalWings.png"
                        },
                        {
                            "name": "Curly",
                            "genotype": "cy",
                            "descrition": "Curly Wings",
                            "isDominant": "true",
                            "imageLocation": "resources/images/curlyWings.png"
                        },
                        {
                            "name": "Short",
                            "genotype": "sw",
                            "descrition": "Short Wings",
                            "isDominant": "true",
                            "imageLocation": "resources/images/shortWings.png"
                        },
                    ]
                },
                {
                    "phenotype": "Eye Shape",
                    "alleles": [
                        {
                            "name": "Normal",
                            "genotype": "+",
                            "descrition": "Wild type",
                            "isDominant": "true",
                            "imageLocation": "resources/images/curlyWings.png"
                        },
                        {
                            "name": "Eyeless",
                            "genotype": "",
                            "descrition": "Eyes reduced",
                            "isDominant": "false",
                            "imageLocation": "resources/images/curlyWings.png"
                        },
                        {
                            "name": "Lobed",
                            "genotype": "L",
                            "descrition": "Small eyes on pedicule",
                            "isDominant": "true",
                            "imageLocation": "resources/images/curlyWings.png"
                        },
                        {
                            "name": "Bar",
                            "genotype": "B",
                            "descrition": "Long, narrow eyes",
                            "isDominant": "true",
                            "imageLocation": "resources/images/curlyWings.png"
                        }
                    ]
                },
            ];

            return dataList;
        },
        prepareForPrediction : function(selection) {
          /*
            Input : [[A,a],[B,b]]
            Ouput : [[A,B], [A,b], [a,B], [a,b]]

          */
            var result = [];
            if(selection.length == 3) {
                for(i=0; i < selection[0].length; i++) {
                    for(j=0; j < selection[1].length; j++) {
                        for(k=0; k < selection[2].length; k++) {
                            result.push([selection[0][i],selection[1][j],selection[2][k]]);
                        }
                    }
                }
            } else if (selection.length == 2) {
                for(i=0; i<selection[0].length; i++) {
                    for(j=0; j<selection[1].length; j++) {
                        result.push([selection[0][i],selection[1][j]]);
                    }
                }
            } else if (selection.length == 1) {
                return selection[0];
            }

            return result;
        },
        predict : function(predictionSource) {
          /*
            Input: [[[A,B],[A,b],[a,B],[a,b]], [[A,B],[A,B],[A,B],[A,B]]]
            Ouput: [AABB, AAbB, aABB, aAbB, AABB, AAbB, aABB, aAbB, AABB, AAbB, aABB, aAbB, AABB, AAbB, aABB, aAbB]

          */
            var offspring = [];
            var sourceX = predictionSource;
            var sourceY = predictionSource;
            if(predictionSource.length === 2) {
              sourceX = predictionSource[0];
              sourceY = predictionSource[1];
            }

            for (i=0; i<sourceX.length; i++) {
                for(j=0; j<sourceY.length; j++) {
                    if(Array.isArray(sourceX[i])) {
                        var outcome = "";
                        for(k=0; k<sourceX[i].length; k++) {
                            outcome = outcome.concat(sourceX[i][k].concat(sourceY[j][k]));
                        }
                        offspring.push(outcome);
                    } else {
                        offspring.push(sourceX[i].concat(sourceY[j]));
                    }

                }
            }

            return offspring;
        },
        crossTypesAvailable : [
            'Mono',
            'Di',
            'Tri'
        ],
        getMasterDataForSelectedPhenotype : function(selectedPhenotype) {
            var phenotypeList = this.getPhenotypesList();
            for (i = 0 ; i < phenotypeList.length ; i++) {
                if(phenotypeList[i].phenotype == selectedPhenotype) {
                    return phenotypeList[i].alleles;
                }
            }
        },
        getGenotypeForName : function(genotype) {
            var phenotypeList = this.getPhenotypesList();
            for (i = 0 ; i < phenotypeList.length ; i++) {
                var alleles = phenotypeList[i].alleles;
                for (j = 0 ; j < alleles.length ; j++) {
                    if(alleles[j].name == genotype) {
                        return alleles[j].genotype;
                    }
                }
            }
        },
        getCapitalAlphabets : function() {
            return "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        },
        getSmallAlphabets : function() {
            return "abcdefghijklmnopqrstuvwxyz";
        },
        assignPunnettSquareNotations : function (selectedData) {
            var capitalAlphabets = this.getCapitalAlphabets();
            var smallAlphabets = this.getSmallAlphabets();

            angular.forEach(selectedData, function (value, key) {
                value.dominant.alphabet = capitalAlphabets.charAt(key);
                value.recessive.alphabet = smallAlphabets.charAt(key);
            });
            return selectedData;
        },
        preProcessSelectedData : function(selectedData) {
            var preProcessedSelection = []
             angular.forEach(selectedData, function (value, key) {
                preProcessedSelection.push([value.dominant.alphabet, value.recessive.alphabet])
            });

            return preProcessedSelection;
        },
        formatSelectedDataAndReturnFullSelectionDetails: function (dominantPhenotype, recessivePhenotype) {
            return {
                dominant: {
                    phenotype: dominantPhenotype,
                    genotype: this.getGenotypeForName(dominantPhenotype)
                },
                recessive: {
                    phenotype: recessivePhenotype,
                    genotype: this.getGenotypeForName(recessivePhenotype)
                }
            }
        },
        getErrorMessages: function () {
            return {
                crossType : "<b>Please select a cross type.</b>",
                phenotypeOne: {
                    phenotype: "<b>Please select phenotype for parent type 1.</b>",
                    parent: "<b>Select dominant and/or recessive parent type 1 for the cross.</b>",
                },
                phenotypeTwo: {
                    phenotype: "<b>Please select phenotype for parent type 2.</b>",
                    parent: "<b>Select dominant and/or recessive parent type 2 for the cross.</b>",
                },
                phenotypeThree: {
                    phenotype: "<b>Please select phenotype for parent type 3.</b>",
                    parent: "<b>Select dominant and/or recessive parent type 3 for the cross.</b>",
                },
                genericMessageOne: "Cannot generate offspring ! "
            }
        },
        getImageLocationForName : function(genotype) {
            var phenotypeList = this.getPhenotypesList();
            for (i = 0 ; i < phenotypeList.length ; i++) {
                var alleles = phenotypeList[i].alleles;
                for (j = 0 ; j < alleles.length ; j++) {
                    if(alleles[j].name == genotype) {
                        return alleles[j].imageLocation;
                    }
                }
            }
        },
        shortenOutcome : function(input) {
            /*
            * input : [AA, Aa, aA, aa]
            * Output : {AA : 1, Aa : 2, aa: 1}
            */
            var inputCopy = input.slice();
            var shortenedOutcome = [];
            for(var i=0; i<inputCopy.length; i++) {
                if(inputCopy[i] !== "") {
                    var compareWith = inputCopy[i];
                    var count = 1;
                    for (var j=(i+1); j<inputCopy.length; j++ ) {
                        if(inputCopy[j] !== "") {
                            var diff = 0;
                            var compareTo = inputCopy[j];
                            for(var k=0; k<compareWith.length; k++) {
                                var index = compareTo.indexOf(compareWith[k]);
                                if(index === -1) {
                                  diff = 1;
                                  break;
                                } else {
                                  compareTo = compareTo.slice(0,index) + compareTo.slice(index+1);
                                }
                            }
                            if(diff === 0) {
                              ++count;
                              inputCopy[j] = "";
                            }
                        }
                    }
                    shortenedOutcome.push({"notation" : compareWith, "occurence": count});
                }
            }
            return shortenedOutcome;
        },
        processGenerationSelection: function(data) {
          /*
              Input:   [AaBbCc, AABBCC]
              Output:  [[[A,a],[B,b],[C,c]],[[A,A],[B,B],[C,C]]]
          */

            var self = this;
            var outcome = [];
            for (i=0; i<data.length; i++) {
              var length = data[i].length;
              var halfBakedData = [];
              for(j=0; j<length/2; j++) {
                halfBakedData.push([data[i][j*2], data[i][(j*2)+1]]);
              }
              outcome.push(halfBakedData);
            }

            return outcome;
        },
        concatArrayContents: function(input){
          var output = "";
          angular.forEach(input, function(value, key) {
              if(Array.isArray(value)) {
                output = output.concat(value.join(""));
              } else {
                output = output.concat(value);
              }
          });

          return output;
        },
        saveDataToSessionStorage: function(data) {
          sessionStorage.setItem('parents', JSON.stringify(data.parents));
          sessionStorage.setItem('shortenedParents', JSON.stringify(data.shortenedParents));
          sessionStorage.setItem('crossTypes', JSON.stringify(data.crossTypes));
          sessionStorage.setItem('offsprings', JSON.stringify(data.offsprings));
          sessionStorage.setItem('offspringsShortened', JSON.stringify(data.offspringsShortened));
          sessionStorage.setItem('analyzedData', JSON.stringify(data.analyzedData));
        }
    };
}]);
