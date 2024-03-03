function loginController($scope, $location, UserService) {
 $scope.login = function () {
  $location.path("/dashboard");
 };

 $scope.login = function () {
  console.log("Login form data: ", $scope.loginFormData);
  UserService.login($scope.loginFormData);
 };
}

trackflow.controller("loginController", [
 "$scope",
 "$location",
 "UserService",
 loginController,
]);
