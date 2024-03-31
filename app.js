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
        //login
        url: "/login",
        templateUrl: "./login/login.html",
        controller: "loginController",
        resolve: {
          company: isCompanyExists,
        },
      })
      .state("forgotPassword", {
        url: "/forgotPassword",
        templateUrl: "./changepassword/forgotPassword.html",
        controller: "ForgotPasswordController",
      })
      .state("resetPassword", {
        url: "/resetPassword/:token",
        templateUrl: "./changepassword/resetPassword.html",
        controller: "ResetPasswordController",
      })
      .state("companyNotExists", {
        url: "/companyNotExists",
        templateUrl: "./Company/CompanyNotExists/companyNotExists.html",
        controller: "CompanyNotExistsController",
      })
      .state("company", {
        url: "/company",
        templateUrl: "./Company/company.html",
        controller: "companyController",
        redirectTo: "company.projects",
        resolve: {
          auth: isAuthenticated,
          company: isCompanyExists,
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
      .state("superAdminDashboard.base", {
        url: "/base",
        templateUrl: "./admin/dashboard/dashboardbase.html",
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
      })
      .state("company.roleManagement", {
        url: "/roleManagement",
        templateUrl: "./Company/tabs/Role/Role.html",
        controller: "RoleManagementController",
      })
      .state("company.activity", {
        url: "/activity",
        templateUrl: "./Company/tabs/activity/activity.html",
        controller: "ActivityController",
      })
      .state("superAdminDashboard.base.companyStats", {
        url: "/companyStats",
        templateUrl: "./admin/dashboard/tabs/stats/company/companyStat.html",
        controller: "CompanyStatController",
      })
      .state("superAdminDashboard.base.companySize", {
        url: "/companySize",
        templateUrl:
          "./admin/dashboard/tabs/stats/companyStats/companyStats.html",
        controller: "companyStatsController",
      })
      .state("superAdminDashboard.base.tickets", {
        url: "/tickets",
        templateUrl: "./admin/dashboard/tabs/stats/ticket/ticketStats.html",
        controller: "ticketStatsController",
      })
      .state("company.dashboard", {
        url: "/dashboard",
        templateUrl: "./Company/tabs/dashboard/dashboard.html",
        controller: "CompanyDashboardController",
      })
      .state("company.dashboard.people", {
        url: "/people",
        templateUrl: "./Company/tabs/dashboard/user/user.html",
        controller: "CompanyUserDashboardController",
      })
      .state("company.dashboard.projects", {
        url: "/projects",
        templateUrl:
          "./Company/tabs/dashboard/projects/projects.dashboard.html",
        controller: "CompanyProjectsDashboardController",
      })
      .state("company.projects.project.dashboard", {
        url: "/dashboard",
        templateUrl:
          "./Company/tabs/projects/project/dashboard/project.dashboard.html",
        controller: "CompanyProjectsBaseDashboardController",
        redirectTo: "company.projects.project.dashboard.people",
      })
      .state("company.projects.project.dashboard.people", {
        url: "/people",
        templateUrl:
          "./Company/tabs/projects/project/dashboard/people_dashboard/people.dashboard.html",
        controller: "PeopleDashboardInProjectController",
      })
      .state("company.projects.project.dashboard.tickets", {
        url: "/tickets",
        templateUrl:
          "./Company/tabs/projects/project/dashboard/ticket_dashboard/ticket_dashboard.html",
        controller: "TicketDashboardInProjectController",
      });

    $urlRouterProvider.otherwise("/");
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

//check super admin authentication
function isSuperAdminAuthenticated($q, UserService, $state) {
  return UserService.isAuthenticated()
    .then(function (user) {
      // User is authenticated, allow access to the dashboard
      console.log("User is authenticated: ", user);
      if (user.role.name !== "SUPER_ADMIN") {
        //is user is not superadmin
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

// to check whether the scompany exists in systenm or not
function isCompanyExists($q, CompanyService, subdomainService, $state) {
  var companyDomain = subdomainService.extractSubdomain();

  return CompanyService.getCompanyByDomain(companyDomain)
    .then(function (companyRespone) {
      return companyRespone.data.company;
    })
    .catch(function (err) {
      console.log("Error: ", err);
      if (err.status === 510) {
        $state.go("companyNotExists");
      }
      return $q.reject();
    });
}
