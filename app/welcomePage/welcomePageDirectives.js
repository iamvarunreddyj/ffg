
welcomeModule.directive('modalDirective', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/welcomePage/modalTemplate.html',
        scope: {
            id: '@modalId'
        },
        link: function ($scope, $element, $attrs) {

        }
    }
});

welcomeModule.directive('welcomeModalDirective', [function () {
    return {
        restrict: 'A',
        replace: false,
        link: function ($scope, $element, $attrs) {
           
        }
    }
}]);
