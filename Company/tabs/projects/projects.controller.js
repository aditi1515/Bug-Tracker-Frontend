function companyProjectsController($scope, ProjectService, UserService) {
 $scope.allEmployeesInCompany = [];

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

 function getAllEmployeesInCompany() {
  UserService.getAllUsers({
   onlyEnabled: true,
  }).then(function (response) {
   console.log("All people: ", response.data.users);
   $scope.allEmployeesInCompany = response.data.users;
  });
 }

 getAllEmployeesInCompany();
}
trackflow.controller("companyProjectsController", [
 "$scope",
 "ProjectService",
 "UserService",
 companyProjectsController,
]);
