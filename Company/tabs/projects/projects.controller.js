function companyProjectsController(
 $scope,
 ProjectService,
 UserService,
 TicketService,
 ModalService,
 SnackbarService,
 FilePreviewFactory
) {
 $scope.allEmployeesInCompany = [];
 $scope.formHolder = {};
 function filePreviewCallback(filesUrls) {
  console.log("Files here: ", filesUrls[0].url);
  $scope.previewAttachments = filesUrls;
 }
 $scope.addGlobalTicketFormData = {};
 FilePreviewFactory.initFileSelectionListener($scope, filePreviewCallback);

 $scope.isImage = function (preview) {
  // Check if the fileType starts with "image/"
  return preview.type && preview.type.startsWith("image/");
 };

 function getAllProjects() {
  ProjectService.getAllProjects().then(function (response) {
   console.log("All projects: ", response);
   $scope.projects = response.data.projects;
  });
 }

 getAllProjects();

 function getAllEmployeesInCompany() {
  UserService.getAllUsers({
   onlyEnabled: true,
  }).then(function (response) {
   console.log("All people: ", response.data.users);
   $scope.allEmployeesInCompany = response.data.users;
  });
 }

 getAllEmployeesInCompany();

 $scope.setCurrentProject = function (projectId) {
  $scope.currentlySelectedProject = $scope.projects.find(function (project) {
   return project._id === projectId;
  });

  console.log("Currently selected project: ", $scope.currentlySelectedProject);
 };

 $scope.addTicketFormSubmit = function (modalId, addGlobalTicketForm) {
  console.log("Add ticket form data: ", $scope.addGlobalTicketFormData);

  TicketService.createTicket($scope.addGlobalTicketFormData)
   .then(function (response) {
    console.log("Ticket created successfully: ", response);
    ModalService.hideModal(modalId);
    SnackbarService.showAlert("Ticket created successfully", 2000, "success");
   })
   .catch(function (error) {
    addTicketForm.errorMessage = error.message;
    console.log("Error adding ticket: ", error);
   });
 };

 $scope.launchModal = function (modalId) {
  $scope.addGlobalTicketFormData = {
   dueDate: new Date(),
   ticketType: "BUG",
   priority: "LOW",
   // projectDetails: $scope.currentlySelectedProject,
   status: "OPEN",
  };
  $scope.minDueDate = new Date();
  ModalService.showModal(modalId);
 };

 $scope.onModalClose = function () {
  $scope.addGlobalTicketFormData = {};
  $scope.formHolder.addGlobalTicketForm.$setPristine();
  $scope.formHolder.addGlobalTicketForm.$setUntouched();
 };
}
trackflow.controller("companyProjectsController", [
 "$scope",
 "ProjectService",
 "UserService",
 "TicketService",
 "ModalService",
 "SnackbarService",
 "FilePreviewFactory",
 companyProjectsController,
]);
