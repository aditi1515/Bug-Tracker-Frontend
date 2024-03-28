function TicketStatsController($scope, AnalyticsService) {
 $scope.totalTickets = 0;
 $scope.ticketCountFormData = {};
 $scope.formDataInit = {
  startDate: new Date("2023-01-01"),
  endDate: new Date("2025-01-01"),
 };

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
   return data._id;
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
     backgroundColor: graphColors,
     borderColor: graphColors,
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
}

trackflow.controller("ticketStatsController", [
 "$scope",
 "AnalyticsService",
 TicketStatsController,
]);
