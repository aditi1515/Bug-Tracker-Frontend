var trackflow = angular.module("trackflow", ["ngRoute"]);

trackflow.config([
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider
      .when("/login", {
        templateUrl: "login/login.html",
        controller: "loginController",
      })
      .when("/dashboard", {
        template: "<h1>Dashboard</h1>",
      });
  },
]);
