function CompanyStatController($scope, AnalyticsService) {
 $scope.formDataInit = {
  startDate: new Date(new Date().getFullYear(), 0, 1),
  endDate: new Date(new Date().getFullYear(), 11, 31),
  startYear: new Date().getFullYear(),
  endYear: new Date().getFullYear(),
  startMonth: new Date().getMonth(),
  endMonth: new Date().getMonth() + 1,
 };
 $scope.currtCWPpage = 1;
 $scope.totalPagesInCWP = 0;
 $scope.locationWiseCompanyFormData = {
  locationOption: "country",
 };

 $scope.companyTrendPage = 1;
 $scope.totalPagesInCompanyTrend = 0;

 $scope.projectTrendPage = 1;
 $scope.totalPagesInProjectTrend = 0;

 $scope.ticketTrendPage = 1;
 $scope.totalPagesInTicketTrend = 0;

 $scope.trendCountFormData = {
  startDate: new Date(new Date().getFullYear(), 0, 1),
  endDate: new Date(new Date().getFullYear(), 11, 31),
  startYear: new Date().getFullYear(),
  endYear: new Date().getFullYear(),
  startMonth: new Date().getMonth(),
  endMonth: new Date().getMonth() + 1,
 };

 $scope.companyCountFormData = {};
 $scope.trendCountOption = "month";

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

 // $scope.loyalCompanyLimitChange = function () {
 //   mostLoyalPartners();
 // };

 // function displayLoyalPartnerChart() {
 //   var data = $scope.mostLoyalPartnersData;
 //   var keys = data.map(function (d) {
 //     return d.name;
 //   });
 //   var values = data.map(function (d) {
 //     return d.createdAt;
 //   });

 //   var ctx = document.getElementById("loyalPartnersChart");

 //   var existingChart = Chart.getChart(ctx);
 //   if (existingChart) {
 //     existingChart.destroy();
 //   }
 //   new Chart(ctx, {
 //     type: "bar",
 //     data: {
 //       labels: keys,
 //       datasets: [
 //         {
 //           label: "Company",
 //           data: values,
 //           backgroundColor: graphColors.sort(function () {
 //             return Math.random() - 0.5;
 //           }),
 //         },
 //       ],
 //     },
 //     options: {

 //       responsive: true,
 //       legend: {
 //         position: "bottom",
 //       },
 //       ticks: {
 //         callback: function (value) {
 //           const date = new Date(Number(value) * 1000);
 //           return date.toISOString().substring(11,23);
 //         }        },
 //       plugins: {
 //         title: {
 //           display: true,
 //           text: "Most Loyal Partners",
 //         },
 //       },

 //     },
 //   });
 // }

 function displayLoyalPartnerChart() {
  var data = $scope.mostLoyalPartnersData;

  var labels = data.map(function (d) {
   // Format createdAt dates into readable strings
   var date = new Date(d.createdAt);
   var day = date.getDate().toString().padStart(2, "0"); // Get day and pad with leading zero if needed
   var month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month (months are zero-based) and pad with leading zero if needed
   var year = date.getFullYear(); // Get full year
   return `${day}-${month}-${year}`;
  });

  var values = data.map(function (d) {
   // Use company names for the Y-axis
   return d.domain;
  });

  var ctx = document.getElementById("loyalPartnersChart");

  var existingChart = Chart.getChart(ctx);
  if (existingChart) {
   existingChart.destroy();
  }

  new Chart(ctx, {
   type: "bar",
   data: {
    labels: labels, // Use formatted date strings as X-axis labels
    datasets: [
     {
      label: "Company",
      data: values, // Use company names for Y-axis values
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
      text: "Most Loyal Partners",
     },
    },
   },
  });
 }

 //company count Trend
 function companyCountTrend() {
  var data = {
   option: $scope.trendCountOption,
   startDate:
    $scope.trendCountFormData.startDate || $scope.formDataInit.startDate,
   endDate: $scope.trendCountFormData.endDate || $scope.formDataInit.endDate,
  };

  AnalyticsService.getcompanyCountTrend(data).then(function (response) {
   $scope.companyTrendData = response.data;
   $scope.totalPagesInCompanyTrend = Math.ceil(
    $scope.companyTrendData.length / 20
   );
   displayCompanyTrendDataChart();
  });
 }

 $scope.companyTrendPageChange = function (pageNo) {
  $scope.companyTrendPage = pageNo;
  displayCompanyTrendDataChart();
 };

 function displayCompanyTrendDataChart() {
  var pageSize = 20;
  var chartData = $scope.companyTrendData;
  $scope.totalPagesInCompanyTrend = Math.ceil(chartData.length / pageSize);
  var startIndex = ($scope.companyTrendPage - 1) * pageSize;
  chartData = chartData.slice(startIndex, Math.min(startIndex + pageSize, chartData.length));

  var months = [
   "Jan",
   "Feb",
   "Mar",
   "Apr",
   "May",
   "Jun",
   "Jul",
   "Aug",
   "Sep",
   "Oct",
   "Nov",
   "Dec",
  ];
  var chartData = $scope.companyTrendData;
  if ($scope.trendCountOption == "day") {
   var labels = chartData.map(function (data) {
    return (
     data._id.day + " " + months[data._id.month - 1] + " " + data._id.year
    );
   });
  } else if ($scope.trendCountOption == "month") {
   var labels = chartData.map(function (data) {
    return months[data._id.month - 1] + " " + data._id.year;
   });
  } else {
   var labels = chartData.map(function (data) {
    return data._id.year;
   });
  }
  var values = chartData.map(function (data) {
   return data.companyCount;
  });

  var data = {
   labels: labels,
   datasets: [
    {
     label: "Companies",
     data: values,
     backgroundColor: graphColors.sort(function () {
      return Math.random() - 0.5;
     }),
    },
   ],
  };

  var chartDiv = document.getElementById("companyCountTrend-chart");

  var existingChart = Chart.getChart(chartDiv);
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
       text: $scope.companyTrendCountOption,
      },
     },
     y: {
      beginAtZero: true,
      title: {
       display: true,
       text: "Company Count",
      },
      ticks: {
       stepSize: 1,
      },
     },
    },
   },
  });
 }

 $scope.companyCountTrendOptionChange = function () {
  companyCountTrend();
 };
 //project count trend
 function projectCountTrend() {
  var data = {
   option: $scope.trendCountOption,
   startDate:
    $scope.trendCountFormData.startDate || $scope.formDataInit.startDate,
   endDate: $scope.trendCountFormData.endDate || $scope.formDataInit.endDate,
  };
  AnalyticsService.getProjectCountTrend(data).then(function (response) {
   $scope.projectTrendData = response.data;
   $scope.totalPagesInProjectTrend = Math.ceil(
    $scope.projectTrendData.length / 20
   );
   displayProjectTrendDataChart();
  });
 }

 $scope.projectTrendPageChange = function (pageNo) {
  $scope.projectTrendPage = pageNo;
  displayProjectTrendDataChart();
 };

 function displayProjectTrendDataChart() {
  var pageSize = 20;
  var chartData = $scope.projectTrendData;
  $scope.totalPagesInProjectTrend = Math.ceil(chartData.length / pageSize);
  var startIndex = ($scope.projectTrendPage - 1) * pageSize;
  chartData = chartData.slice(startIndex, Math.min(startIndex + pageSize, chartData.length));

  var months = [
   "Jan",
   "Feb",
   "Mar",
   "Apr",
   "May",
   "Jun",
   "Jul",
   "Aug",
   "Sep",
   "Oct",
   "Nov",
   "Dec",
  ];
  if ($scope.trendCountOption == "day") {
   var labels = chartData.map(function (data) {
    return (
     data._id.day + " " + months[data._id.month - 1] + " " + data._id.year
    );
   });
  } else if ($scope.trendCountOption == "month") {
   var labels = chartData.map(function (data) {
    return months[data._id.month - 1] + " " + data._id.year;
   });
  } else {
   var labels = chartData.map(function (data) {
    return data._id.year;
   });
  }
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

  var chartDiv = document.getElementById("projectCountTrend-chart");

  var existingChart = Chart.getChart(chartDiv);
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
       text: $scope.projectTrendCountOption,
      },
     },
     y: {
      beginAtZero: true,
      title: {
       display: true,
       text: "Project Count",
      },
      ticks: {
       stepSize: 1,
      },
     },
    },
   },
  });
 }

 $scope.projectCountTrendOptionChange = function () {
  projectCountTrend();
 };

 function ticketCountTrend() {
  var data = {
   option: $scope.trendCountOption,
   startDate:
    $scope.trendCountFormData.startDate || $scope.formDataInit.startDate,
   endDate: $scope.trendCountFormData.endDate || $scope.formDataInit.endDate,
  };
  AnalyticsService.getticketCountTrend(data).then(function (response) {
   $scope.ticketTrendData = response.data;
   $scope.totalPagesInTicketTrend = Math.ceil(
    $scope.ticketTrendData.length / 20
   );
   displayTicketTrendDataChart();
  });
 }

 $scope.ticketTrendPageChange = function (pageNo) {
  $scope.ticketTrendPage = pageNo;
  displayTicketTrendDataChart();
 };

 function displayTicketTrendDataChart() {


  var chartData = $scope.ticketTrendData;

  var pageSize = 20;
  $scope.totalPagesInTicketTrend = Math.ceil(chartData.length / pageSize);
  var startIndex = ($scope.ticketTrendPage - 1) * pageSize;
  chartData = chartData.slice(startIndex, Math.min(startIndex + pageSize, chartData.length));
  

  var months = [
   "Jan",
   "Feb",
   "Mar",
   "Apr",
   "May",
   "Jun",
   "Jul",
   "Aug",
   "Sep",
   "Oct",
   "Nov",
   "Dec",
  ];
  if ($scope.trendCountOption == "day") {
   var labels = chartData.map(function (data) {
    return (
     data._id.day + " " + months[data._id.month - 1] + " " + data._id.year
    );
   });
  } else if ($scope.trendCountOption == "month") {
   var labels = chartData.map(function (data) {
    return months[data._id.month - 1] + " " + data._id.year;
   });
  } else {
   var labels = chartData.map(function (data) {
    return data._id.year;
   });
  }
  var values = chartData.map(function (data) {
   return data.ticketCount;
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
    },
   ],
  };

  var chartDiv = document.getElementById("ticketCountTrend-chart");

  var existingChart = Chart.getChart(chartDiv);
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
       text: $scope.ticketTrendCountOption,
      },
     },
     y: {
      beginAtZero: true,
      title: {
       display: true,
       text: "Ticket Count",
      },
      ticks: {
       stepSize: 1,
      },
     },
    },
   },
  });
 }

 $scope.ticketCountTrendOptionChange = function () {
  ticketCountTrend();
 };

 $scope.countTrendOptionChange = function () {
  console.log("trendCountOption", $scope.trendCountOption);
  console.log(
   "trendCountFormData date",
   $scope.trendCountFormData.startDate,
   $scope.trendCountFormData.endDate
  );

  if ($scope.trendCountOption == "year") {
   $scope.trendCountFormData.startDate = new Date(
    $scope.trendCountFormData.startYear,
    0,
    1
   );
   $scope.trendCountFormData.endDate = new Date(
    $scope.trendCountFormData.endYear,
    11,
    31
   );
  } else if ($scope.trendCountOption == "month") {
   $scope.trendCountFormData.startDate = new Date(
    $scope.trendCountFormData.startYear,
    $scope.trendCountFormData.startMonth,
    1
   );
   $scope.trendCountFormData.endDate = new Date(
    $scope.trendCountFormData.endYear,
    $scope.trendCountFormData.endMonth,
    0
   );
  }

  console.log("trendCountFormData", $scope.trendCountFormData);

  companyCountTrend();
  projectCountTrend();
  ticketCountTrend();
 };

 $scope.countTrendOptionChange();
}

trackflow.controller("CompanyStatController", [
 "$scope",
 "AnalyticsService",
 CompanyStatController,
]);
