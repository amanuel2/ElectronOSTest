var app = angular.module('SparkApp', ['ui.router', 'ngMaterial', 'firebase', 'ngMdIcons', 'ngMessages'])

var mysql  = require('mysql');


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

      $stateProvider.state('chat.chatRoom', {
        url:'/room',
        templateUrl: 'views/chatRoom.html',
        controller:'chatRoomCtrl'
      })

});
function DialogController($scope, $mdDialog, userService,$firebaseObject) {
      var ref = new Firebase('https://sparke.firebaseio.com/');

      $scope.username = userService.user.Username;
      $scope.image = userService.user.Image;
      $scope.email = userService.user.Email;
      $scope.backimage = userService.user.BackImage
      $scope.uid = userService.user.UID
      console.log($scope.username, $scope.image, $scope.email, $scope.backimage)

  $scope.addFriend = function(){
    ref.onAuth(function(authData){
      var uid = $scope.uid
      var obj = $firebaseObject(ref.child("UsersAuthInfo").child(authData.uid).child("Friends").child($scope.username));
      obj.friend = {
        Username: $scope.username,
        image: $scope.image,
        email: $scope.email,
        backimage: $scope.backimage,
        uid: $scope.uid
      }
      obj.$save().then(function(ref) {
          $mdDialog.hide();
        }, function(error) {
          console.log("Error:", error);
        });
    })

  }

  $scope.hide = function() {
       $mdDialog.hide();
   };
   $scope.cancel = function() {
       $mdDialog.cancel();
   };
   $scope.answer = function(answer) {
       $mdDialog.hide(answer);
   };

 };
