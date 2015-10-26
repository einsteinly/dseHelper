angular.module('starter', ['ionic', 'controllers', 'ngIOS9UIWebViewPatch'])

.run(function($ionicPlatform,$http,$rootScope,$ionicLoading, $ionicModal) {

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
        controller: 'browseGroupController'
      }
    },
    resolve : {
      data: '$data'
    }
  })

  .state('app.browse2', {
    url: "/browse2",
    views: {
      'menuContent': {
        templateUrl: "templates/browse2.html",
        controller: 'browseIndividualController'
      }
    },
    resolve : {
      data: '$data'
    }
  })


  .state('app.browseQuestions', {
    url: "/browse/:questionID",
    cache:false,
    views: {
      'menuContent': {
        templateUrl: "templates/browse.questions.html",
        controller: 'browseQuestionsController'
      }
    }
  })

  .state('app.browseCandidate', {
    url: "/browse/:questionID/:candidate",
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

  .state('app.player', {
    url: "/player",
    views: {
      'menuContent': {
        templateUrl: "templates/player.html",
        controller: 'playerController'
      }
    }
  })

  .state('app.home', {
    url: "/home",
    views: {
      'menuContent': {
        templateUrl: "templates/home.html",
        controller: 'homeController'
      }
    }
  })
  ;
  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/app/download');
  $urlRouterProvider.otherwise('/app/home');
})

;




/**
 * ==================  angular-ios9-uiwebview.patch.js v1.1.1 ==================
 *
 * This patch works around iOS9 UIWebView regression that causes infinite digest
 * errors in Angular.
 *
 * The patch can be applied to Angular 1.2.0 – 1.4.5. Newer versions of Angular
 * have the workaround baked in.
 *
 * To apply this patch load/bundle this file with your application and add a
 * dependency on the "ngIOS9UIWebViewPatch" module to your main app module.
 *
 * For example:
 *
 * ```
 * angular.module('myApp', ['ngRoute'])`
 * ```
 *
 * becomes
 *
 * ```
 * angular.module('myApp', ['ngRoute', 'ngIOS9UIWebViewPatch'])
 * ```
 *
 *
 * More info:
 * - https://openradar.appspot.com/22186109
 * - https://github.com/angular/angular.js/issues/12241
 * - https://github.com/driftyco/ionic/issues/4082
 *
 *
 * @license AngularJS
 * (c) 2010-2015 Google, Inc. http://angularjs.org
 * License: MIT
 */

angular.module('ngIOS9UIWebViewPatch', ['ng']).config(['$provide', function($provide) {
  'use strict';

  $provide.decorator('$browser', ['$delegate', '$window', function($delegate, $window) {

    if (isIOS9UIWebView($window.navigator.userAgent)) {
      return applyIOS9Shim($delegate);
    }

    return $delegate;

    function isIOS9UIWebView(userAgent) {
      return /(iPhone|iPad|iPod).* OS 9_\d/.test(userAgent) && !/Version\/9\./.test(userAgent);
    }

    function applyIOS9Shim(browser) {
      var pendingLocationUrl = null;
      var originalUrlFn= browser.url;

      browser.url = function() {
        if (arguments.length) {
          pendingLocationUrl = arguments[0];
          return originalUrlFn.apply(browser, arguments);
        }

        return pendingLocationUrl || originalUrlFn.apply(browser, arguments);
      };

      window.addEventListener('popstate', clearPendingLocationUrl, false);
      window.addEventListener('hashchange', clearPendingLocationUrl, false);

      function clearPendingLocationUrl() {
        pendingLocationUrl = null;
      }

      return browser;
    }
  }]);
}]);