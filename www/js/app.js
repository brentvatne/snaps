angular.module('snap')
.constant('FirebaseUrl', "https://snap-ruby-db.firebaseio.com")

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('snaps', {
      url: "/snaps",
      abstract: true,
      templateUrl: "templates/layout.html"
    })

    .state('snaps.stream', {
      url: "/stream",
      templateUrl: 'templates/snaps/stream.html',
      controller: 'SnapsCtrl'
    })

  $urlRouterProvider.otherwise('/snaps/stream');
});
