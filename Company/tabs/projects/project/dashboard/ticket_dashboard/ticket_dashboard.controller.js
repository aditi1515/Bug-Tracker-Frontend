function TicketDashboardInProjectController($scope, $state, AnalyticsService) {
  $scope.projectId = $state.params.projectId;
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
      displayPriorityWiseTicketChart()

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
            backgroundColor: ["#e3e2ff", "#d1da90", "#ffdcdc"],
          },
        ],
        options: {
          responsive: true,
          legend: {
            position: "bottom",
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
            backgroundColor: ["#e3e2ff", "#d1da90", "#ffdcdc"],
          },
        ],
        options: {
          responsive: true,
          legend: {
            position: "bottom",
          },
        },
      },
    });
  }
}

trackflow.controller("TicketDashboardInProjectController", [
  "$scope",
  "$state",
  "AnalyticsService",
  "ProjectService",
  TicketDashboardInProjectController,
]);
