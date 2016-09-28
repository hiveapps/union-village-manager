var unionVillage = angular.module('unionVillage.controllers', []);

/* !!!FIREBASE 3.0!!! Initialize Firebase */
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDEQLgoUIz4JcggXiURBVPylAq0pJYrgi0",
    authDomain: "temporaryuv.firebaseapp.com",
    databaseURL: "https://temporaryuv.firebaseio.com",
    storageBucket: "temporaryuv.appspot.com",
    messagingSenderId: "1020616732436"
  };
  firebase.initializeApp(config);
  
  // Get a reference to the storage service, which is used to create references in your storage bucket
  var storage = firebase.storage();
  
  // Create a storage reference from our storage service
  var storageRef = storage.ref();

unionVillage.controller("headerCtrl", function($scope, $location) {
  $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
  $('.navbar-collapse a:not(.dropdown-toggle)').click(function(){
    $(".navbar-collapse").collapse('hide');
  });
});

//Totally functioning simple login
unionVillage.controller("LoginCtrl", function($scope, $state){
  
  //This is going to get and log the user status, this could be copied and/or used for the beginning framework to build
  //a functioning profile page
  var user = firebase.auth().currentUser;

  if (user) {
    console.log("User is logged in");
    $state.go('unionVillage.dashboard');
  } else {
    console.log("User is logged out");
    $state.go('unionVillage.home');
  };
  
  // THIS DOESN'T WORK, NEED TO FIX FOR FIREBASE 3.X.X
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
  
  $scope.login = function(email, password){
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        console.error(error);
      }
      // [END_EXCLUDE]
    });
    // [END authwithemail]
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        $state.go('unionVillage.dashboard');
      };
    });
    
    if (user != null) {
      user.providerData.forEach(function (profile) {
        console.log("Sign-in provider: "+profile.providerId);
        console.log("  Provider-specific UID: "+profile.uid);
        console.log("  Name: "+profile.displayName);
        console.log("  Email: "+profile.email);
        console.log("  Photo URL: "+profile.photoURL);
      });
    };
  };
  
  /* THIS DOESN'T WORK, NEED TO FIX FOR FIREBASE 3.X.X *
  ref.onAuth(function(authData) {
    if (authData && isNewUser) {
      // save the user's profile into the database so we can list users,
      // use them in Security and Firebase Rules, and show profiles
      ref.child("users").child(authData.uid).set({
        provider: authData.provider,
        email: getName(authData)
      });
    }
  });*
  
  // THIS DOESN'T WORK, NEED TO FIX FOR FIREBASE 3.X.X
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
  
  /*Logout Functionality */
  $scope.logout = function() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }, function(error) {
      // An error happened.
    });
    $state.go('unionVillage.home');
  };
  
});



/*Thread Page Controller */
unionVillage.controller("dashboardCtrl", function($scope, $firebaseArray, $timeout) {

    /* Get Stored Posts */
    var ratesRef = firebase.database().ref('notificationCenter');
  
    ratesRef.on("value", function (snapshot) {
      $timeout(function () {
        update(snapshot);
        console.log(snapshot);
      });
    });
    
    function update (snapshot) {
      $scope.todos = $firebaseArray(ratesRef);
      //$scope.todos = firebase.database().ratesRef;
    };
    
    /* Add posts */
    $scope.addItem = function writeUserData(userId, name, email) {
      var timestamp = new Date().valueOf()
      
      firebase.database().ref('notificationCenter').push({
        id: timestamp,
        description: $scope.postDescription,
        liked: false
      });
      
      $scope.postDescription = "";
    };
    
});


/* My Neighbors Controllers */
unionVillage.controller("restaurantsCtrl", function($scope, $firebaseArray, $timeout) {
    var selected_file = $('#input').get(0).files[0];
    var nBytes = 0;
    
    /* Add posts */
    $scope.addItem = function writeUserData(userId, name, email) {
      var timestamp = new Date().valueOf()
      
      firebase.database().ref('restaurants').push({
        id: timestamp,
        header: $scope.postHeader,
        description: $scope.postDescription,
        liked: false
      });
      
      $scope.postHeader = "";
      $scope.postDescription = "";

    };

    // Create a root reference
    var storageRef = firebase.storage().ref();

    // Create a reference to 'mountains.jpg'
    var mountainsRef = storageRef.child('mountains.jpg');

    // Create a reference to 'images/mountains.jpg'
    var mountainImagesRef = storageRef.child('images/mountains.jpg');

    // While the file names are the same, the references point to different files
    mountainsRef.name === mountainImagesRef.name            // true
    mountainsRef.fullPath === mountainImagesRef.fullPath    // false
    
});


unionVillage.controller("gamblingCtrl", function($scope, $firebaseArray, $timeout) {

    /* Add posts */
    $scope.addItem = function writeUserData(userId, name, email) {
      var timestamp = new Date().valueOf()
      
      firebase.database().ref('gambling').push({
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

    /* Add posts */
    $scope.addItem = function writeUserData(userId, name, email) {
      var timestamp = new Date().valueOf()
      
      firebase.database().ref('sights').push({
        id: timestamp,
        header: $scope.postHeader,
        description: $scope.postDescription,
        liked: false
      });
      
      $scope.postHeader = "";
      $scope.postDescription = "";
    
    };
    
});


unionVillage.controller("imgCtrl", function($scope, $firebaseArray, $timeout) {

    
    
});