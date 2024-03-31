function ActivityInProjectController($scope, $state,ActivityService) {
 function fetchTicketLogs() {
  var projectId = $state.params.projectId
  ActivityService.getAllLogs('tickets',projectId).then(function (response) {
   $scope.ticketLogs = response.logs;
   console.log("ticketLogs", response);
  });
 }

 fetchTicketLogs()
}

trackflow.controller("ActivityInProjectController", [
 "$scope",
 "$state",
 "ActivityService",
 ActivityInProjectController,
]);
