app.controller('HomeCtrl', ["$scope",
  function($scope){

    var ref = new Firebase('https://sparke.firebaseio.com/')
    $scope.toggle = function(){
      if($scope.emailLogin && $scope.passwordLogin){
        ref.authWithPassword({
                      "email": $scope.emailLogin,
                      "password": $scope.passwordLogin
                  }, function(error, authData) {
                      if (error) {
                          sweetAlert("Oops...", error, "error");
                          console.log(error)
                      }
                      else {
                          console.log(authData)
                          window.location.hash="/chat"
                      }
              });
      }
      else{
        sweetAlert("Oops...", "Make sure you fill out all the form", "error");
      }
     }

     $scope.register = function(){
       $scope.profileImage = 'http://png.clipart.me/graphics/thumbs/151/man-avatar-profile-picture-vector_151265384.jpg'
       $scope.backImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLtuJNHdOwoxaJplO7QBaf9OLU56025HSQqfkra8IsY2Is8XTe'
       if($scope.usernameRegister && $scope.emailRegister && $scope.passwordRegister){
                     ref.createUser({
                         email: $scope.emailRegister,
                         password: $scope.passwordRegister,
                         username: $scope.usernameRegister
                     }, function(error, userData) {
                         if (error) {
                             switch (error.code) {
                                 case "EMAIL_TAKEN":
                                     sweetAlert("Oops...", "The new user account cannot be created because the email is already in use.", "error");
                                     break;
                                 case "INVALID_EMAIL":
                                     sweetAlert("Oops...", "The specified email is not a valid email.", "error");
                                     break;
                                 default:
                                     sweetAlert("Oops...", error, "error");
                                     console.log(error)
                             }
                         }
                         else {
                                 ref.onAuth(function(authData) {
                                     ref.child("UsersAuthInfo").child(userData.uid).set({
                                         Username: $scope.usernameRegister,
                                         Email: $scope.emailRegister,
                                         UID: userData.uid,
                                         Image: 'http://png.clipart.me/graphics/thumbs/151/man-avatar-profile-picture-vector_151265384.jpg',
                                         BackImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLtuJNHdOwoxaJplO7QBaf9OLU56025HSQqfkra8IsY2Is8XTe'
                                     })
                                 })

                                 swal("Nice!", "Now Login " + $scope.usernameRegister, "success");

                             }
       });
     }
       else{
         sweetAlert("Oops...", "Make sure you fill out all the form", "error");
       }
   }

     $scope.toggleClass = function(){
        $scope.enabled = true;
      }
     $scope.close = function(){
       $scope.enabled = false;
     }
  }]
)
