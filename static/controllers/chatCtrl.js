app.controller('chatCtrl', ["$scope","userChatService", "$mdDialog", "userService", "$firebaseArray", "$firebaseObject", function($scope,userChatService, $mdDialog, userService, $firebaseArray,
        $firebaseObject) {

        var ref = new Firebase('https://sparke.firebaseio.com/')
        ref.onAuth(function(authData) {
            $scope.friends = $firebaseArray(ref.child("UsersAuthInfo").child(authData.uid).child("Friends"))
              console.log($scope.friends)
        })


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

        var search = $firebaseArray(ref.child("Users"))
        $scope.arrayOfPeopleWithImages = []

        search.$loaded(function(data) {
            console.log(data)
            for (var i = 0; i <= search.length - 1; i++) {
                name = search[i].$id;
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

            /////////////////////////SHOWING FRIENDS////////////////////////////////


        }, function(error) {
            console.error("Error: " + error)
        })

        $scope.toChat = function(username,email,image,backimage,uid){
          console.log(username,email,image,backimage,uid)
          userChatService.setProfileInfo(username,backimage,email,image,uid)
          window.location.hash="chat/chatRoom"
        }

        $scope.dialog = function(user, ev) {
            userService.setProfileInfo(user.name, user.backimage, user.email, user.image, user.uid)

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

    }])
    //imageProfile
