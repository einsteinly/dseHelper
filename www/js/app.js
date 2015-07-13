// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'controllers'])

.run(function($ionicPlatform,$http,$rootScope,$ionicLoading) {

    $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    });


    $rootScope.show = function(text) {
      $ionicLoading.show({
        template: text
      });
    };
 
    $rootScope.hide = function() {
      $ionicLoading.hide();
    };

    $rootScope.toggle = function(text, timeout) {
      $rootScope.show(text);
 
      setTimeout(function() {
        $rootScope.hide();
      }, (timeout || 1000));
    };
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html",
        controller: 'browseController'
      }
    }
  })

  .state('app.browseYear', {
    url: "/browse/:year",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.year.html",
        controller: 'browseYearController'
      }
    }
  })

  .state('app.browseQuestions', {
    url: "/browse/:year/:questionID",
    cache:false,
    views: {
      'menuContent': {
        templateUrl: "templates/browse.questions.html",
        controller: 'browseQuestionsController'
      }
    }
  })

  .state('app.profile', {
    url: "/profile",
    views: {
      'menuContent': {
        templateUrl: "templates/profile.html",
        controller: 'ProfileCtrl'
      }
    }
  })

  .state('app.downloadBrowse', {
    url: "/download",
    views: {
      'menuContent': {
        templateUrl: "templates/download.html",
        controller: 'downloadBrowseController'
      }
    }
  })
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/download');
})

;
