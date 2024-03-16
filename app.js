var trackflow = angular.module("trackflow", ["ui.router"]);

trackflow.config([
  "$stateProvider",
  "$urlRouterProvider",
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("home", {
        url: "/",
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
        redirectTo: "company.projects.base",
      })
      .state("company.projects.base", {
        url: "/base",
        templateUrl: "./Company/tabs/projects/projectsBasePage.html",
      })
      .state("company.projects.manage", {
        url: "/manage",
        templateUrl: "./Company/tabs/projects/manage/manage.html",
        controller: "companyProjectsManageController",
      })
      .state("company.projects.project", {
        url: "/:projectId",
        templateUrl: "./Company/tabs/projects/project/project.html",
        controller: "ProjectController",
      })
      .state("company.projects.project.ticket", {
        url: "/ticket",
        templateUrl: "./Company/tabs/projects/project/ticket/ticket.html",
        controller: "ticketController",
      });

    $urlRouterProvider.otherwise("/");
  },
]);

function isAuthenticated($q, UserService, $state) {
  return UserService.isAuthenticated()
    .then(function (user) {
      console.log("User is authenticated: ", user);
      if (
        user.role === "COMPANY_ADMIN" ||
        user.role === "EMPLOYEE" ||
        user.role === "PROJECT_MANAGER"
      )
        return user;
    })
    .catch(function () {
      $state.go("login");
      return $q.reject();
    });
}

//check super admin authentication
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
