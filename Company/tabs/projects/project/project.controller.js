function projectController($scope, $state, ProjectService, UserService) {
 $scope.projectDetails = {};


 function getProjectById() {
  var projectId = $state.params.projectId;
  console.log("Project Id: ", $scope.projectId);
  ProjectService.getProjectById(projectId).then(function (response) {
   console.log("Project details: ", response.data.project);
   $scope.projectDetails = response.data.project;
  });
 }



 getProjectById();

}

trackflow.controller("ProjectController", [
 "$scope",
 "$state",
 "ProjectService",
 "UserService",
 projectController,
]);
