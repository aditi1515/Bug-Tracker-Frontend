function companyProjectsManageController(
 $scope,
 $timeout,
 $state,
 ModalService,
 SnackbarService,
 UserService,
 ProjectService
) {
 $scope.addProjectFormData = {
  status: "IN_PROGRESS",
  dueDate: new Date(),
 };
 $scope.currentDate = new Date();
 $scope.projectData = {};

 $scope.metaData = {};

 $scope.addProjectFormSubmit = function (modalId, addProjectForm) {
  ProjectService.addProject($scope.addProjectFormData)
   .then(function (response) {
    SnackbarService.showAlert("Project created successfully", 2000, "success");
    $state.reload();
    ModalService.hideModal(modalId);
   })
   .catch(function (error) {
    console.log("Error adding employee: ", error);
    addProjectForm.errorMessage = error.data.message;
   });
 };


 
 function getAllEmployees() {
  UserService.getAllUsers({ onlyEnabled: true }).then(function (response) {
   console.log("All people: ", response.data.users);
   $scope.metaData.people = response.data.users;
  });
 }
 getAllEmployees();

 //get all projects
 function getAllProjects(
  pageNo = 1,
  pageSize = 10,
  query = $scope.projectData.query || ""
 ) {
  ProjectService.getAllProjects({
   pageNo: pageNo,
   pageSize: pageSize,
 query

  }).then(function (response) {
   console.log("All projects: ", response);
   $scope.projectData = response.data;
  });
 }

 getAllProjects();


 //on page change
 $scope.pageChange = function (pageNo, pageSize) {
  console.log("Page changed: ", pageNo);
  getAllProjects(pageNo, pageSize);
 };


 //serach project 
 function searchProject(query) {
  console.log("Search query: ", query);
  getAllProjects(
   $scope.projectData.currentPage,
   $scope.projectData.pageSize,
   { query: query}
  );
 }

 var debounceTimeout;

 $scope.debounceSearch = function () {
  console.log("Debouncing...");
  $timeout.cancel(debounceTimeout);
  debounceTimeout = $timeout(function () {
   searchProject($scope.projectData.query);
  }, 1000);
 };
}

trackflow.controller("companyProjectsManageController", [
 "$scope",
 "$timeout",
 "$state",
 "ModalService",
 "SnackbarService",
 "UserService",
 "ProjectService",
 companyProjectsManageController,
]);
