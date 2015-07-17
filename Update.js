var app = angular.module("sampleApp", ["firebase"]);
app.controller("UpdateCtrl", function ($scope, $firebaseArray) {

    var ref = new Firebase("https://inven.firebaseio.com");

    $scope.messages = $firebaseArray(ref);

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
