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
   })
   .state("login", {
    url: "/login",
    templateUrl: "./login/login.html",
    controller: "loginController",
   })
   .state("tracks", {
    url: "/tracks/{id}",
    templateUrl: "tracks.html",
    controller: "TracksCtrl",
   })
   .state("brand", {
    url: "/brand",
    templateUrl: "./brand/brand.html",
    controller: "BrandController",
   });

  $urlRouterProvider.otherwise("/");
 },
]);

trackflow.config(function ($httpProvider) {
 $httpProvider.interceptors.push("subdomainInterceptor");
});

trackflow.factory("subdomainInterceptor", function () {
 return {
  request: function (config) {
   // Extract subdomain from request URL
   console.log("Request URL: ", window.location.href);
   var subdomain = extractSubdomain(window.location.href);

   // Do something with the subdomain if needed
   console.log("Subdomain: ", subdomain);

   return config;
  },
 };
});

function extractSubdomain(url) {
 var subdomain = url.split("://")[1].split(".")[0];
 console.log("Extracted Subdomain: ", subdomain);
 return subdomain;
}
