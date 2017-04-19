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
                            "Descrition": "Wild type",
                            "isDominant": "true",
                        },
                        {
                            "name": "White Eye",
                            "genotype": "w",
                            "Descrition": "White eyes",
                            "isDominant": "false"
                        },
                        {
                            "name": "Sepia Eye",
                            "genotype": "se",
                            "Descrition": "Eyes brownish to black with age",
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
                            "Descrition": "Wild type",
                            "isDominant": "true",
                        },
                        {
                            "name": "Eyeless",
                            "genotype": "",
                            "Descrition": "Eyes reduced",
                            "isDominant": "false"
                        },
                        {
                            "name": "Lobed",
                            "genotype": "L",
                            "Descrition": "Small eyes on pedicule",
                            "isDominant": "true"
                        },
                        {
                            "name": "Bar",
                            "genotype": "B",
                            "Descrition": "Long, narrow eyes",
                            "isDominant": "true"
                        }
                    ]
                }
            ];

            return dataList;
        },
        prepareForPrediction : function(genotypeOne, genotypeTwo, genotypeThree) {
            var result = [];

            if(genotypeOne != undefined && genotypeTwo != undefined && genotypeThree != undefined) {
                for(i=0; i<genotypeOne.length; i++) {
                    for(j=0; j<genotypeTwo.length; j++) {
                        for(k=0; k<genotypeThree.length; k++) {
                            result.push([genotypeOne[i],genotypeTwo[j],genotypeThree[k]]);
                        }
                    }
                }
            } else if (genotypeOne != undefined && genotypeTwo != undefined) {
                for(i=0; i<genotypeOne.length; i++) {
                    for(j=0; j<genotypeTwo.length; j++) {
                        result.push([genotypeOne[i],genotypeTwo[j]]);
                    }
                }
            } else if (genotypeOne != undefined) {
                return genotypeOne;
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
    };
}]);
