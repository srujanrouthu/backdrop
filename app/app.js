(function () {
    var app = angular.module('app.backdrop', ['ngRoute', 'FBAngular']);
    app
    .config (['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when ('/', {
                title: 'Home',
                controller: 'HomeController',
                templateUrl: 'app/views/home.html'
            })
            .otherwise ({ redirectTo: '/' });
        console.log("App Connected");
    }])
    .directive('fadeIn', function($timeout){
        return {
            restrict: 'A',
            link: function($scope, $element, attrs){
                $element.addClass("ng-hide-remove");
                $element.on('load', function() {
                    $element.addClass("ng-hide-add");
                });
            }
        };
    });
}());
