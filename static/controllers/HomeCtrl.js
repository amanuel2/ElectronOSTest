app.controller('HomeCtrl', ["$scope","ref",
  function($scope,ref){
    var refFire = ref.getRef();
    $scope.toggle = function(){
      if($scope.emailLogin && $scope.passwordLogin){
        refFire.authWithPassword({
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
       if($scope.usernameRegister && $scope.emailRegister && $scope.passwordRegister){


                     refFire.createUser({
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
                                 refFire.onAuth(function(authData) {
                                     refFire.child("Users Auth Info").child(userData.uid).set({
                                         Username: $scope.usernameRegister,
                                         Email: $scope.emailRegister,
                                         UID: userData.uid
                                     })
                                 })

                                 swal("Nice!", "Now Login " + $scope.usernameRegister, "success");
                                  window.location.hash="/chat"

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
     $scope.login = function(){
       console.log("FDS")
     }
  }]
)
