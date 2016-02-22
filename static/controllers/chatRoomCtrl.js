app.controller('chatRoomCtrl', ["$scope","userChatService","$firebaseArray", function($scope,userChatService,$firebaseArray){
  console.log("GF")
  console.log(userChatService.user)
  $scope.username = userChatService.user.Username;
  $scope.image = userChatService.user.Image
  console.log($scope.username)

  
  $scope.sendMessageChat = function(){
    var ref = new Firebase('https://sparke.firebaseio.com/')
    ref.onAuth(function(authData) {
        var obj = $firebaseArray(ref.child("UsersAuthInfo").child(authData.uid).child("Friends"))
          console.log(obj)
    })
  }
}])
