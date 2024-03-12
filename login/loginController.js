function loginController($scope, $location, UserService) {
 //function for login
 $scope.login = function () {
  console.log("Login form data: ", $scope.loginFormData);
  UserService.login($scope.loginFormData)
   .then(function (response) {
    console.log("Login response: ", response);
   })
   .catch(function (error) {
    console.log("Error logging in: ", error);
    $scope.loginForm.errorMessage = error.data.message;
   });
 };
}

trackflow.controller("loginController", [
 "$scope",
 "$location",
 "UserService",
 loginController,
]);
