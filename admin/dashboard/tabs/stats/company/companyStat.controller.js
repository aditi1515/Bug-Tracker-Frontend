function CompanyStatController($scope, AnalyticsService) {
 $scope.formDataInit = {
  startDate: new Date("2023-01-01"),
  endDate: new Date("2025-01-01"),
 };
 $scope.currtCWPpage = 1;
 $scope.totalPagesInCWP = 0;
 $scope.companyCountFormData = {};
 $scope.locationWiseCompanyFormData = {
  locationOption: "country",
 };

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
 };

 fetchlocationWiseCompanyCount();

 function fetchCompanySize() {
  AnalyticsService.getCompanySize().then(function (response) {
   console.log("fetchCompanySize", response);
   $scope.companyWisePeople = response.data;
   $scope.totalPagesInCWP = Math.ceil($scope.companyWisePeople.length / 20);
   $scope.companyWisepeoplePageChange(1);
  });
 }

 function displayCompanySize(chartData) {
  console.log("displayCompanySize", chartData);
  let labels = chartData.map(function (data) {
   return data._id.substring(0, Math.min(10, data._id.length));
  });
  let values = chartData.map(function (data) {
   return data.totalUsers;
  });

  var data = {
   labels: labels,
   datasets: [
    {
     label: "People",
     data: values,
     backgroundColor: graphColors.sort(function () {
      return Math.random() - 0.5;
     }),
    },
   ],
  };

  var chartDiv = document.getElementById("companyWisePeopleChart");
  console.log("chartDiv", chartDiv);
  const existingChart = Chart.getChart(chartDiv);
  if (existingChart) {
   existingChart.destroy();
  }

  new Chart(chartDiv, {
   type: "bar",
   data: data,
   options: {
    responsive: true,
    legend: {
     position: "bottom",
    },
    scales: {
     x: {
      title: {
       display: true,
       text: "Companies",
      },
     },
     y: {
      title: {
       display: true,
       text: "People Count",
      },
      ticks: {
       stepSize: 1,
      },
     },
    },
   },
  });
 }

 $scope.companyWisepeoplePageChange = function (pageNo) {
  console.log("Page changed: ", pageNo);
  var pageSize = 20;

  var data = $scope.companyWisePeople;

  var start = (pageNo - 1) * pageSize;
  var end = start + pageSize;
  data = data.slice(start, end);

  $scope.currtCWPpage = pageNo;

  console.log("data", data);

  displayCompanySize(data);
 };

 fetchCompanySize();
}
trackflow.controller("CompanyStatController", [
 "$scope",
 "AnalyticsService",
 CompanyStatController,
]);
