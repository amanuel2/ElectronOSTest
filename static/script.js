var app = angular.module('SparkApp', ['ui.router', 'ngMaterial', 'firebase', 'ngMdIcons', 'ngMessages'])

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("home")
      $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })

      $stateProvider.state('chat', {
        url:'/chat',
        templateUrl: 'views/chat.html',
        controller:'chatCtrl'
      })

});
