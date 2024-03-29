function CompanyProjectsBaseDashboardController(
 $scope,
 $state,
 AnalyticsService
) {
 $scope.projectId = $state.params.projectId;
}

trackflow.controller("CompanyProjectsBaseDashboardController", [
 "$scope",
 "$state",
 "AnalyticsService",
 CompanyProjectsBaseDashboardController,
]);
