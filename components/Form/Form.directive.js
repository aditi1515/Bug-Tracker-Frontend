trackflow.directive("formBuilder", function () {
 return {
  restrict: "E",
  scope: {
   formStructure: "=",
   formModel: "=",
   onSubmit: "&",
   modalId: "@",
  },
  templateUrl: "../components/Form/Form.html",
  controller: function ($scope) {
   // Function to handle field initialization
   $scope.initField = function (subformName, fieldName) {
    if (!$scope.formModel[subformName]) {
     $scope.formModel[subformName] = {};
    }
    if (!$scope.formModel[subformName][fieldName]) {
     $scope.formModel[subformName][fieldName] = "";
    }
   };
   $scope.submitForm = function () {
    // Call the onSubmit function passed from the parent component
    console.log($scope.onSubmit);
    if (angular.isFunction($scope.onSubmit)) {
     // Call the onSubmit function with the modalId as an argument
     console.log($scope.modalId);
     $scope.onSubmit({modalId : $scope.modalId});
    }
   };
  },
 };
});
