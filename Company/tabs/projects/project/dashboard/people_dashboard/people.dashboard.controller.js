function PeopleDashboardInProjectController(
 $scope,
 $state,
 AnalyticsService,
 ProjectService
) {
 $scope.projectId = $state.params.projectId;
 $scope.projectDetails = $scope;
 $scope.dateData = {};

 console.log("projectDetails: ", $scope.projectDetails);
 function getUsersInProject() {
  AnalyticsService.getUsersInProject($scope.projectId).then(function (
   response
  ) {
   $scope.usersInProject = response.data;
  });
 }

 getUsersInProject();

 function fetchProjectById() {
  ProjectService.getProjectById($scope.projectId).then(function (response) {
   $scope.projectDetails = response.data.project;
   $scope.dateData = {
    timePassed: Math.ceil(
     (new Date() - new Date($scope.projectDetails.createdAt)) /
      (1000 * 60 * 60 * 24)
    ),
    timeLeft: Math.ceil(
     (new Date($scope.projectDetails.dueDate) - new Date()) /
      (1000 * 60 * 60 * 24)
    ) ,
   };
  });
 }
 fetchProjectById();
}

trackflow.controller("PeopleDashboardInProjectController", [
 "$scope",
 "$state",
 "AnalyticsService",
 "ProjectService",
 PeopleDashboardInProjectController,
]);
