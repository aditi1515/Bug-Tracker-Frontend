function ForgotPasswordController($scope, $state, UserService) {
 $scope.showSuccessMessage = false;

 $scope.forgotPasswordSubmit = function (forgotPasswordForm) {
  console.log($scope.forgotPassword.email);
  UserService.forgotPassword($scope.forgotPassword)
   .then(function (response) {
    console.log("forgotPassword response", response);
    $scope.showSuccessMessage = true;
   })
   .catch(function (error) {
    console.log("Error in changing password: ", error);
    $scope.forgotPasswordForm.errorMessage = error.data.message;
   });
 };
}

trackflow.controller("ForgotPasswordController", [
 "$scope",
 "$state",
 "UserService",
 ForgotPasswordController,
]);
