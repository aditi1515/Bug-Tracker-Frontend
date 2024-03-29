function AnalyticsService($http, BASE_URL) {
 this.getCountCompanies = function (body) {
  return $http
   .post(BASE_URL + "analytics/numberOfCompanies", body)
   .then(function (response) {
    console.log("getCountCompanies", response);
    return response;
   })
   .catch(function (err) {
    console.log("Error getting companies: ", err);
    return err;
   });
 };

 this.getLocationWiseCompanyCount = function (body) {
  return $http
   .post(BASE_URL + "analytics/countCompanyByLocation", body)
   .then(function (response) {
    console.log("getLocationWiseCompanyCount", response);
    return response;
   })
   .catch(function (err) {
    console.log("Error getting location wise company count: ", err);
    return err;
   });
 };

 this.getCompanySize = function () {
  return $http
   .get(BASE_URL + "analytics/companySize")
   .then(function (response) {
    console.log("getCompanySize", response);
    return response;
   })
   .catch(function (err) {
    console.log("Error getting company size: ", err);
    return err;
   });
 };

 this.getProjectsInCompany = function (limit, top) {
  return $http
   .get(
    BASE_URL + "analytics/countProjectsInCompany?limit=" + limit + "&top=" + top
   )
   .then(function (response) {
    console.log("getProjectsInCompany", response);
    return response;
   })
   .catch(function (err) {
    console.log("Error getting projects in company: ", err);
    return err;
   });
 };

 this.getProjectCount = function (body) {
  return $http
   .post(BASE_URL + "analytics/numberOfProjects", body)
   .then(function (response) {
    console.log("getProjectCount", response);
    return response;
   })
   .catch(function (err) {
    console.log("Error getting project count: ", err);
    return err;
   });
 };

 this.getTotalTickets = function (body) {
  return $http
   .post(BASE_URL + "analytics/totalTickets", body)
   .then(function (response) {
    console.log("getTotalTickets", response);
    return response;
   })
   .catch(function (err) {
    console.log("Error getting total tickets: ", err);
    return err;
   });
 };

 this.companyWiseTicketCounts = function () {
  return $http
   .get(BASE_URL + "analytics/companyWiseTicketCounts")
   .then(function (response) {
    console.log("companyWiseTicketCounts", response);
    return response;
   })
   .catch(function (err) {
    console.log("Error getting company wise ticket counts: ", err);
    return err;
   });
 };

 this.getprojectWiseUsers = function () {
  return $http
   .get(BASE_URL + "analytics/projectWiseUsers")
   .then(function (response) {
    console.log("getprojectWiseUsers", response);
    return response;
   })
   .catch(function (err) {
    console.log("Error getting project wise users: ", err);
    return err;
   });
 
 }

 this.getprojectWiseTickets = function () {
  return $http
   .get(BASE_URL + "analytics/projectWiseTickets")
   .then(function (response) {
    console.log("getprojectWiseTickets", response);
    return response;
   })
   .catch(function (err) {
    console.log("Error getting project wise tickets: ", err);
    return err;
   });
 }

 this.getUsersInProject = function (projectId) {
  console.log("projectId", projectId);
  return $http
   .get(BASE_URL + "analytics/usersInProject/"+projectId)
   .then(function (response) {
    console.log("getUsersInAProject", response);
    return response;
   })
   .catch(function (err) {
    console.log("Error getting users in a project: ", err);
    return err;
   });
 
 }


}

trackflow.service("AnalyticsService", ["$http", "BASE_URL", AnalyticsService]);
