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