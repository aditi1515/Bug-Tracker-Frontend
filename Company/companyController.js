function companyController($scope, auth, SideBarService, ModalService) {
 $scope.profile = auth;
 console.log("auth", auth);
 $scope.sideBarOptions = SideBarService.getSideBarOptions(auth.role);

 $scope.launchModal = function (modalId) {
  console.log("launching modal", modalId);
  ModalService.showModal(modalId);
 };

 $scope.closeModal = function (modalId) {
  ModalService.hideModal(modalId);
 };
}

trackflow.controller("companyController", [
 "$scope",
 "auth",
 "SideBarService",
 "ModalService",
 companyController,
]);
