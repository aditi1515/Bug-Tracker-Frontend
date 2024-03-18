function companyProjectsManageController(
 $scope,
 $timeout,
 $state,
 ModalService,
 SnackbarService,
 UserService,
 ProjectService
) {
 //add project form data
 function init() {
  $scope.addProjectFormData = {
   inProgress: true,
   dueDate: new Date(),
  };

  $scope.currentDate = new Date();
  $scope.isEditingProject = false;
  $scope.currentEditingProjectId = null;
 }

 init();

 $scope.projectData = {};
 $scope.metaData = {};

 //add project form data
 $scope.addProjectFormSubmit = function (modalId, addProjectForm) {
  // check if user role is not company admin and not present in addProjectFormData.members then add it

  if ($scope.profile.role !== "COMPANY_ADMIN") {
   var isCreatorPresent = $scope.addProjectFormData.members.some(function (
    member
   ) {
    return member._id === $scope.profile._id;
   });

   if (!isCreatorPresent) {
    $scope.addProjectFormData.members.push({
     _id: $scope.profile._id,
     firstname: $scope.profile.firstname,
     lastname: $scope.profile.lastname,
     email: $scope.profile.email,
     image: $scope.profile.image,
    });
   }
  }

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

 //populate form with project data
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
 //edit project form submit
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

 //to check if member is already present in the project
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

 // add member to be removed from project to remove member array
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
   init();
   addProjectForm?.$setPristine();
   addProjectForm?.$setUntouched();
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
