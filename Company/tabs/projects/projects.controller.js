function companyProjectsController($scope, $timeout, ProjectService) {
 function getAllProjects() {
  ProjectService.getAllProjects().then(function (response) {
   console.log("All projects: ", response);
   $scope.projects = response.data.projects;
  });
 }

 getAllProjects()
}
trackflow.controller("companyProjectsController", [
 "$scope",
 "$timeout",
 "ProjectService",
 companyProjectsController,
]);
