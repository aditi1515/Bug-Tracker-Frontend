var trackflow = angular.module("trackflow", ["ui.router"]);

trackflow.config([
 "$stateProvider",
 "$urlRouterProvider",
 function ($stateProvider, $urlRouterProvider) {
  $stateProvider
   .state("home", {
    url: "/",
    // templateUrl: "home.html",
    // controller: "MainCtrl",
    controller: "MainController",
   })
   .state("login", {
    url: "/login",
    templateUrl: "./login/login.html",
    controller: "loginController",
   })
   .state("company", {
    url: "/company",
    templateUrl: "./Company/company.html",
    controller: "companyController",
   })
   .state("superAdminDashboard", {
    url: "/dashboard",
    templateUrl: "./admin/dashboard/dashboard.html",
    controller: "dashboardController",
    resolve: {
     auth: function (UserService, $state, $q) {
      return UserService.isAuthenticated()
       .then(function (user) {
        // User is authenticated, allow access to the dashboard
        console.log("User is authenticated: ", user);
        if (user.role !== "SUPER_ADMIN") {
         $state.go("login");
         return $q.reject();
        }
        return user; // Resolve with the user object
       })
       .catch(function () {
        // User is not authenticated, redirect to login page
        $state.go("login");
        // Rejecting the promise to prevent state transition
        return $q.reject();
       });
     },
    },
   })
   .state("superAdminDashboard.company", {
    url: "/company",
    templateUrl: "./admin/dashboard/tabs/dashboard_company.html",
    controller: "dashboardCompanyController",
   });

  $urlRouterProvider.otherwise("/");
 },
]);

trackflow.controller("MainController", function ($scope, SnackbarService) {
 $scope.showSnackbar = false;

 $scope.SnackbarService = SnackbarService;
});

trackflow.config(function ($httpProvider) {
 $httpProvider.interceptors.push("BaseUrlInterceptor");
});


// subdomain service
trackflow.service("subdomainService", function () {
 this.extractSubdomain = function () {
  var subdomain = window.location.hostname.split(".")[0];

  return subdomain;
 };
});

//backend base url 
trackflow.constant("BASE_URL", "http://localhost:3000/api/");

trackflow.service("BaseUrlInterceptor", [
 "subdomainService",
 function (subdomainService) {
  this.request = function (config) {
   // Extract subdomain using subdomainService
   var subdomain = subdomainService.extractSubdomain();

   // Set company_id from subdomain
   config.headers = config.headers || {};

   if (subdomain !== "localhost") {
    config.headers["x_company_domain"] = subdomain;
   }

   // Set authToken from localStorage
   var authToken =
    subdomain === "localhost"
     ? localStorage.getItem("superadmin_authtoken")
     : localStorage.getItem(subdomain + "_authToken");
   if (authToken) {
    config.headers["Authorization"] = "Bearer " + authToken;
   }

   return config;
  };

  this.response = function (response) {
   // Optional: Modify responses here if needed
   return response;
  };
 },
]);

trackflow.directive("fileModel", [
 "$parse",
 function ($parse) {
  return {
   restrict: "A",
   link: function (scope, element, attrs) {
    var model = $parse(attrs.fileModel);
    var modelSetter = model.assign;

    element.bind("change", function () {
     scope.$apply(function () {
      if (element[0].files.length > 1) {
       modelSetter(scope, element[0].files);
      } else {
       modelSetter(scope, element[0].files[0]);
      }
     });
    });
   },
  };
 },
]);
