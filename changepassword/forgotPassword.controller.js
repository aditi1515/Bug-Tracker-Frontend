function ForgotPasswordController($scope, UserService) {
  $scope.forgotPasswordSubmit = function (forgotPasswordForm) {
    console.log($scope.forgotPassword.email);
    UserService.forgotPassword($scope.forgotPassword)
      .then(function (response) {
        console.log("forgotPassword response", response);
      })
      .catch(function (error) {
        console.log("Error in changing password: ", error);
        $scope.forgotPasswordForm.errorMessage = error.data.message;
      });
  };
}

trackflow.controller("ForgotPasswordController", [
  "$scope",
  "UserService",
  ForgotPasswordController,
]);
