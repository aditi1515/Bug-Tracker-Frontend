function LocationService($http) {
 this.getCoutries = function () {
  return $http.get("https://restcountries.eu/rest/v2/all");
 };
}

trackflow.service("LocationService", ["$http", LocationService]);
