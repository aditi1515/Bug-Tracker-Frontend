function ResetPasswordController($scope, UserService, $state) {
 $scope.showSuccessMessage = false;
 $scope.resetPasswordSubmit = function (resetPasswordForm) {
  console.log($scope.resetPassword);
  console.log($state.params);
  UserService.resetPassword($scope.resetPassword, $state.params)
   .then(function (response) {
    console.log("Reset Password response", response);
    $scope.showSuccessMessage = true;
   })
   .catch(function (error) {
    console.log("Error in resetting  password: ", error.data.message);
   });
 };
}

trackflow.controller("ResetPasswordController", [
 "$scope",
 "UserService",
 "$state",
 ResetPasswordController,
]);
