var app = angular.module("sampleApp", ["firebase"]);
      app.controller("AddCtrl", function($scope, $firebaseArray) {

        var ref = new Firebase("https://inven.firebaseio.com");
      
        $scope.messages = $firebaseArray(ref);
        $scope.userType = "guest123";
        //$scope.stockPerProduct;
        
        var stockPerProduct = 99999;
        
        var tDate = $scope.tDate;
        var tFrom = $scope.From;
        var tQuantity = $scope.Quantity;
        var tTo = $scope.To;
        var TransID = $scope.TransID;
        
        var pushRef = ref.child("user/user1");
        pushRef.update({
          user1: $scope.userType,
            test: "test 123",
            age: "286"
        });
        
        $scope.submit = function() {
          console.log("submit:" + tDate);
        if ($scope.tDate) {
          var stockRef = ref.child("Product/Prod1/Locations/Jeddah/Transfers/");
              stockRef.push({
                "Date" : tDate,
                "From" : tFrom,
                "Quantity" : tQuantity,
                "To" : tTo,
                "TransID" : TransID
              });
        }
      };
        
        
      });

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
              //console.log("product val: " + snapshot.val());
              //alert(snapshot.val());
              //$scope.mydateVal = $scope.val.Date;
              //console.log("Products: " + prod1Locatoins.Locations.Jeddah.Transfers.Transfer1.Date);
              
              var stockPerProduct = 0;
              angular.forEach(prod1Locatoins.Locations, function(value, key) {
                        //this.push(key + ': ' + value);
                  console.log(key + " " + value);
                  console.log("the stock in " + key + " is : " + value.stock);
                  stockPerProduct = stockPerProduct + value.stock;
              });
              
              console.log("Total stock per product = " + stockPerProduct);
              
              //var st = 45;
          
              var stockRef = ref.child("Product/Prod1/Stock");
              stockRef.update({
                "Stock" : stockPerProduct  
              });
             
              $scope.totStock = stockPerProduct;
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