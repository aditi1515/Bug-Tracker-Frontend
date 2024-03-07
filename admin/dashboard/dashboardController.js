function dashboardController(
 $scope,
 auth,
 SideBarService,
 ModalService,
 FormService
) {
 $scope.profile = auth;

 $scope.options = SideBarService.getSideBarOptions(auth.role);

 $scope.launchModal = function (modalId) {
  ModalService.showModal(modalId);
 };

 $scope.closeModal = function (modalId) {
  ModalService.hideModal(modalId);
 };

 $scope.onSubmit = function (modalId) {
  console.log("Confirm action performed");
  console.log("Modal ID: ", modalId);
  ModalService.hideModal(modalId);
 };

 $scope.formFields = FormService.getFormFields("registrationForm", "admin");
 console.log("Form fields: ", $scope.formFields);

 $scope.formStructure = [
  {
   title: "Company Information",
   name: "company",
   fields: FormService.getFormFields("addCompanyForm", "superadmin"),
  },
 ];

 $scope.formModel = {};
 console.log("Form model: ", $scope.formModel);
}

trackflow.controller("dashboardController", [
 "$scope",
 "auth",
 "SideBarService",
 "ModalService",
 "FormService",
 dashboardController,
]);
