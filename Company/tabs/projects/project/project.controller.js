function projectController($scope, $state, ProjectService, UserService) {
 $scope.projectDetails = {};
 $scope.allEmployees = [];

 function getProjectById() {
  var projectId = $state.params.projectId;
  console.log("Project Id: ", $scope.projectId);
  ProjectService.getProjectById(projectId).then(function (response) {
   console.log("Project details: ", response.data.project);
   $scope.projectDetails = response.data.project;
  });
 }

 function getAllEmployees() {
  var projectId = $state.params.projectId;
  UserService.getAllUsersByProjectId({ onlyEnabled: true , projectId:projectId }).then(function (response) {
   console.log("All people: ", response.data.users);
   $scope.allEmployees = response.data.users;
  });
 }

 getProjectById();
 getAllEmployees();
}

trackflow.controller("ProjectController", [
 "$scope",
 "$state",
 "ProjectService",
 "UserService",
 projectController,
]);
