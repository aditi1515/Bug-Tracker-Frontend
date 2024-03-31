function TicketDashboardInProjectController($scope, $state, AnalyticsService) {
 $scope.projectId = $state.params.projectId;

 $scope.formDataInit = {
  startDate: new Date("2023-01-01"),
  endDate: new Date("2024-12-31"),
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

 function totalTicketsInProject() {
  AnalyticsService.getprojectWiseTickets($scope.projectId).then(function (
   response
  ) {
   $scope.totalTickets = response.data[0];
  });
 }

 totalTicketsInProject();

 function statusWiseTicketsInProject() {
  AnalyticsService.getStatusWiseTickets($scope.projectId).then(function (
   response
  ) {
   console.log("getstatuswisetickets", response);
   $scope.statusWiseTickets = response.data;
   displayStatusWiseTicketChart();
  });
 }

 statusWiseTicketsInProject();

 function priorityWiseTicketsInProjecti() {
  AnalyticsService.getPriorityWiseTickets($scope.projectId).then(function (
   response
  ) {
   console.log("getprioritywisetickets", response);
   $scope.priorityWiseTickets = response.data;
   displayPriorityWiseTicketChart();
  });
 }
 priorityWiseTicketsInProjecti();

 function displayStatusWiseTicketChart() {
  var data = $scope.statusWiseTickets;
  console.log("displayStatusWiseTicketChart", data);

  var keys = data.map(function (d) {
   return d._id;
  });
  var values = data.map(function (d) {
   return d.statusWiseCount;
  });

  var ctx = document.getElementById("statusWiseTickets-canvas");

  var existingChart = Chart.getChart(ctx);
  if (existingChart) {
   existingChart.destroy();
  }
  new Chart(ctx, {
   type: "bar",
   data: {
    labels: keys,
    datasets: [
     {
      label: "TicketCount",
      data: values,
      backgroundColor: graphColors.sort(function () {
       return Math.random() - 0.5;
      }),
     },
    ],
   },
   options: {
    responsive: true,
    legend: {
     position: "bottom",
    },
    ticks: {
     stepSize: 1,
    },
    plugins: {
     title: {
      display: true,
      text: "Status Wise Tickets",
     },
    },
   },
  });
 }

 function displayPriorityWiseTicketChart() {
  var data = $scope.priorityWiseTickets;
  console.log("displayPriorityWiseTicketChart", data);

  var keys = data.map(function (d) {
   return d._id;
  });
  var values = data.map(function (d) {
   return d.priorityWiseCount;
  });

  var ctx = document.getElementById("priorityWiseTickets-canvas");

  var existingChart = Chart.getChart(ctx);
  if (existingChart) {
   existingChart.destroy();
  }
  new Chart(ctx, {
   type: "bar",
   data: {
    labels: keys,
    datasets: [
     {
      label: "TicketCount",
      data: values,
      backgroundColor: graphColors.sort(function () {
       return Math.random() - 0.5;
      }),
     },
    ],
   },
   options: {
    responsive: true,
    legend: {
     position: "bottom",
    },
    ticks: {
     stepSize: 1,
    },
    plugins: {
     title: {
      display: true,
      text: "Priority Wise Tickets",
     },
    },
   },
  });
 }

 function fetchgetuserProductivityInTickets() {
  var data = {
   projectId: $scope.projectId,
   startDate: $scope.formDataInit.startDate,
   endDate: $scope.formDataInit.endDate,
   status: "CLOSED",
  };

  AnalyticsService.getuserProductivityInTickets(data).then(function (response) {
   console.log("getuserProductivityInTickets", response);
   $scope.userProductivity = response.data;
 
  });
 }

 fetchgetuserProductivityInTickets();
}

trackflow.controller("TicketDashboardInProjectController", [
 "$scope",
 "$state",
 "AnalyticsService",
 "ProjectService",
 TicketDashboardInProjectController,
]);
