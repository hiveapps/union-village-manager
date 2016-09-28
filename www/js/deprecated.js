/*unionVillage.controller("headerCtrl", function($scope, $location) {
  $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
  $('.navbar-collapse a:not(.dropdown-toggle)').click(function(){
    $(".navbar-collapse").collapse('hide');
  });
});

/* !!!FIREBASE 2.0!!! NEED TO UPDATE TO 3.0 ONCE ANGULAR FIRE IS UPDATED 
//Totally functioning simple login
unionVillage.controller("LoginCtrl", function($scope, $firebaseAuth, $state){
var users = new Firebase("https://temporaryuv.firebaseio.com/");
  
  //This is going to get and log the user status, this could be copied and/or used for the beginning framework to build
  //a functioning profile page
  var status = new Firebase("https://temporaryuv.firebaseio.com/");
  var authData = status.getAuth();
  
  if (authData) {
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
    $state.go('unionVillage.dashboard');
  } else {
    console.log("User is logged out");
    $state.go('unionVillage.home');
  }
  
  //This is called when a user clicks the 'Sign Up' button
  $scope.register = function(username, password){
    users.createUser({
      email    : username,
      password : password
    }, function(error) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        users.authWithPassword({
          email: username,
          password: password
        }, function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
          }
        });
        $scope.username = "";
        $scope.password = "";
        $state.go('unionVillage.dashboard');
      }
    });
  };
  
  //This is called when a user clicks the 'Login' button
  $scope.login = function(username, password){
    users.authWithPassword({
      email    : username,
      password : password
    }, function(error) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        $state.go('unionVillage.dashboard');
      }
    });
  };
  
  
  // we would probably save a profile when we register new users on our app
  // we could also read the profile to see if it's null
  // here we will just simulate this with an isNewUser boolean
  var isNewUser = true;
  
  var ref = new Firebase("https://temporaryuv.firebaseio.com/");
  ref.onAuth(function(authData) {
    if (authData && isNewUser) {
      // save the user's profile into the database so we can list users,
      // use them in Security and Firebase Rules, and show profiles
      ref.child("users").child(authData.uid).set({
        provider: authData.provider,
        email: getName(authData)
      });
    }
  });
  
  // find a suitable name based on the meta info given by each provider
  function getName(authData) {
    switch(authData.provider) {
      case 'password':
        return authData.password.email.replace(/@.*, ''); //add in "/" after "*" when uncommented
      case 'twitter':
        return authData.twitter.displayName;
      case 'facebook':
        return authData.facebook.displayName;
    }
  }
  
  //Logout Functionality
  $scope.logout = function() {
    users.unauth();
    $state.go('unionVillage.home');
  };
  
});



/*Notification Center Controller *
unionVillage.controller("dashboardCtrl", function($scope, $firebaseArray, $timeout) {

var ref = new Firebase("https://temporaryuv.firebaseio.com/");

    // Get Stored Posts
    var ratesRef = new Firebase('https://temporaryuv.firebaseio.com/notificationCenter');
  
    ratesRef.on("value", function (snapshot) {
      $timeout(function () {
        update(snapshot);
        console.log(snapshot);
      });
    });
    
    function update (snapshot) {
      $scope.todos = $firebaseArray(ratesRef);
    };
    
    
    //Submit posts
    var postsRef = ref.child("notificationCenter")
    $scope.addItem = function(){
      
        // Create a unique ID
        var timestamp = new Date().valueOf()
  
        postsRef.push({
          id: timestamp,
          description: $scope.postDescription,
          liked: false
        });
        
        $scope.postDescription = "";
    };
    
    // Update the "like" status to 'liked'
    $scope.changeStatus   = function (item) {

        // Get the Firebase reference of the item
        var itemRef = new  Firebase(ref + item.id);

        // Firebase : Update the item
        itemRef.update({
            id: item.id,
            description : item.description,
        });

    };
    
});



/* My Neighbors Controllers *
unionVillage.controller("restaurantsCtrl", function($scope, $firebaseArray, $timeout) {

var ref = new Firebase("https://temporaryuv.firebaseio.com/");
    
    
    //Submit posts
    var postsRef = ref.child("restaurants")
    $scope.addItem = function(){
      
        // Create a unique ID
        var timestamp = new Date().valueOf()
  
        postsRef.push({
          id: timestamp,
          header: $scope.postHeader,
          description: $scope.postDescription,
          liked: false
        });
        
        $scope.postHeader = "";
        $scope.postDescription = "";
    };
    
});


unionVillage.controller("gamblingCtrl", function($scope, $firebaseArray, $timeout) {

var ref = new Firebase("https://temporaryuv.firebaseio.com/");
    
    
    //Submit posts
    var postsRef = ref.child("gambling")
    $scope.addItem = function(){
      
        // Create a unique ID
        var timestamp = new Date().valueOf()
  
        postsRef.push({
          id: timestamp,
          header: $scope.postHeader,
          description: $scope.postDescription,
          liked: false
        });
        
        $scope.postHeader = "";
        $scope.postDescription = "";
    };
    
});


unionVillage.controller("sightsCtrl", function($scope, $firebaseArray, $timeout) {

var ref = new Firebase("https://temporaryuv.firebaseio.com/");
    
    
    //Submit posts
    var postsRef = ref.child("sights")
    $scope.addItem = function(){
      
        // Create a unique ID
        var timestamp = new Date().valueOf()
  
        postsRef.push({
          id: timestamp,
          header: $scope.postHeader,
          description: $scope.postDescription,
          liked: false
        });
        
        $scope.postHeader = "";
        $scope.postDescription = "";
    };
    
});