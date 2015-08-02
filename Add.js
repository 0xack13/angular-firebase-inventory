var app = angular.module("sampleApp", ["firebase"]);
app.controller("AddCtrl", function ($scope, $firebaseArray) {

    var ref = new Firebase("https://inven.firebaseio.com");

    $scope.messages = $firebaseArray(ref);
    $scope.userType = "guest123";
    
    /*var item = {
        user1: "user11",
        test: "test 111",
        age: "111",
        newage: 34344
    };*/

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
    $scope.submit = function () {
        var tDate = $scope.tDate;
        var tFrom = $scope.tFrom;
        var tQuantity = $scope.tQuantity;
        var tTo = $scope.tTo;
        var TransID = $scope.TransID;
        console.log("tDate:" + tDate);
        if ($scope.tDate) {
            var stockRef = ref.child("Product/Prod1/Locations/Jeddah/Transfers/");
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