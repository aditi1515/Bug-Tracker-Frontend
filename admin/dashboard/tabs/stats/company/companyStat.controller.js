function CompanyStatController($scope, AnalyticsService) {
 $scope.formDataInit = {
  startDate: new Date("2023-01-01"),
  endDate: new Date("2025-01-01"),
 };

 $scope.companyCountFormData = {};
 $scope.locationWiseCompanyFormData = {
  locationOption: "country",
 };
 function fetchcountCompanies() {
  var startDate =
   $scope.companyCountFormData.startDate || $scope.formDataInit.startDate;
  var endDate =
   $scope.companyCountFormData.endDate || $scope.formDataInit.endDate;
  console.log("startDate", startDate);
  console.log("endDate", endDate);
  AnalyticsService.getCountCompanies({
   startDate: startDate,
   endDate: endDate,
  }).then(
   function (response) {
    console.log(response);
    $scope.companiesCount = response.data;
    displayCompanyCountChart(response.data);
   },
   function (error) {
    console.log(error);
   }
  );
 }

 function displayCompanyCountChart(chartData) {
  var chartDiv = document.querySelector("#companyCountChart");

  console.log("chartDiv", chartDiv);
  var data = {
   labels: ["Total", "Enabled", "Disabled"],
   datasets: [
    {
     label: "Companies",
     data: [
      chartData.totalCompanies,
      chartData.enabledCompanies,
      chartData.disabledCompanies,
     ],
     backgroundColor: ["#e3e2ff", "#d1da90", "#ffdcdc"],
    },
   ],
   options: {
    responsive: true,
    legend: {
     position: "bottom",
    },
   },
  };

  const existingChart = Chart.getChart(chartDiv);
  if (existingChart) {
   existingChart.destroy();
  }

  new Chart(chartDiv, {
   type: "pie",
   data: data,
  });
 }

 fetchcountCompanies();

 $scope.countCompanyDateChanged = function () {
  fetchcountCompanies();
 };

 // ----------------- Company count chart  location wise -----------------

 function fetchlocationWiseCompanyCount() {
  console.log("fetchlocationWiseCompanyCount");
  var option = $scope.locationWiseCompanyFormData.locationOption || "country";
  AnalyticsService.getLocationWiseCompanyCount({
   option: option,
  }).then(
   function (response) {
    console.log(response);
    $scope.locationWiseCompaniesCount = response.data;
    displayLocationWiseCompanyCountChart(response.data);
   },
   function (error) {
    console.log(error);
   }
  );
 }

 function displayLocationWiseCompanyCountChart(chartData) {
  var lables = chartData.map(function (data) {
   return data._id;
  });

  var values = chartData.map(function (data) {
   return data.locationWiseCompanies;
  });

  var data = {
   labels: lables,
   datasets: [
    {
     label: "Companies",
     data: values,
     backgroundColor: [
      "#e3e2ff",
      "#d1da90",
      "#ffdcdc",
      "#e9a77e",
      "#6cc5d7",
      "#7e7cf6",
     ],
    },
   ],
   options: {
    responsive: true,
    legend: {
     position: "bottom",
    },
   },
  };

  var chartDiv = document.querySelector("#locationWiseCompanyCountChart");

  const existingChart = Chart.getChart(chartDiv);
  if (existingChart) {
   existingChart.destroy();
  }

  new Chart(chartDiv, {
   type: "bar",
   data: data,
  });
 }


 $scope.locationWiseCompanyDateChanged = function () {
  fetchlocationWiseCompanyCount();
 }

 fetchlocationWiseCompanyCount();
}
trackflow.controller("CompanyStatController", [
 "$scope",
 "AnalyticsService",
 CompanyStatController,
]);
