(function () {
    var HomeController = function ($scope, $http, $interval, $timeout, Fullscreen) {

      $scope.render = false

      $scope.toggleFullScreen = function() {
        if (Fullscreen.isEnabled())
           Fullscreen.cancel();
        else
           Fullscreen.all();
      }

      $scope.image = {}
      $scope.isOpaque = false;

      $http({
          method: 'GET',
          url: '/images.json'
      }).success(function (response) {
          var i = 0
          $scope.image.source = response[i].url
          $scope.image.author = response[i].author
          $timeout(function () {
            $scope.isOpaque = true;
          }, 4750)
          $interval(function () {
              i++
              if (i === response.length - 1) {
                  i = 0
              }
              $scope.image.source = response[i].url
              $scope.image.author = response[i].author
              $timeout(function () {
                  $scope.isOpaque = false;
              }, 250)
              $timeout(function () {
                $scope.isOpaque = true;
              }, 4750)
          }, 5000)
          $scope.render = true
      })

    };

    HomeController.$inject = ['$scope', '$http', '$interval', '$timeout', 'Fullscreen'];
    angular.module('app.backdrop').controller('HomeController', HomeController);
}());
