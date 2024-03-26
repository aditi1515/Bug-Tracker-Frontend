function ActivityService($http, BASE_URL) {
 this.getAllLogs = function () {
  return $http
   .get(BASE_URL + "log/all")
   .then(function (response) {
    console.log("response: " + response);
    return response.data;
   })
   .catch(function (error) {
    return error;
   });
 };
}

trackflow.service("ActivityService", ["$http", "BASE_URL", ActivityService]);
