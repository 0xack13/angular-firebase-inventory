var app = angular.module("sampleApp", ["firebase"]);

app.controller("ListCtrl", function ($scope, $firebaseArray) {
    var productsList;
    var ref = new Firebase("https://inven.firebaseio.com");

    $scope.messages = $firebaseArray(ref);

    ref.child("Product").on("value", function (snapshot) {

        $scope.productsList = snapshot.val();
        productsList = $scope.productsList;

        angular.forEach(productsList, function (value, key) {

            console.log("The product details of " + key 
                        + " is : Description = " + value.Description 
                        + ", Stock = " + value.Stock             
                       );
            
        });
    });
});