(function () {
    var HomeController = function ($scope, $http, $interval, Fullscreen) {

      $scope.render = false

      $scope.toggleFullScreen = function() {
        if (Fullscreen.isEnabled())
           Fullscreen.cancel();
        else
           Fullscreen.all();
      }

      $scope.image = {}

      $http({
          method: 'GET',
          url: '/images.json'
      }).success(function (response) {
          var i = 0
          $scope.image.source = response[i].url
          $scope.image.author = response[i].author
          $interval(function () {
              i++
              if (i === response.length - 1) {
                  i = 0
              }
              $scope.image.source = response[i].url
              $scope.image.author = response[i].author
          }, 5000)
          $scope.render = true
      })

    };

    HomeController.$inject = ['$scope', '$http', '$interval', 'Fullscreen'];
    angular.module('app.backdrop').controller('HomeController', HomeController);
}());
