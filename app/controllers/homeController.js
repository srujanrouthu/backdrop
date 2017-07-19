(function () {
    var HomeController = function ($scope, $http, $interval, Fullscreen) {

      $scope.render = false

      $scope.toggleFullScreen = function() {
        if (Fullscreen.isEnabled())
           Fullscreen.cancel();
        else
           Fullscreen.all();
      }

      $http({
          method: 'GET',
          url: '/images.json'
      }).success(function (response) {
          var i = 0
          $scope.imageUrl = response[i].url
          $interval(function () {
              i++
              if (i === response.length - 1) {
                  i = 0
              }
              $scope.imageUrl = response[i].url
          }, 5000)
          $scope.render = true
      })

    };

    HomeController.$inject = ['$scope', '$http', '$interval', 'Fullscreen'];
    angular.module('app.backdrop').controller('HomeController', HomeController);
}());
