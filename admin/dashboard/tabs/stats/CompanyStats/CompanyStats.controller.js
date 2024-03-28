function companyStatsController($scope, AnalyticsService) {
 $scope.companyWisePeople = [];
 $scope.currtCWPpage = 1;
 $scope.totalPagesInCWP = 0;
 $scope.currtProjectCWPage = 1;
 $scope.totalPagesInProjectCW = 0;
 $scope.projectCountFormData = {};
 $scope.formDataInit = {
  startDate: new Date("2023-01-01"),
  endDate: new Date("2025-01-01"),
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
 function fetchCompanySize() {
  AnalyticsService.getCompanySize().then(function (response) {
   console.log("fetchCompanySize", response);
   $scope.companyWisePeople = response.data;
   $scope.totalPagesInCWP = Math.ceil($scope.companyWisePeople.length / 20);
   $scope.companyWisepeoplePageChange(1);
  });
 }

 function displayCompanySize(chartData) {
  let labels = chartData.map(function (data) {
   return data._id;
  });
  let values = chartData.map(function (data) {
   return data.totalUsers;
  });

  var data = {
   labels: labels,
   datasets: [
    {
     label: "Companies",
     data: values,
     backgroundColor: graphColors,
    },
   ],
  };

  var chartDiv = document.getElementById("companyWisePeopleChart");

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
  displayCompanySize(data);
 };

 fetchCompanySize();

 function fetchcountProjectsInCompany() {
  AnalyticsService.getProjectsInCompany().then(function (response) {
   console.log("fetchcountProjectsInCompany", response);
   $scope.projectCountInCompany = response.data;
   $scope.totalPagesInProjectCW = Math.ceil(
    $scope.projectCountInCompany.length / 20
   );
   $scope.companyWiseProjectPageChange(1);
  });
 }

 fetchcountProjectsInCompany();

 $scope.companyWiseProjectPageChange = function (pageNo) {
  console.log("Page changed: ", pageNo);
  var pageSize = 20;

  var data = $scope.projectCountInCompany;

  var start = (pageNo - 1) * pageSize;
  var end = start + pageSize;
  data = data.slice(start, end);

  $scope.currtProjectCWPage = pageNo;
  displayProjectsInCompany(data);
 };

 function displayProjectsInCompany(chartData) {
  var labels = chartData.map(function (data) {
   return data._id;
  });

  var values = chartData.map(function (data) {
   return data.projectCount;
  });

  var data = {
   labels: labels,
   datasets: [
    {
     label: "Projects",
     data: values,
     backgroundColor: graphColors,
    },
   ],
  };

  var chartDiv = document.getElementById("companyWiseProjectsChart");

  const existingChart = Chart.getChart(chartDiv);
  if (existingChart) {
   existingChart.destroy();
  }

  new Chart(chartDiv, {
   type: "line",
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
      beginAtZero: true,
      title: {
       display: true,
       text: "Project Count",
      },
     },
    },
   },
  });
 }

 function fetchprojectCount() {
  var body = {
   startDate:
    $scope.projectCountFormData.startDate || $scope.formDataInit.startDate,
   endDate: $scope.projectCountFormData.endDate || $scope.formDataInit.endDate,
  };

  AnalyticsService.getProjectCount(body).then(function (response) {
   console.log("fetchprojectCount", response);
   $scope.projectCount = response.data;
  });
 }

 $scope.countProjectDateChanged = function () {
  fetchprojectCount();
 };

 function fetchTopCompany() {
  var limit = 5;
  AnalyticsService.getProjectsInCompany(limit, true).then(function (response) {
   console.log("topCompaniesProjectWise", response.data);
   displayTopCompanyChart(response.data);
  });
 }

 function displayTopCompanyChart(chartData) {
  var labels = chartData.map(function (data) {
   return data._id;
  });

  var values = chartData.map(function (data) {
   return data.projectCount;
  });

  var data = {
   labels: labels,
   datasets: [
    {
     label: "Projects",
     data: values,
     backgroundColor: graphColors,
    },
   ],
  };

  var chartDiv = document.getElementById("topCompanyProjectWiseChart");

  const existingChart = Chart.getChart(chartDiv);
  if (existingChart) {
   existingChart.destroy();
  }

  new Chart(chartDiv, {
   type: "polarArea",
   data: data,
   options: {
    responsive: true,
    plugins: {
     title: {
      display: true,
      text: "Top Companies Project Wise",
     },
     legend: {
      position: "right",
     },
    },
    animation: {
     animateRotate: true,
    },
   },
  });
 }

 fetchTopCompany();
 fetchprojectCount();
}

trackflow.controller("companyStatsController", [
 "$scope",
 "AnalyticsService",
 companyStatsController,
]);
