function ActivityService($http, BASE_URL) {
 this.getAllLogs = function (model,projectId) {

  var query = model ? "?model=" + model : "";

  if(projectId){
    query = query + "&projectId=" + projectId;
  }

  return $http
   .get(BASE_URL + "log/all" + query)
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
