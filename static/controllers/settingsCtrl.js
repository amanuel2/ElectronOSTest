app.controller('settingsCtrl', ["$scope", "$firebaseArray", "$firebaseObject", function($scope, $firebaseArray,$firebaseObject) {
                ///////////////////////////////////*****SETTING UP PROFILE INFO***/////////////////////////////////////////////
                var ref = new Firebase('https://sparke.firebaseio.com/')
                console.log("Here")
                ref.onAuth(function(authData){
                        $scope.profile = $firebaseObject(ref.child("UsersAuthInfo").child(authData.uid))
                        console.log($scope.profile)
                })
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////*****CHANGING EMAIL****//////////////////////////////////////////////////
            $scope.changeEmail = function(){
                ref.onAuth(function(authData) {
                    var check = $firebaseArray(ref.child("UsersAuthInfo").child(authData.uid))

                    check.$loaded(function(data){
                        console.log(data)
                        if(data.Email==data[1].$value){
                            console.log("Changing...")
                            // ref.child("UsersAuthInfo").child(authData.uid).update({
                            //      Email: $scope.newEmailChangeEmail
                            //  })

                        }
                        else{
                            alertify.error('Wrong Email or Password');
                        }
                    })
                    /**
                     * Changing from logged in view
                     */


                })

            }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        }]
    )
