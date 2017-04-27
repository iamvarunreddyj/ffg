phenotypeSelectionApp.directive('selectionDirective',function(){
    return {
        restrict : 'E',
        replace : true,
        templateUrl : 'app/phenotypeSelection/selectionTemplate.html',
        scope : {
            showCondition : '@showCondition',
            ifCondition : '@ifCondition',
            headingOne : '@headingOne',
            headingTwo : '@headingTwo'
        },
        link : function($scope, $element, $attrs) {

        }
    }
});

phenotypeSelectionApp.directive('selectDirective',function(){
    return {
        restrict : 'E',
        replace : true,
        templateUrl : 'app/phenotypeSelection/selectTemplate.html',
        scope : {
            mods : '@modelName',
            selectDataObject : '@dataObject',
            selectValueName : '@selectValueName',
            name : '@name'
        },
        link : function($scope, $element, $attrs) {

        }
    }
});


phenotypeSelectionApp.directive('radioSelectionDirective',function(){
    return {
        restrict : 'E',
        replace : true,
        templateUrl : 'app/phenotypeSelection/radioSelectionTemplate.html',
        scope : {
            radioSelectDataObject : '@dataObject',
            id : '@id',
            value : '@valueName',
            inputDescription : '@description'
        },
        link : function($scope, $element, $attrs) {

        }
    }
});
