function ActivityController($scope, ActivityService, ModalService) {
 function getAllLogs() {
  ActivityService.getAllLogs().then(function (response) {
   console.log("Response Log: ", response);
   $scope.logs = response.logs;
  });
 }
 getAllLogs();

 $scope.openLogDetailsModal = function (log, modalId) {
  $scope.selectedLog = log;
  ModalService.showModal(modalId);
 };

 $scope.isObject = function (value) {
  return typeof value === "object";
 };

 $scope.isLink = function (value) {
  return value && value.startsWith("http");
 };

 $scope.prettyJson = function (value) {
  return JSON.stringify(value, null, 2);
 }
}

trackflow.controller("ActivityController", [
 "$scope",
 "ActivityService",
 "ModalService",
 ActivityController,
]);
