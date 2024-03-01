function loginController($scope, $location) {
  $scope.login = function () {
    $location.path("/dashboard");
  };
}

trackflow.controller("loginController", [
  "$scope",
  "$location",
  loginController,
]);
