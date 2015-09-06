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

    $rootScope.isIOS = ionic.Platform.isIOS();
    $rootScope.isAndroid = ionic.Platform.isAndroid();
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
    url: "/browse/:year/:category",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.year.html",
        controller: 'browseYearController'
      }
    }
  })

  .state('app.browseQuestions', {
    url: "/browse/:year/:category/:questionID",
    cache:false,
    views: {
      'menuContent': {
        templateUrl: "templates/browse.questions.html",
        controller: 'browseQuestionsController'
      }
    }
  })

  .state('app.browseCandidate', {
    url: "/browse/:year/:questionID/:category/:candidate",
    cache:false,
    views: {
      'menuContent': {
        templateUrl: "templates/browse.candidate.html",
        controller: 'browseCandidateController'
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
