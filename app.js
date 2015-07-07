 var app = angular.module("sampleApp", ["firebase"]);
      app.controller("SampleCtrl", function($scope, $firebaseArray) {

        var ref = new Firebase("https://inven.firebaseio.com");
      
        $scope.messages = $firebaseArray(ref);
        ref.child("user/user1").on("value", function(snapshot) {
          //alert(snapshot.val());  // Alerts "San Francisco"
          $scope.val = snapshot.val();
          console.log($scope.val.age);
        });
          

        var updateRef = ref.child("user/user1");
        updateRef.update({
          user1: "Saleh Albatati 9999",
            test: "test 123",
            age: "28"
        });
          
        
        ref.child("user/z1");
        ref.update({
          "z1": "Ali Alhamed"
        });
          
        
          
          ref.child("Product/Prod1/").on("value", function(snapshot) {
              $scope.val = snapshot.val();
              $scope.val3 = snapshot.val();
              $scope.val2 = snapshot.child("Locations").val();
              console.log("Child of Child: " + snapshot.child("Locations").val());
              
              var prod1Locatoins = snapshot.val();
              console.log("product val: " + snapshot.val());
              //alert(snapshot.val());
              //$scope.mydateVal = $scope.val.Date;
              console.log("Products: " + prod1Locatoins.Locations.Jeddah.Transfers.Transfer1.Date);
              
             
              
              $scope.products = snapshot.val();
              
              
          });

        var namePath = ref.child("user/user3/name");
        var path = namePath.toString();
        ref.update({ midle: 'Jaffer' });
        $scope.path = path;
        // Same as the previous example, except we will also display an alert
        // message when the data has finished synchronizing.
        var onComplete = function(error) {
          if (error) {
            console.log('Synchronization failed');
          } else {
            console.log('Synchronization succeeded');
          }
        };
        ref.child("user/user3/name");
        ref.update({ midle: 'Wilma' }, onComplete);


      });