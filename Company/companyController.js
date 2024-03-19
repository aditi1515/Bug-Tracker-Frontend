function companyController(
 $scope,
 auth,
 company,
 SideBarService,
 ModalService
) {
 $scope.profile = auth;
 $scope.company = company;
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
 "company",
 "SideBarService",
 "ModalService",
 companyController,
]);
