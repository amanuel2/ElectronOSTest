app.controller('chatRoomCtrl', ["$scope", "otherUserService", "$stateParams", "$rootScope", "$firebaseArray", "$firebaseObject", function($scope,
    otherUserService, $stateParams, $rootScope, $firebaseArray, $firebaseObject) {
    var ref = new Firebase('https://sparke.firebaseio.com/');

    ref.onAuth(function(authData) {
        //////////////////////////////////////////////**************GETTING CHAT UID PARAMS***********/////////////////////////////////////////////////
        var userClick = $firebaseArray(ref.child("UserClick").child(authData.uid).child("friend"))

        userClick.$loaded(function(data) {
            console.log(data[0].$value)
            $scope.otherUser = data[0].$value
            var search = $firebaseArray(ref.child("UsersAuthInfo").child(authData.uid).child("Friend").child($scope.otherUser).child(
                "friend"))

            search.$loaded(function(data) {
                console.log(data[1].$value)
                $scope.stateChatUID = data[1].$value;
                console.log($scope.stateChatUID)

                $scope.chat = $firebaseArray(ref.child("ChatRoom").child($scope.stateChatUID))
                console.log($scope.chat)

            })



        })
    })

    $scope.sendMessageChat = function() {
        ref.onAuth(function(authData) {
            ref.child("UsersAuthInfo").child(authData.uid).on("value", function(snapshot) {
                var pushChat = ref.child("ChatRoom").child($scope.stateChatUID).push({
                    Name: snapshot.val().Username,
                    Textvalue: $scope.chatTextValue,
                    Image: snapshot.val().Image,
                    Key: ''
                });

                ref.child("ChatRoom").child($scope.stateChatUID).child(pushChat.key()).update({
                    Key: pushChat.key()
                });
            })
        })

    }

    $scope.editChat = function(info, postID, name, textValue) {
        ref.onAuth(function(authData) {
            ref.child("UsersAuthInfo").child(authData.uid).on("value", function(snapshot) {
                if (name != snapshot.val().Username) {
                    alertify.error('This is not your post!');
                }
                else {
                    swal({
                        title: "Edit",
                        text: "What do you want to change to?",
                        type: "input",
                        showCancelButton: true,
                        closeOnConfirm: true,
                        animation: "slide-from-top",
                        inputPlaceholder: "New Chat...."
                    }, function(inputValue) {
                        if (inputValue === false) return false;
                        if (inputValue === "") {
                            swal.showInputError("You need to write something!");
                            return false
                        }

                        ref.child("ChatRoom").child($scope.stateChatUID).child(postID).update({
                            Textvalue: inputValue
                        }, function(error) {
                            if (error) {
                                sweetAlert("Oops...", "Error: " + error, "error");
                            }
                            else {
                                alertify.success('Success You Wrote' + inputValue);
                            }
                        })

                    });
                }
            });
        })




    }


}])
