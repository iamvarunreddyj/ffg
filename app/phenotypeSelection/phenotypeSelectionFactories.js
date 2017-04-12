phenotypeSelectionApp.factory('phenotypeFactory', [function () {
    return {
        getPhenotypesList: function () {
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
        }
    };
}]);
