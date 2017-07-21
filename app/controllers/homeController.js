(function () {
    var HomeController = function ($scope, $http, $interval, $timeout, Fullscreen) {

      $scope.render = false;

      var apod_url = 'https://api.nasa.gov/planetary/apod';
      var key = 'FRRFYrhD6A5p16gC1Tuclc56YP5HZvaV2rjVOpbV';

      $scope.toggleFullScreen = function() {
        if (Fullscreen.isEnabled())
           Fullscreen.cancel();
        else
           Fullscreen.all();
      };

      $scope.image = {};

      var random = Math.floor(Math.random() * 1000);
      var date = moment().subtract(random, 'days').format('YYYY-MM-DD')
      var url = apod_url + '?api_key=' + key + '&hd=true&date=' + date
      $http.get(url)
          .success(function (response) {
              $scope.image = response;
              $scope.render = true;
          })

      $interval(function () {
          var random = Math.floor(Math.random() * 1000);
          var date = moment().subtract(random, 'days').format('YYYY-MM-DD')
          var url = apod_url + '?api_key=' + key + '&hd=true&date=' + date

          $http.get(url)
              .success(function (response) {
                  $scope.image = response;
              })
      }, 20000)

    };

    HomeController.$inject = ['$scope', '$http', '$interval', '$timeout', 'Fullscreen'];
    angular.module('app.backdrop').controller('HomeController', HomeController);
}());
