function CompanyProjectsDashboardController($scope, AnalyticsService) {
 $scope.formDataInit = {
  startDate: new Date("2023-01-01"),
  endDate: new Date("2024-12-31"),
 };

 $scope.projectCountFormData = {};
 $scope.totalPagesInPWU = 0;
 $scope.pwuPage = 1;

 $scope.pwtPage = 1;
 $scope.totalPagesInPWT = 0;

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

 function fetchcountProjects() {
  var body = {
   startDate:
    $scope.projectCountFormData.startDate || $scope.formDataInit.startDate,
   endDate: $scope.projectCountFormData.endDate || $scope.formDataInit.endDate,
  };

  AnalyticsService.getProjectCount(body).then(function (response) {
   $scope.dashboardProjects = response.data;
   displayProjectsCountChart();
  });
 }

 $scope.countProjectDateChanged = function () {
  fetchcountProjects();
 };

 function displayProjectsCountChart() {
  var data = $scope.dashboardProjects;

  var chartDiv = document.getElementById("projectsCountChart");

  var existsChart = Chart.getChart(chartDiv);
  if (existsChart) {
   existsChart.destroy();
  }

  new Chart(chartDiv, {
   type: "pie",
   data: {
    labels: ["InProgress", "Completed"],
    datasets: [
     {
      label: "Projects",
      data: [data.inProgress, data.complete],
      backgroundColor: ["#7e7cf6", "#e47a88"],
      borderWidth: 1,
     },
    ],
   },
  });
 }
 fetchcountProjects();

 function getprojectWiseUsers() {
  AnalyticsService.getprojectWiseUsers().then(function (response) {
   $scope.projectWiseUsers = response.data;
   console.log("projectWiseUsers", $scope.projectWiseUsers);
   displayprojectWiseUsersChart();
  });
 }
 getprojectWiseUsers();

 function displayprojectWiseUsersChart() {
  var data = $scope.projectWiseUsers;

  var pageSize = 10;
  $scope.totalPagesInPWU = Math.ceil(data.length / pageSize);
  var startIndex = ($scope.pwuPage - 1) * pageSize;
  data = data.slice(startIndex, Math.min(startIndex + pageSize, data.length));

  var chartDiv = document.getElementById("projectWiseUsersChart");
  var existsChart = Chart.getChart(chartDiv);
  if (existsChart) {
   existsChart.destroy();
  }

  console.log("data", data);
  let maxLength = 20;
  new Chart(chartDiv, {
   type: "bar",
   data: {
    labels: data.map(function (item) {
     return item.project.name.length > maxLength
      ? item.project.name.substring(0, maxLength) + "..."
      : item.project.name;
    }),
    datasets: [
     {
      label: "Users",
      data: data.map(function (item) {
       return item.userCount;
      }),
      backgroundColor: graphColors,
      borderWidth: 1,
     },
    ],
   },
   options: {
    scales: {
     x: {
      title: {
       display: true,
       text: "Projects",
      },
     },
     y: {
      title: {
       display: true,
       text: "Users",
      },
      beginAtZero: true,
      ticks: {
       stepSize: 1,
      },
     },
    },
   },
  });
 }

 function getprojectWiseTickets() {
  AnalyticsService.getprojectWiseTickets().then(function (response) {
   $scope.projectWiseTickets = response.data;
   console.log("projectWiseTickets", $scope.projectWiseTickets);
   displayprojectWiseTicketsChart();
  });
 }

 function displayprojectWiseTicketsChart() {
  var data = $scope.projectWiseTickets;
  var chartDiv = document.getElementById("ticketsInProjectChart");
  var existsChart = Chart.getChart(chartDiv);
  console.log(data);
  var pageSize = 10;
  $scope.totalPagesInPWT = Math.ceil(data.length / pageSize);
  var startIndex = ($scope.pwtPage - 1) * pageSize;
  data = data.slice(startIndex, Math.min(startIndex + pageSize, data.length));

  if (existsChart) {
   existsChart.destroy();
  }

  console.log("datadisplayprojectWiseTicketsChart ", data);

  var dataSets = [
   {
    label: "Bugs",
    data: data.map(function (item) {
     return item.bugs;
    }),
    backgroundColor: graphColors,
    borderWidth: 1,
   },
   {
    label: "FR",
    data: data.map(function (item) {
     return item.fr;
    }),
    backgroundColor: graphColors.sort(function () {
     return Math.random() - 0.5;
    }),
    borderWidth: 1,
   },
  ];

  console.log("dataset", dataSets);
  let maxLength = 20;
  new Chart(chartDiv, {
   type: "bar",
   data: {
    labels: data.map(function (item) {
     return item.project.name.length > maxLength
      ? item.project.name.substring(0, maxLength) + "..."
      : item.project.name;
    }),
    datasets: dataSets,
   },
   options: {
    scales: {
     x: {
      title: {
       display: true,
       text: "Projects",
      },
     },
     y: {
      title: {
       display: true,
       text: "Tickets",
      },
      beginAtZero: true,
      ticks: {
       stepSize: 1,
      },
     },
    },
   },
  });
 }

 getprojectWiseTickets();

 $scope.projectWiseUsersPageChange = function (page) {
  $scope.pwuPage = page;
  displayprojectWiseUsersChart();
 };

 $scope.projectWiseTicketsPageChange = function (page) {
  $scope.pwtPage = page;
  displayprojectWiseTicketsChart();
 };
}

trackflow.controller("CompanyProjectsDashboardController", [
 "$scope",
 "AnalyticsService",
 CompanyProjectsDashboardController,
]);
