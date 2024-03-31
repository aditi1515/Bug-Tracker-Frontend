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

 $scope.totalTickets = 0;
 $scope.ticketCountFormData = {};
 $scope.cptPage = 1;
 $scope.totalPagesInCPT = 0;


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
   return  data._id.substring(0, Math.min(10, data._id.length));
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
     backgroundColor: graphColors.sort(function () {
      return Math.random() - 0.5;
     }),
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
      ticks:{
       stepSize: 1
      }
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
   return  data._id.substring(0, Math.min(10, data._id.length))
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
     backgroundColor: graphColors.sort(function () {
      return Math.random() - 0.5;
     }),
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
      text: "Top 5 Companies Project Wise",
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

 function getTotalTickets() {
  var body = {
   startDate:
    $scope.ticketCountFormData.startDate || $scope.formDataInit.startDate,
   endDate: $scope.ticketCountFormData.endDate || $scope.formDataInit.endDate,
  };

  AnalyticsService.getTotalTickets(body).then(function (response) {
   console.log("getTotalTickets", response);
   $scope.totalTickets = formatToK(response.data?.totalTickets);
  });
 }

 $scope.countTicketDateChanged = function () {
  getTotalTickets();
 };

 function getcompanyWiseTicketCounts() {
  AnalyticsService.companyWiseTicketCounts().then(function (response) {
   console.log("companyWiseTicketCounts", response.data);

   $scope.totalPagesInCPT = Math.ceil(
    response.data.companyWiseTickets.length / 20
   );
   $scope.companyWiseTicketCountsChartData = response.data.companyWiseTickets;
   displayCompanyWiseTicketCounts();
  });
 }

 function displayCompanyWiseTicketCounts() {
  var pageSize = 20;
  var chartData = $scope.companyWiseTicketCountsChartData;
  $scope.totalPagesInCPT = Math.ceil(chartData.length / pageSize);
  var startIndex = ($scope.cptPage - 1) * pageSize;
  chartData = chartData.slice(startIndex, startIndex + pageSize);

  var labels = chartData.map(function (data) {
   return data._id.substring(0, Math.min(10, data._id.length));
  });

  var values = chartData.map(function (data) {
   return data.totalTickets;
  });

  var data = {
   labels: labels,
   datasets: [
    {
     label: "Tickets",
     data: values,
     backgroundColor: graphColors.sort(function () {
      return Math.random() - 0.5;
     }),
     borderColor: graphColors.sort(function () {
      return Math.random() - 0.5;
     }),
    },
   ],
  };

  var config = {
   type: "line",
   data: data,
   options: {
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
       text: "Ticket Count",
      },
     },
    },
   },
  };

  var ctx = document
   .getElementById("companyWiseTicketCountsChart")
   .getContext("2d");

  const existingChart = Chart.getChart(ctx);
  if (existingChart) {
   existingChart.destroy();
  }

  new Chart(ctx, config);
 }

 $scope.companyWiseTicketCountsPageChange = function (pageNo) {
  $scope.cptPage = pageNo;
  displayCompanyWiseTicketCounts();
 };

 getcompanyWiseTicketCounts();

 getTotalTickets();

 fetchTopCompany();
 fetchprojectCount();
}

trackflow.controller("companyStatsController", [
 "$scope",
 "AnalyticsService",
 companyStatsController,
]);
