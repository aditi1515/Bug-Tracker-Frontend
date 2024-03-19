trackflow.directive("sidebar", [
 "UserService",
 function (UserService) {
  return {
   restrict: "E",
   scope: {
    profile: "=",
    options: "=",
    companyLogo: "@",
    companyName: "@",
   },
   templateUrl: "../components/sidebar/sidebar.html",
   controller: function ($scope, $location) {
    $scope.expanded = true;

    $scope.toggle = function () {
     $scope.expanded = !$scope.expanded;
    };

    $scope.logout = function () {
     UserService.logout()
      .then(function () {
       console.log("Logged out successfully");
      })
      .catch(function (error) {
       console.error("Logout error:", error);
      });
    };
   },
  };
 },
]);
