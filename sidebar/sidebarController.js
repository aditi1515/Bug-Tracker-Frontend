function sideBarController($scope, $location) {
  $scope.isLoginPage = function () {
    return $location.path == "/login";
  };
}

trackflow.controller("sideBarController", [
  "$scope",
  "$location",
  sideBarController,
]);
