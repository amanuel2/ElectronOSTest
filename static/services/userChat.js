////////////////////////////////////////////********KEEP NOTE SAME THING AS USER.JS...//////////////////////////
//////////////////////////////////////////// THIS IS JUST FOR THE CHAT.../////////////////////////////
app.service('userChatService', function($rootScope){
        this.user = {
            Username:'',
            BackImage: '',
            Email: '',
            Image: '',
            UID: 0,
        }
        this.setProfileInfo = function(Username, BackImage, Email, Image, UID){
            this.user.Username = Username;
            this.user.Email = Email;
            this.user.BackImage = BackImage;
            this.user.Image = Image;
            this.user.UID = UID
        }
});
