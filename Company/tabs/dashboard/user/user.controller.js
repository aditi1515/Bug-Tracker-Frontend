function CompanyUserDashboardController($scope, AnalyticsService) {
  $scope.formDataInit = {
    startDate: new Date("2023-01-01"),
    endDate: new Date("2024-12-31"),
  };

  
  $scope.peopleAnalyticsSearchData = {}

  $scope.roleBasedEmployeeCountData = {};
  
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
        $scope.peopleAnalyticsSearchData.startDate || $scope.formDataInit.startDate,
      endDate: $scope.peopleAnalyticsSearchData.endDate || $scope.formDataInit.endDate,
    };


    AnalyticsService.getCompanySize(body).then(function (response) {
      $scope.companySize = response.data[0];
      displayCompanySizeChart();
    });
  }

  fetchCompanySize();

  $scope.countUserDateChanged = function () {
    fetchCompanySize();
  };

  function getUsersWithMostProjects() {
    var body = {
      startDate:
        $scope.peopleAnalyticsSearchData.startDate ||
        $scope.formDataInit.startDate,
      endDate:
        $scope.peopleAnalyticsSearchData.endDate ||
        $scope.formDataInit.endDate,
    };

    AnalyticsService.getUsersWithMostProjects(body).then(function (response) {
      $scope.usersWithMostProjects = response.data;
      displayUsersWithMostProjectsChart();
    });
  }

  getUsersWithMostProjects();

  function displayUsersWithMostProjectsChart() {
    var data = $scope.usersWithMostProjects;

    var keys = data.map(function (d) {
      return d.details.user.firstname;
    });
    var values = data.map(function (d) {
      return d.totalProjects;
    });

    var ctx = document.getElementById("usersWithMostProject-chart");

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
            label: "ProjectCount",
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
            text: "User Project Count",
          },
        },
      },
    });
  }

  $scope.peopleAnalyticsSearchDataChanged = function () {
    fetchCompanySize()
    getUsersWithMostProjects();
    getUsersWithMostTickets()
  };

  function employeesRoleDistribution() {
    AnalyticsService.getRoleBasedEmployeesCount().then(function (response) {
      $scope.roleBasedEmployeeCountData = response.data;
      displayemployeesRoleDistribution()
    });
  }


  function displayemployeesRoleDistribution() {

    var data = $scope.roleBasedEmployeeCountData;

    var keys = data.map(function (d) {
      return d._id;
    });
    var values = data.map(function (d) {
      return d.roleBasedCount;
    });

    var ctx = document.getElementById("EmployeeRoleDistribution");


    var existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: keys,
        datasets: [
          {
            label: "Role",
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
        plugins: {
          title: {
            display: true,
            text: "Employee Role Distribution",
          },
        },
      },
    });

  }


  employeesRoleDistribution();


  function getUsersWithMostTickets() {
    var body = {
      startDate:
        $scope.peopleAnalyticsSearchData.startDate ||
        $scope.formDataInit.startDate,
      endDate:
        $scope.peopleAnalyticsSearchData.endDate ||
        $scope.formDataInit.endDate,
    };

    AnalyticsService.getUsersWithMostTickets(body).then(function (response) {
      $scope.usersWithMostTickets = response.data;
      displayUsersWithMostTicketsChart();
    });
  }

  getUsersWithMostTickets();

  function displayUsersWithMostTicketsChart() {
    var data = $scope.usersWithMostTickets;
    console.log("displayUsersWithMostTciketsChart", data);

    var keys = data.map(function (d) {
      return  d._id.firstname + " " +  d._id.lastname;
    });
    var values = data.map(function (d) {
      return d.totalTickets;
    });

    var ctx = document.getElementById("usersWithMostTickets-chart");

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
            label: "Ticket Count",
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
            text: "User Ticket Count",
          },
        },
      },
    });
  }

}

trackflow.controller("CompanyUserDashboardController", [
  "$scope",
  "AnalyticsService",
  CompanyUserDashboardController,
]);
