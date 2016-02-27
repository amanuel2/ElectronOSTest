app.controller('chatCtrl', ["$scope","otherUserService","$rootScope", "$mdDialog","$state", "$firebaseArray", "$firebaseObject", function($scope,otherUserService,$rootScope, $mdDialog,$state, $firebaseArray,
        $firebaseObject) {

///////////////////////////////////////////////******SHOWING FRIENDS***********////////////////////////////////////////////////////////
        var ref = new Firebase('https://sparke.firebaseio.com/')
        ref.onAuth(function(authData) {
            $scope.friends = $firebaseArray(ref.child("UsersAuthInfo").child(authData.uid).child("Friend"))
              console.log($scope.friends)
        })
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////******SETTING THE INFO*****************///////////////////////////////////////
        ref.onAuth(function(authData) {
            var obj = $firebaseObject(ref.child("UsersAuthInfo").child(authData.uid));
            obj.$loaded(function(data) {
                    $scope.backImageChat = data.BackImage
                    $scope.imageProfile = data.Image
                    $scope.usernameProfile = data.Username;
                    $scope.emailProfile = data.Email
                },
                function(error) {
                    console.error("Error:", error);
                }
            );
        })
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////*****SETTING UP THE SEARCH*****////////////////////////////////////
        var search = $firebaseArray(ref.child("UsersAuthInfo"))
        $scope.arrayOfPeopleWithImages = []
console.log(search)
        search.$loaded(function(data) {

            console.log(data)
            for (var i = 0; i <= search.length - 1; i++) {
                name = search[i].Username;
                image = search[i].Image;
                backimage = search[i].BackImage;
                email = search[i].Email;
                uid = search[i].UID
                $scope.arrayOfPeopleWithImages.push({
                    name: name,
                    image: image,
                    backimage: backimage,
                    email: email,
                    uid: uid
                });
            }

            console.log($scope.arrayOfPeopleWithImages);


        }, function(error) {
            console.error("Error: " + error)
        })
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////******WHEN USER CLICKS ON ANOTHER USER ON SEARCH*********////////////////////
        $scope.dialog = function(user, ev) {
            otherUserService.setProfileInfo(user.name, user.email, user.backimage, user.image, user.uid)

            $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'views/TabDialog/User.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                .then(function(answer) {
                    $scope.status = answer
                    if (answer == 'useful') {
                        swal({
                            title: "Sweet!",
                            text: "We will keep on improving!",
                            imageUrl: "https://image.freepik.com/free-icon/thumb-up_318-82533.png"
                        });
                    }
                    else if ('not useful') {
                        swal({
                            title: "Sorry!",
                            text: "How can we improve?",
                            type: "input",
                            showCancelButton: true,
                            closeOnConfirm: false,
                            imageUrl: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQG3KoV_Iv5Ds-mM4f9J-LfZRyNUi1yiXv7c-zfVlda-Y7IhESExA",
                            animation: "slide-from-top",
                            inputPlaceholder: "How can we improve?"
                        }, function(inputValue) {
                            if (inputValue === false) return false;
                            if (inputValue === "") {
                                swal.showInputError("You need to write something!");
                                return false
                            }
                            swal({
                                title: "Thanks!",
                                text: "Thanks for letting us know! We will improve on that!",
                                imageUrl: "https://image.freepik.com/free-icon/thumb-up_318-82533.png"
                            });
                            console.log("Improvments : " + inputValue)
                        });

                    }
                }, function() {
                    $scope.status = undefined;
                });
        }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////**********GOING TO CHAT*************///////////////////////////////////////////////
        $scope.toChat = function(username,email,image,backimage,uid){
          otherUserService.setProfileInfo(username,backimage,email,image,uid)
          $rootScope.uid = otherUserService.user


          ref.onAuth(function(authData) {
            var userClick = $firebaseObject(ref.child("UserClick").child(authData.uid));

            userClick.friend = {
                Username: otherUserService.user.Username,
            }

          userClick.$save().then(function(ref) {
              }, function(error) {
                console.log("Error:", error);
              });
              console.log(userClick.friend)

              /////////////////////////////////******GETTING CHATUID TO SET AS STATE PARAM****///////////////
              var search = $firebaseArray(ref.child("UsersAuthInfo").child(authData.uid).child("Friend").child(userClick.friend.Username).child("friend"))

              search.$loaded(function(data) {
                  $rootScope.stateChatUID = data[1].$value;
                  console.log($rootScope.stateChatUID)
                  $rootScope.realStateUID = $rootScope.stateChatUID
                  $state.go("chat.chatRoom", { "stateChatUID": $rootScope.stateChatUID})
              })

          })

        }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////****GO TO SETTINGS***********////////////////////////////////////////////////////
$scope.settings = function(){
    $state.go("chat.settings")
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////*************LOGGING OUT***************///////////////////////////////////////

$scope.logout = function(){
                        ref.unauth();
                        location.reload().then(function(error) {
                            if (error)
                                throw error
                        })

}

    }])
