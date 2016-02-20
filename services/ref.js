app.service('ref',["$firebaseAuth", function($firebaseAuth){
        this.getRef = function(){
          var ref = new Firebase('https://sparke.firebaseio.com/')
          return ref;
        }
        this.getAuthRef = function(){
          var ref = new Firebase('https://sparke.firebaseio.com/')
          return $firebaseAuth(ref);
        }
}]
);
