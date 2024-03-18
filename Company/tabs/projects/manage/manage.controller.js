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
  inProgress: true,
  dueDate: new Date(),
 };

 $scope.currentDate = new Date();
 $scope.projectData = {};
 $scope.metaData = {};
 $scope.isEditingProject = false;
 $scope.currentEditingProjectId = null;

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

 $scope.editProjectFormSubmit = function (modalId, editProjectForm) {
  console.log("Editing project: ", $scope.addProjectFormData);
  ProjectService.updateProject(
   $scope.currentEditingProjectId,
   $scope.addProjectFormData
  )
   .then(function (response) {
    SnackbarService.showAlert("Project updated successfully", 2000, "success");
    $state.reload();
    ModalService.hideModal(modalId);
   })
   .catch(function (error) {
    console.log("Error updating project: ", error);
    editProjectForm.errorMessage = error.data.message;
   });
 };

 $scope.editProject = function (project, modalId) {
  $scope.isEditingProject = true;
  $scope.currentEditingProjectId = project._id;
  console.log("Editing project: ", project);

  var editProjectFormData = {
   name: project.name,
   description: project.description,
   inProgress: project.inProgress,
   dueDate: new Date(project.dueDate),
   people: project.people,
   previewLogo: [project.logo],
   previousLogo: project.logo,
   membersAlreadySelected: project.members,
   removedMembers: [],
   members: [],
   key: project.key,
  };

  $scope.addProjectFormData = editProjectFormData;
  ModalService.showModal(modalId);
 };

 $scope.isMemberSelected = function (person) {
  return $scope.addProjectFormData.membersAlreadySelected?.some(function (
   member
  ) {
   if (member._id === person._id) {
    console.log("Member selected: ", member._id, person._id);
   }
   return member._id === person._id;
  });
 };

 $scope.removeMember = function (person) {
  console.log("Removing member: ", person);
  $scope.addProjectFormData.removedMembers.push(person);
  $scope.addProjectFormData.membersAlreadySelected =
   $scope.addProjectFormData.membersAlreadySelected.filter(function (member) {
    return member._id !== person._id;
   });
 };

 $scope.$on("fileSelected", function (event, files) {
  console.log("Files here: ", files);
  if (files.length === 0) {
   console.log("No files selected");
   $scope.addProjectFormData.previewLogo = null;
   return;
  }
  var objectUrls = Object.keys(files).map(function (key) {
   return URL.createObjectURL(files[key]);
  });

  $scope.addProjectFormData.previewLogo = objectUrls;
 });

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
   query,
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
  getAllProjects($scope.projectData.currentPage, $scope.projectData.pageSize, {
   query: query,
  });
 }

 var debounceTimeout;

 $scope.debounceSearch = function () {
  console.log("Debouncing...");
  $timeout.cancel(debounceTimeout);
  debounceTimeout = $timeout(function () {
   searchProject($scope.projectData.query);
  }, 1000);
 };

 $scope.launchModal = function (modalId, addProjectForm) {
  if ($scope.isEditingProject) {
   $scope.isEditingProject = false;
   $scope.addProjectFormData = {};
   $scope.currentEditingProjectId = null;
   addProjectForm.$setPristine();
   addProjectForm.$setUntouched();
  }
  ModalService.showModal(modalId);
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
