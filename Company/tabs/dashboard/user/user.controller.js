function CompanyUserDashboardController($scope, AnalyticsService) {
 $scope.formDataInit = {
  startDate: new Date("2023-01-01"),
  endDate: new Date("2024-12-31"),
 };

 $scope.userCountFormData = {};
 $scope.usersWithMostProjectsFormData = {};

 var graphColors = [
  "#C2DFFF", // Periwinkle
  "#F5DCE8", // Lavender Rose
  "#D0F0C0", // Tea Green
  "#E2CCFF", // Light Pastel Purple
  "#FFDFD3", // Peach Puff
  "#C8E6C9", // Tea Green Light
  "#E1E0FF", // Periwinkle Light
  "#FFE5F7", // Pink Light
  "#D8FFCC", // Light Mint
  "#FFEEDD", // Light Apricot
 ];

 function fetchCompanySize() {
  var body = {
   startDate:
    $scope.userCountFormData.startDate || $scope.formDataInit.startDate,
   endDate: $scope.userCountFormData.endDate || $scope.formDataInit.endDate,
  };

  console.log("fetchCompanySize", body);

  AnalyticsService.getCompanySize(body).then(function (response) {
   $scope.companySize = response.data[0];
   displayCompanySizeChart();
  });
 }

 fetchCompanySize();

 $scope.countUserDateChanged = function () {
  fetchCompanySize();
 };


 function getUsersWithMostProjects(){

  var body = {
   startDate:
    $scope.usersWithMostProjectsFormData.startDate || $scope.formDataInit.startDate,
   endDate: $scope.usersWithMostProjectsFormData.endDate || $scope.formDataInit.endDate,
  };

  AnalyticsService.getUsersWithMostProjects(body).then(function(response){
    $scope.usersWithMostProjects = response.data;
    displayUsersWithMostProjectsChart();
  });
 }

 getUsersWithMostProjects()


 $scope.usersWithMostProjectsDateChanged = function(){
  getUsersWithMostProjects();
 }

}

trackflow.controller("CompanyUserDashboardController", [
 "$scope",
 "AnalyticsService",
 CompanyUserDashboardController,
]);
