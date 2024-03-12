function companyProjectsManageController(
 $scope,
 $timeout,
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
    getAllProjects();
    ModalService.hideModal(modalId);
   })
   .catch(function (error) {
    console.log("Error adding employee: ", error);
    addProjectForm.$invalid = true;
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

 function getAllProjects(
  pageNo = 1,
  pageSize = 10,
  query = $scope.projectData.query || ""
 ) {
  ProjectService.getAllProjects({
   pageNo: pageNo,
   pageSize: pageSize,
   query: query,
   onlyMeta: true,
  }).then(function (response) {
   console.log("All projects: ", response);
   $scope.projectData = response.data;
  });
 }

 getAllProjects();

 $scope.pageChange = function (pageNo, pageSize) {
  console.log("Page changed: ", pageNo);
  getAllProject(pageNo, pageSize);
 };

 function searchProject(query) {
  console.log("Search query: ", query);
  getAllProjects(
   $scope.projectData.currentPage,
   $scope.projectData.pageSize,
   query
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
 "ModalService",
 "SnackbarService",
 "UserService",
 "ProjectService",
 companyProjectsManageController,
]);
