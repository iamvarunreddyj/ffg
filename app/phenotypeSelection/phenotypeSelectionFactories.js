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
                        },
                        {
                            "name": "White Eye",
                            "genotype": "w",
                            "descrition": "White eyes",
                            "isDominant": "false"
                        },
                        {
                            "name": "Sepia Eye",
                            "genotype": "se",
                            "descrition": "Eyes brownish to black with age",
                            "isDominant": "false"
                        }
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
                        },
                        {
                            "name": "Eyeless",
                            "genotype": "",
                            "descrition": "Eyes reduced",
                            "isDominant": "false"
                        },
                        {
                            "name": "Lobed",
                            "genotype": "L",
                            "descrition": "Small eyes on pedicule",
                            "isDominant": "true"
                        },
                        {
                            "name": "Bar",
                            "genotype": "B",
                            "descrition": "Long, narrow eyes",
                            "isDominant": "true"
                        }
                    ]
                }
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
            'Mono-Hybrid',
            'Di-Hybrid',
            'Tri-Hybrid'
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
        }
    };
}]);
