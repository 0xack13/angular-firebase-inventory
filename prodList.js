var app = angular.module("sampleApp", ["firebase"]);


/*
Multiple Controllers:
    - List
    - Add
    - Delete
    - Update

*/

//Creating multpile controllers for each function
app.controller("ListCtrl", function ($scope, $firebaseArray) {
    var productsList;
    $scope.query = '';
    var ref = new Firebase("https://inven.firebaseio.com");

    $scope.messages = $firebaseArray(ref);

   


    ref.child("Product").on("value", function (snapshot) {
        console.log("Snapshot: " + snapshot.val());
        $scope.$apply(function() {
            $scope.productsList = snapshot.val();
            productsList = $scope.productsList;
        });


        angular.forEach(productsList, function (value, key) {
            console.log("The product details of " + key 
                        + " is : Description = " + value.Description 
                        + ", Stock = " + value.Stock             
                       );
        });
    });

})
.filter('toArray', function () {
    'use strict';

    return function (obj) {
        if (!(obj instanceof Object)) {
            return obj;
        }

        return Object.keys(obj).map(function (key, value) {
            return Object.defineProperty(obj[key], '$key', {__proto__: null, value: key});
            
        });
    }
});


var addTransferCtrl = app.controller("addTransferCtrl", function ($scope, $firebaseArray) {
     var ref = new Firebase("https://inven.firebaseio.com");
     var productsList, kCity;

    $scope.messages = $firebaseArray(ref);

    $scope.selectAction = function() {
        console.log($scope.tFrom);
    };
    
    ref.child("Product").on("value", function (snapshot) {
        $scope.productsList = snapshot.val();
        console.log($scope.productsList);
        $scope.messages = $firebaseArray(ref);
        $scope.userType = "guest123";
    });

    ref.child("Cities").on("value", function (snapshot) {
        $scope.cities = snapshot.val();
        console.log($scope.cities.id);
    });

    /*
    var item = {
        user1: "user11",
        test: "test 111",
        age: "111",
        newage: 34344
    }; */

    //Update the "user1" child node with the new item json structure
    //console.log(ref.child('user').child("user1").update(item));
    
    //Remove the user1 node "complete node"
    //ref.child('user').child("user1").remove();

    /*
    var pushRef = ref.child("user/user1");
    pushRef.update({
        user1: $scope.userType,
        test: "test 123",
        age: "286"
    });
    */

    $scope.filterToCity = function (kToCity) {
        console.log("Filter: " + kToCity);
        return "Hello";
    }

    $scope.submit = function () {
        var tDate = $scope.tDate;
        var tFrom = $scope.tFrom;
        var tQuantity = $scope.tQuantity;
        var tTo = $scope.tTo;
        var TransID = $scope.TransID;
        var tProduct = $scope.tProduct;
        console.log("tDate:" + tDate);
        if ($scope.tDate && (tTo !== tFrom)) {
            var stockRef = ref.child("Product/" + tProduct + "/Locations/" + tFrom + "/Transfers/");
            var tDate = $scope.tDate;
            stockRef.push({
                "Date": tDate,
                "From": tFrom,
                "Quantity": tQuantity,
                "To": tTo,
                "TransID": TransID
            });
        }
    };
});


//Delete Controller
var deleteCtrl = app.controller("deleteCtrl", function ($scope, $firebaseArray) {
     var ref = new Firebase("https://inven.firebaseio.com");

});


//Delete Controller
var updateCtrl = app.controller("updateCtrl", function ($scope, $firebaseArray) {
     var ref = new Firebase("https://inven.firebaseio.com");

});


var addProductCtrl = app.controller("addProductCtrl", function ($scope, $firebaseArray) {
     var ref = new Firebase("https://inven.firebaseio.com");
     var productsList, kCity;

    $scope.messages = $firebaseArray(ref);

    $scope.selectAction = function() {
        console.log($scope.tFrom);
    };
    
    ref.child("Product").on("value", function (snapshot) {
        $scope.productsList = snapshot.val();
        console.log($scope.productsList);
        $scope.messages = $firebaseArray(ref);
        $scope.userType = "guest123";
    });

    ref.child("Cities").on("value", function (snapshot) {
        $scope.cities = snapshot.val();
        console.log($scope.cities.id);
    });

    $scope.filterToCity = function (kToCity) {
        console.log("Filter: " + kToCity);
        return "Hello";
    }

    $scope.submit = function () {
        var tDate = $scope.tDate;
        var tFrom = $scope.tFrom;
        var tQuantity = $scope.tQuantity;
        var tTo = $scope.tTo;
        var TransID = $scope.TransID;
        var tProduct = $scope.tProduct;
        console.log("tDate:" + tDate);
        if ($scope.tDate && (tTo !== tFrom)) {
            var stockRef = ref.child("Product/" + tProduct + "/Locations/" + tFrom + "/Transfers/");
            var tDate = $scope.tDate;
            stockRef.push({
                "Date": tDate,
                "From": tFrom,
                "Quantity": tQuantity,
                "To": tTo,
                "TransID": TransID
            });
        }
    };
});