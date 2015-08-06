$(document).ready(function() {
    $('.collapse').on('shown.bs.collapse', function(){
        $(this).parent().find(".glyphicon-plus").removeClass("glyphicon-plus").addClass("glyphicon-minus");
    }).on('hidden.bs.collapse', function(){
        $(this).parent().find(".glyphicon-minus").removeClass("glyphicon-minus").addClass("glyphicon-plus");
    });
    console.log("written");
});

var app = angular.module("sampleApp", ["firebase", "ngFileUpload", "ngResource", "ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
            $routeProvider.
                    when('/upload', {
                        templateUrl: 'upload.html',
                        controller: 'uploadCtrl'
                    }).
                    when('list', {
                        templateUrl: './partials/list.html',
                        controller: 'ListCtrl'
                    });
            //$locationProvider.html5Mode(true);
});

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
        $scope.productsList = snapshot.val();
        productsList = $scope.productsList;


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
     var productsListTrans, kCity;

    $scope.messages = $firebaseArray(ref);

    $scope.selectAction = function() {
        console.log($scope.tFrom);
    };
    
    ref.child("Product").on("value", function (snapshot) {
        $scope.productsListTrans = snapshot.val();
        console.log($scope.productsListTrans);
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
        if ($scope.tDate) {
            console.log("Reached Add Transfer Controller if statement!")
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
     //TBD
});




//Upload Controller
var uploadCtrl = app.controller('addUploadCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
    $scope.$watch('file', function () {
        $scope.upload([$scope.file]);
    });
    $scope.log = '';

    console.log("I'm in the upload part!");

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                    fields: {
                        'username': $scope.username
                    },
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.log = 'progress: ' + progressPercentage + '% ' +
                                evt.config.file.name + '\n' + $scope.log;
                }).success(function (data, status, headers, config) {
                    $timeout(function() {
                        $scope.log = 'file: ' + config.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                    });
                });
            }
        }
    };
}]);