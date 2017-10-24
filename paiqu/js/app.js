angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

// .run(function($ionicPlatform) {
//   $ionicPlatform.ready(function() {
//     // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//     // for form inputs)
//     if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
//       cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//     }
//     if (window.StatusBar) {
//       // org.apache.cordova.statusbar required
//       StatusBar.styleLightContent();
//     }
//   });
// })

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'

    })

    .state('select-head', {
        url: '/select-head',
        cache: false,
        templateUrl: 'views/select-head.html',
        controller: 'SelectHeadCtrl'

    })

    .state('build', {
        url: '/build',
        cache: false,
        templateUrl: 'views/build.html',
        controller: 'BuildCtrl'

    })

    .state('build-text', {
        url: '/build-text',
        cache: false,
        templateUrl: 'views/build-text.html',
        controller: 'BuildTextCtrl'

    })

    .state('end', {
        url: '/end/:src',
        templateUrl: 'views/end.html',
        controller: 'EndCtrl'

    })

    ;

    $urlRouterProvider.otherwise('/home');
    JSON.stringify
});