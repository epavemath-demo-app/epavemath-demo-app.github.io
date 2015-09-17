/**
 * Created by Aston Hamilton.
 */

import Angular from 'angular';

import 'angular-animate';
import 'angular-material';
import 'angular-route';
import 'Hendrixer/ngFx';

var app = Angular.module('StarterApp', ['ngMaterial', 'ngRoute', 'ngFx', 'ngAnimate']);

app.config(function($mdThemingProvider) {
  $mdThemingProvider
      .theme('default')
      .primaryPalette('teal')
      .accentPalette('orange');
});

function PageController($scope, $timeout) {
  $scope.pageReady = false;

  $timeout(function() {
    $scope.pageReady = true;
  }, 10);
}

PageController.$inject = ['$scope', '$timeout'];

app.config(['$routeProvider', function($routeProvider) {


  $routeProvider.when('/splash', {
    templateUrl: 'partials/splash.html',
    controller: 'SplashPageCtrl'
  });
  $routeProvider.when('/main-menu', {
    templateUrl: 'partials/main-menu.html',
    controller: 'MainMenuCtrl'
  });
  $routeProvider.when('/topic/fractions', {
    templateUrl: 'partials/fractions-topic-menu.html',
    controller: 'FractionsTopicCtrl'
  });
  $routeProvider.when('/topic/algebra', {
    templateUrl: 'partials/algebra-topic-menu.html',
    controller: 'AlgebraTopicCtrl'
  });
  $routeProvider.when('/assessment', {
    templateUrl: 'partials/assessment.html',
    controller: PageController
  });
  $routeProvider.when('/lesson-1', {
    templateUrl: 'partials/lesson-1.html',
    controller: 'FractionsLessonCtrl'
  });
  $routeProvider.when('/lesson-2', {
    templateUrl: 'partials/lesson-2.html',
    controller: 'AlgebraLessonCtrl'
  });
  $routeProvider.otherwise('/splash');
}]);


app.controller('SplashPageCtrl',
    ['$scope', '$timeout', '$location', function($scope, $timeout, $location) {
      PageController.call(this, $scope, $timeout);


      $timeout(function() {
        $location.url('/main-menu');
      }, 3000);
    }]
);

app.controller('MainMenuCtrl',
    ['$scope', '$timeout', '$location', '$mdToast', function($scope, $timeout, $location, $mdToast) {
      PageController.call(this, $scope, $timeout);


      $scope.menuItems = [
        {
          icon: 'number-blocks',
          title: 'Number System'
        },
        {
          icon: 'abacus',
          title: 'Arithmetic'
        },
        {
          icon: 'chart',
          title: 'Graphs'
        },
        {
          icon: 'compass',
          title: 'Shapes'
        },
        {
          icon: 'ruler',
          title: 'Measurements'
        },
        {
          icon: 'sliced-pizza',
          title: 'Fractions'
        },
        {
          icon: 'fx',
          title: 'Algebra'
        },
        {
          icon: 'surd',
          title: 'Multiplication'
        },
        {
          icon: 'timer',
          title: 'Assessment'
        }
      ];

      $scope.onTopicClicked = function(index) {
        if (index === 5) {
          $location.url('/topic/fractions');
          return;
        }

        if (index === 6) {
          $location.url('/topic/algebra');
          return;
        }

        if (index === $scope.menuItems.length - 1) {
          $mdToast.show(
              $mdToast.simple()
                  .content('This assessment is not yet ready')
                  .position('bottom')
                  .hideDelay(3000)
          );
          return;
        }

        $mdToast.show(
            $mdToast.simple()
                .content('This topic does not have any lessons as yet')
                .position('bottom')
                .hideDelay(3000)
        );
      };
    }]
);

app.controller('FractionsTopicCtrl',
    ['$scope', '$timeout', '$location', '$mdToast', function($scope, $timeout, $location, $mdToast) {
      PageController.call(this, $scope, $timeout);

      $scope.lessonCount = 8;

      $scope.range = function(min, max) {
        var range = [];
        for(var i=min;i<max;i++) {
          range.push(i);
        }
        return range;
      };

      $scope.onBackClicked = function(index) {
        $location.url('/main-menu');
      };

      $scope.onLessonClicked = function(index) {

        if (index === $scope.lessonCount) {
          $mdToast.show(
              $mdToast.simple()
                  .content('This assessment is not yet ready')
                  .position('bottom')
                  .hideDelay(3000)
          );
          return;
        }

        $location.url('/lesson-1');
      };
    }]
);

app.controller('AlgebraTopicCtrl',
    ['$scope', '$timeout', '$location', '$mdToast', function($scope, $timeout, $location, $mdToast) {
      PageController.call(this, $scope, $timeout);

      $scope.lessonCount = 12;

      $scope.range = function(min, max) {
        var range = [];
        for(var i=min;i<max;i++) {
          range.push(i);
        }
        return range;
      };

      $scope.onBackClicked = function(index) {
        $location.url('/main-menu');
      };

      $scope.onLessonClicked = function(index) {
        if ($scope.lessonCount === index) {
          $mdToast.show(
              $mdToast.simple()
                  .content('This assessment is not yet ready')
                  .position('bottom')
                  .hideDelay(3000)
          );
          return;
        }

        $location.url('/lesson-2');
      };
    }]
);
app.controller('AlgebraLessonCtrl',
    ['$scope', '$timeout', '$location', '$mdToast', function($scope, $timeout, $location, $mdToast) {
      PageController.call(this, $scope, $timeout);


      $scope.onBackClicked = function() {
        $location.url('/topic/algebra');
      };

    }]
);
app.controller('FractionsLessonCtrl',
    ['$scope', '$timeout', '$location', '$mdToast', function($scope, $timeout, $location, $mdToast) {
      PageController.call(this, $scope, $timeout);


      $scope.showMainLesson = false;
      $scope.thumbShown = 0;

      $timeout(function() {
        $scope.thumbShown = 1;
      }, 100000);

      $scope.onBackClicked = function() {
        $location.url('/topic/fractions');
      };

      $scope.onSkipClicked = function() {
        $scope.showMainLesson = true;
      };

      $timeout(function() {
        document.getElementById('mainFractionsVideo').addEventListener('ended',function() {
          $timeout(function() {
            $scope.showMainLesson = true;
          });
        },false);
      }, 10);

    }]
);