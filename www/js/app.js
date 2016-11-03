// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','starter.filter'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider,$httpProvider, $urlRouterProvider,$ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(0);
  $ionicConfigProvider.platform.ios.tabs.style('standard'); 
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('standard');

  $ionicConfigProvider.platform.ios.navBar.alignTitle('center'); 
  $ionicConfigProvider.platform.android.navBar.alignTitle('left');

  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');  

  $ionicConfigProvider.platform.ios.views.transition('ios'); 
  $ionicConfigProvider.platform.android.views.transition('android');
  $ionicConfigProvider.backButton.previousTitleText(false);
  $ionicConfigProvider.backButton.text("返回").icon('ion-ios-arrow-back');

  $httpProvider.defaults.transformRequest=function(obj){
    var str=[];
    for(var p in obj){
      str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));

    }
    return str.join("&");
  }
  $httpProvider.defaults.headers.post={
    'Content-Type':'application/x-www-form-urlencoded'
  }
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.tab1', {
    url: '/tab1',
    views: {
      'tab1': {
        templateUrl: 'templates/tab1.html',
        controller: 'Tab1Ctrl'
      }
    }
  })
  .state('tab.tab1-details', {
    url: '/tab/tab1-details/:id/:title',
    views: {
      'tab1': {
        templateUrl: 'templates/tab1-details.html',
        controller: 'Tab1DetailsCtrl'
      }
    }
  })
  .state('tab.tab2', {
      url: '/tab2',
      views: {
        'tab2': {
          templateUrl: 'templates/tab2.html',
          controller: 'Tab2Ctrl'
        }
      }
    })
  .state('tab.tab2-details', {
    url: '/tab/tab2-details/:id/:title',
    views: {
      'tab2': {
        templateUrl: 'templates/tab2-details.html',
        controller: 'Tab2DetailsCtrl'
      }
    }
  })
    .state('tab.tab3', {
      url: '/tab3',
      views: {
        'tab3': {
          templateUrl: 'templates/tab3.html',
          controller: 'Tab3Ctrl'
        }
      }
    })
    .state('tab.tab3-details', {
    url: '/tab/tab3-details/:id/:title',
    views: {
      'tab3': {
        templateUrl: 'templates/tab3-details.html',
        controller: 'Tab3DetailsCtrl'
      }
    }
  })
    .state('tab.tab4', {
      url: '/tab4',
      views: {
        'tab4': {
          templateUrl: 'templates/tab4.html',
          controller: 'Tab4Ctrl'
        }
      }
    })

    .state('tab.tab4-details', {
    url: '/tab/tab4-details/:id/:title',
    views: {
      'tab4': {
        templateUrl: 'templates/tab4-details.html',
        controller: 'Tab4DetailsCtrl'
      }
    }
  })
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  .state('tab.account-login', {
      url: '/account-login',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account-login.html',
          controller: 'LoginCtrl'
        }
      }
    })
  .state('tab.account-fav', {
      url: '/account-fav',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account-fav.html',
          controller: 'FavCtrl'
        }
      }
    })
  .state('tab.account-details', {
      url: '/tab/account-details',
      cache:false,
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account-details.html',
          controller: 'AccountDetailsCtrl'
        }
      }
    })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/tab1');

});
