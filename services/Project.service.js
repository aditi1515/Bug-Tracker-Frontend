function ProjectService($http, BASE_URL) {
 this.addProject = function (project) {
  var formdata = new FormData();

  formdata.append("name", project.name);
  formdata.append("description", project.description);
  formdata.append("dueDate", project.dueDate);
  if (project.members) {
   formdata.append("members", JSON.stringify(project.members));
  }
  formdata.append("status", project.status);
  formdata.append("logo", project.logo);
  formdata.append("key", project.key);
  

  return $http.post(BASE_URL + "project", formdata, {
   headers: { "Content-Type": undefined },
  });
 };



 
 this.getAllProjects = function (queryObject) {
  const params = new URLSearchParams();

  // Append all parameters from the queryObject
  for (const key in queryObject) {
   if (queryObject.hasOwnProperty(key) && queryObject[key] !== undefined) {
    if (key === "query") {
     // If it's the 'query' object, append its properties
     for (const queryKey in queryObject.query) {
      if (queryObject.query.hasOwnProperty(queryKey)) {
       params.append(queryKey, queryObject.query[queryKey]);
      }
     }
    } else {
     // For other parameters, directly append them
     params.append(key, queryObject[key]);
    }
   }
  }

  const queryString = params.toString();
  console.log("Query string: ", queryString);
  return $http.get(BASE_URL + "project/all?" + queryString);
 };
 this.updateProject = function (project) {
  return $http.put(BASE_URL + "project", project);
 };
 this.deleteProject = function (projectId) {
  return $http.delete(BASE_URL + "project/" + projectId);
 };
 this.getProjectById = function (projectId) {
  return $http.get(BASE_URL + "project/" + projectId);
 };
}

trackflow.service("ProjectService", ["$http", "BASE_URL", ProjectService]);
