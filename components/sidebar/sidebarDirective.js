trackflow.directive("sidebar", function () {
 return {
  restrict: "E",
  scope: {
   profile: "=",
   options: "=",
  },
  templateUrl: "../components/sidebar/sidebar.html",
  controller: function ($scope, $location) {
   $scope.expanded = true;

   $scope.toggle = function () {
    $scope.expanded = !$scope.expanded;
   };
  },
 };
});
