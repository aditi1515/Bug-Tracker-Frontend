function CompanyUserDashboardController($scope, AnalyticsService) {
 $scope.formDataInit = {
  startDate: new Date("2023-01-01"),
  endDate: new Date("2024-12-31"),
 };

 $scope.userCountFormData = {};

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

}

trackflow.controller("CompanyUserDashboardController", [
 "$scope",
 "AnalyticsService",
 CompanyUserDashboardController,
]);
