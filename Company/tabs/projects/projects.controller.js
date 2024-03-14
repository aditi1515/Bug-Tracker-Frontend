function companyProjectsController($scope, ProjectService) {
 function getAllProjects() {
  ProjectService.getAllProjects().then(function (response) {
   console.log("All projects: ", response);
   $scope.projects = response.data.projects;
   if (response.data.projects.length > 0) {
    $scope.addTicketFormData.project = response.data.projects[0]._id;
   }
  });
 }

 getAllProjects();
}
trackflow.controller("companyProjectsController", [
 "$scope",
 "ProjectService",
 companyProjectsController,
]);
