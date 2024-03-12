trackflow.directive("sidebar", function () {
 return {
  restrict: "E",
  scope: {
   profile: "=",
   options: "=",
  },
  templateUrl: "../components/sidebar/sidebar.html",
  controller: function ($scope, $location) {
   $scope.expanded = false;

   $scope.toggle = function () {
    $scope.expanded = !$scope.expanded;
   };
  },
 };
});
