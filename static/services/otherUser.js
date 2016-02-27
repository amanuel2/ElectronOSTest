app.service('otherUserService', function($rootScope){
        this.user = {
            Username:'',
            BackImage: '',
            Email: '',
            Image: '',
            UID: 0,
        }
        this.setProfileInfo = function(Username, Email, BackImage, Image, UID){
            this.user.Username = Username;
            this.user.Email = Email;
            this.user.BackImage = BackImage;
            this.user.Image = Image;
            this.user.UID = UID
        }
});
