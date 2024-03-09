function loginController($scope, $location, UserService) {
  //function for login
  $scope.login = function () {
    console.log("Login form data: ", $scope.loginFormData);
    UserService.login($scope.loginFormData);
    $location.path("/dashboard");
  };
}

trackflow.controller("loginController", [
  "$scope",
  "$location",
  "UserService",
  loginController,
]);
