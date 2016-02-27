var app = angular.module('SparkApp', ['ui.router', 'ngMaterial', 'firebase', 'ngMdIcons', 'ngMessages'])
app.run(["$rootScope", "$location", function($rootScope, $location) {
    $rootScope.$on("$stateChangeError", function(event, next, previous, error) {
        // We can catch the error thrown when the $requireAuth promise is rejected
        // and redirect the user back to the home page
        console.log(error)
        if(error)
            window.location.hash="/home"
    });
}]);
app.factory("Auth", ["$firebaseAuth",
    function($firebaseAuth) {
        var ref = new Firebase('https://sparke.firebaseio.com/');
        return $firebaseAuth(ref);
    }
]);

app.config(function($stateProvider, $urlRouterProvider,$mdIconProvider) {
   $mdIconProvider
    .defaultIconSet('libs/Icons/mdi.svg')

  $urlRouterProvider.otherwise("home")
      $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        resolve: {
            // controller will not be loaded until $waitForAuth resolves
            // Auth refers to our $firebaseAuth wrapper in the example above
            "currentAuth": ["Auth", function(Auth) {
                // $waitForAuth returns a promise so the resolve waits for it to complete
                return Auth.$waitForAuth();
            }]
        }
      })

      $stateProvider.state('chat', {
        url:'/chat',
        templateUrl: 'views/chat.html',
        controller:'chatCtrl',
        resolve: {
            // controller will not be loaded until $requireAuth resolves
            // Auth refers to our $firebaseAuth wrapper in the example above
            "currentAuth": ["Auth", function(Auth) {
                // $requireAuth returns a promise so the resolve waits for it to complete
                // If the promise is rejected, it will throw a $stateChangeError (see above)
                return Auth.$requireAuth();
            }]
        }
      })

      $stateProvider.state('chat.chatRoom', {
        url:'/room?stateChatUID',
        templateUrl: 'views/chatRoom.html',
        controller:'chatRoomCtrl',
        resolve: {
            // controller will not be loaded until $requireAuth resolves
            // Auth refers to our $firebaseAuth wrapper in the example above
            "currentAuth": ["Auth", function(Auth) {
                // $requireAuth returns a promise so the resolve waits for it to complete
                // If the promise is rejected, it will throw a $stateChangeError (see above)
                return Auth.$requireAuth();
            }]
        }
      })
      $stateProvider.state('chat.settings', {
        url:'/settings',
        templateUrl: 'views/settings.html',
        controller:'settingsCtrl',
        resolve: {
            // controller will not be loaded until $requireAuth resolves
            // Auth refers to our $firebaseAuth wrapper in the example above
            "currentAuth": ["Auth", function(Auth) {
                // $requireAuth returns a promise so the resolve waits for it to complete
                // If the promise is rejected, it will throw a $stateChangeError (see above)
                return Auth.$requireAuth();
            }]
        }
      })

    app.filter('keyboardShortcut', function($window) {
    return function(str) {
      if (!str) return;
      var keys = str.split('-');
      var isOSX = /Mac OS X/.test($window.navigator.userAgent);
      var seperator = (!isOSX || keys.length > 2) ? '+' : '';
      var abbreviations = {
        M: isOSX ? '⌘' : 'Ctrl',
        A: isOSX ? 'Option' : 'Alt',
        S: 'Shift'
      };
      return keys.map(function(key, index) {
        var last = index == keys.length - 1;
        return last ? key : abbreviations[key];
      }).join(seperator);
    };
  })

});
