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
    redirectTo: "company.projects",
    resolve: {
     auth: isAuthenticated,
    },
   })
   .state("superAdminDashboard", {
    url: "/dashboard",
    templateUrl: "./admin/dashboard/dashboard.html",
    controller: "dashboardController",
    redirectTo: "superAdminDashboard.company",
    resolve: {
     auth: isSuperAdminAuthenticated,
    },
   })
   .state("superAdminDashboard.company", {
    url: "/company",
    templateUrl: "./admin/dashboard/tabs/dashboard_company.html",
    controller: "dashboardCompanyController",
   })
   .state("company.people", {
    url: "/people",
    templateUrl: "./Company/tabs/people/people.html",
    controller: "companyPeopleController",
   })
   .state("company.projects", {
    url: "/projects",
    templateUrl: "./Company/tabs/projects/projects.html",
    controller: "companyProjectsController",
   })
   .state("company.projects.manage", {
    url: "/manage",
    templateUrl: "./Company/tabs/projects/manage/manage.html",
    controller: "companyProjectsManageController",
   })
   .state("company.projects.project", {
    templateUrl: "./Company/tabs/projects/project/project.html",
   })
   .state("company.projects.project.ticket", {
    url: "/ticket/:projectId", // Define projectId as a parameter in the URL
    templateUrl: "./Company/tabs/projects/project/ticket/ticket.html",
    controller: "ticketController",
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
     ? localStorage.getItem("superadmin_authToken")
     : localStorage.getItem(subdomain + "_authToken");

   if (authToken) {
    config.headers["Authorization"] = "Bearer " + authToken;
   }

   return config;
  };

  this.response = function (response) {
   if (response.status === 510) {
    $state.go("login");
   }
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

function isAuthenticated($q, UserService, $state) {
 return UserService.isAuthenticated()
  .then(function (user) {
   console.log("User is authenticated: ", user);
   return user;
  })
  .catch(function () {
   $state.go("login");
   return $q.reject();
  });
}

function isSuperAdminAuthenticated($q, UserService, $state) {
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
}

function isAdmin($q, UserService, $state, user) {
 if (user.role !== "SUPER_ADMIN") {
  $state.go("login");
  return $q.reject();
 }
 return user;
}
trackflow.directive("select2Init", function () {
 return {
  restrict: "A",
  scope: {
   placeholder: "@",
  },
  link: function (scope, element, attrs) {
   // Initialize Select2 when the element is ready

   function formatOption(option) {
    if (!option.id) {
     return option.text;
    }

    var optimage = $(option.element).attr("data-image");
    console.log("Option: ", optimage);
    var imageUrl = optimage;
    var optionWithImage = $(
     '<span><img src="' +
      imageUrl +
      '" class="select-option-image" /> ' +
      option.text +
      "</span>"
    );
    return optionWithImage;
   }

   $(element).select2({
    templateResult: formatOption,
    templateSelection: formatOption,
    theme: "classic",
    closeOnSelect: false,
    placeholder: scope.placeholder,
   });
  },
 };
});
