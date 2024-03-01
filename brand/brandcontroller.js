trackflow.controller("BrandController", function ($scope, BrandService) {
 // Watch for changes in the subdomain
 $scope.$watch(
  function () {
   console.log("Subdomain: ", window.location.hostname.split(".")[0]);
   return window.location.hostname.split(".")[0]; // Extract subdomain from URL
  },
  function (newSubdomain, oldSubdomain) {
   // Fetch brand details based on the new subdomain
   console.log("Subdomain changed to: ", newSubdomain);
   BrandService.fetchBrand(newSubdomain).then(function (brand) {
    $scope.brand = brand;
   });
  },
  true
 );
});

// Define a service to fetch brand details
trackflow.factory("BrandService", function ($http) {
 return {
  fetchBrand: function (subdomain) {
   console.log("Fetching brand details for subdomain: ", subdomain);
   return $http.get("/api/brands/" + subdomain).then(function (response) {
    return response.data;
   });
  },
 };
});
