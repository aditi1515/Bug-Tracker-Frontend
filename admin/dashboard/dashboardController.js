function dashboardController(
 $scope,
 auth,
 SideBarService,
 ModalService,
 FormService
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

 $scope.formFields = FormService.getFormFields("registrationForm", "admin");

 $scope.formStructure = [
  {
   title: "Company Information",
   name: "company",
   fields: FormService.getFormFields("addCompanyForm", "superadmin"),
  },
 ];

 $scope.formModel = {};
}

trackflow.controller("dashboardController", [
 "$scope",
 "auth",
 "SideBarService",
 "ModalService",
 "FormService",
 dashboardController,
]);
