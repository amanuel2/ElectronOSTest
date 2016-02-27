function DialogController($scope, $mdDialog, otherUserService,$firebaseObject) {
      var ref = new Firebase('https://sparke.firebaseio.com/');
      console.log(otherUserService.user)
      ////////////******SET THE USER INFO SO USER APEARS ON TAB*****///////
      $scope.user = otherUserService.user
      ////////////////////////*****THIS IS THE OTHER USER****////////

      $scope.addFriend = function(){
      /////////////////***ADD THE OTHER USER ON THE USER LOGGED IN***////
        ref.onAuth(function(authData){
          var logedUserAdd = $firebaseObject(ref.child("UsersAuthInfo").child(authData.uid).child("Friend").child($scope.user.Username))
          logedUserAdd.friend = {
            Username : $scope.user.Username,
            Email: $scope.user.Email,
            Image: $scope.user.Image,
            BackImage: $scope.user.BackImage,
            UID: $scope.user.UID,
            ChatUID: $scope.user.UID
          }
          logedUserAdd.$save().then(function(ref) {
              }, function(error) {
                console.log("Error:", error);
              });

        })
      /////////////////////////////////////////////////////////////////
      ////////////////////////////////////******TEST SETTINGS*********/////////////

      this.settings = {
      printLayout: true,
      showRuler: true,
      showSpellingSuggestions: true,
      presentationMode: 'edit'
    };
    this.sampleAction = function(name, ev) {
      $mdDialog.show($mdDialog.alert()
        .title(name)
        .textContent('You triggered the "' + name + '" action')
        .ok('Great')
        .targetEvent(ev)
      );
    };




      //////////////////////////////////////////////////////////////////////////////
      ///////////////////////***OTHER USER LOGGED IN ADDS LOGGED IN USER***/////////////////////


      ref.onAuth(function(authData) {
          var logged = $firebaseObject(ref.child("UsersAuthInfo").child(authData.uid));
            logged.$loaded(function(data) {
              console.log(data.Username)
              console.log($scope.user.UID)
              var otherUserAdd = $firebaseObject(ref.child("UsersAuthInfo").child($scope.user.UID).child("Friend").child(data.Username))
          otherUserAdd.friend = {
            Username : data.Username,
            Email: data.Email,
            Image: data.Image,
            BackImage: data.BackImage,
            UID: data.UID,
            ChatUID: $scope.user.UID.concat(authData.uid)
          }
          otherUserAdd.$save().then(function(data) {
            ///////////////////******SETTING UP THE CHAT WHEN USER ADDED****//////////////////////////
            ref.onAuth(function(authData) {
                  var chat = $firebaseObject(ref.child("ChatRoom").child($scope.user.UID))

                  chat.uselessData = {
                    uselessData: "Dont be afraid to talk!"
                  }
                  chat.$save().then(function(ref) {

                      }, function(error) {
                        console.log("Error:", error);
                      });
              })
              }, function(error) {
                console.log("Error:", error);
              });
            });


        ////////////////////////////////////////////////////////////////////////////////////////////
      })




      $scope.hide = function() {
      $mdDialog.hide();
  };
  $scope.cancel = function() {
      $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
      $mdDialog.hide(answer);
  };
      }

};
