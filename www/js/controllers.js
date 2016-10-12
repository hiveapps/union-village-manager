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
    document.getElementById('displayName').textContent = user.displayName;
  } else {
    console.log("User is logged out");
    $state.go('unionVillage.home');
  };

  
  //This is called when a user clicks the 'Sign Up' button
  $scope.register = function(email, password, displayName, photoURL){

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error);

    });
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        user.updateProfile({
          displayName: $scope.firstName + ' ' + $scope.lastName
        }).then(function() {
          // Update successful.
          //document.getElementById('displayName').textContent = user.displayName;
          console.log(user.displayName);
          //document.getElementById('displayName').textContent = user.displayName;
          //document.getElementById('displayName').textContent = user.displayName;
        }, function(error) {
          // An error happened.
          console.log(error);
        });
      } else {
        // No user is signed in.
      }
    });

  };
  
  $scope.login = function(email, password){
    var user = firebase.auth().currentUser;
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
        document.getElementById('displayName').textContent = user.displayName;
      };
    });
    
  };
  
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
    $scope.addItem = function () {
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
    
});


unionVillage.controller("gamblingCtrl", function($scope, $firebaseArray, $timeout) {

    /* Add posts */
    $scope.addItem = function () {
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
    $scope.addItem = function () {
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


unionVillage.controller("testCtrl", function($scope) {
    
    /* Add posts */
    $scope.addItem = function () {};

    
});