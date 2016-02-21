app.controller('chatCtrl', ["$scope","$firebaseObject", function($scope,$firebaseObject) {


        var ref = new Firebase('https://sparke.firebaseio.com/')
        var syncObject = $firebaseObject(ref);
        $scope.usernameProfile = ''
        $scope.imageProfile = ''


        ref.onAuth(function(authData) {
            ref.child("UsersAuthInfo").child(authData.uid).on("value", function(snapshot) {
                $scope.usernameProfile = snapshot.val().Username;
                $scope.imageProfile = snapshot.val().Image
                console.log(snapshot.val().Image)
                console.log(snapshot.val())
                console.log($scope.usernameProfile)
                var username = $scope.usernameProfile
                console.log($scope.imageProfile)
            })
        })



console.log($scope.data)
        console.log($scope.usernameProfile)
        console.log($scope.imageProfile)

    }])
