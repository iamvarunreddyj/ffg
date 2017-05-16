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

            var offspring = [];
            for (i=0; i<predictionSource.length; i++) {
                for(j=0; j<predictionSource.length; j++) {
                    if(Array.isArray(predictionSource[i])) {
                        var outcome = "";
                        for(k=0; k<predictionSource[i].length; k++) {
                            outcome = outcome.concat(predictionSource[i][k].concat(predictionSource[j][k]));
                        }
                        offspring.push(outcome);
                    } else {
                        offspring.push(predictionSource[i].concat(predictionSource[j]));
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
                crossType : "Select a cross type",
                phenotypeOne: {
                    phenotype: "Select phenotype for parent type 1",
                    parent: "Select dominant and/or recessive parent type 1 for the cross",
                },
                phenotypeTwo: {
                    phenotype: "Select phenotype for parent type 2",
                    parent: "Select dominant and/or recessive parent type 2 for the cross",
                },
                phenotypeThree: {
                    phenotype: "Select phenotype for parent type 3",
                    parent: "Select dominant and/or recessive parent type 3 for the cross",
                },
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
        }
                                                   
    };
}]);
