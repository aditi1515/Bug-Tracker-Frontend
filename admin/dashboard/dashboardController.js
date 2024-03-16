function dashboardController(
 $scope,
 auth,
 SideBarService,
 ModalService,
) {


    //auth function returns user
 $scope.profile = auth;

 //get options for sidebar depending on user's role
 $scope.options = SideBarService.getSideBarOptions(auth.role);

 $scope.launchModal = function (modalId) {
  ModalService.showModal(modalId);
 };

 $scope.closeModal = function (modalId) {
  ModalService.hideModal(modalId);
 };

 $scope.onSubmit = function (modalId) {
  ModalService.hideModal(modalId);
 };

 
}

trackflow.controller("dashboardController", [
 "$scope",
 "auth",
 "SideBarService",
 "ModalService",
 dashboardController,
]);
