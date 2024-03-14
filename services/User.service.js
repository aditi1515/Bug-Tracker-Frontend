function UserService($q, $http, $state, BASE_URL, subdomainService) {
 //to get user by id
 this.getUser = function (id) {
  return $http.get(BASE_URL + "user/" + id);
 };

 this.createUser = function (user) {
  return $http.post(BASE_URL + "user/", user);
 };

 this.login = function (user) {
  return $http.post(BASE_URL + "user/login", user).then(function (response) {
   console.log("Login response: ", response.data);

   //check subdomain value and store token in localstorage
   var companyDomain = subdomainService.extractSubdomain();
   if (companyDomain && companyDomain !== "localhost") {
    localStorage.setItem(companyDomain + "_authToken", response.data.token);
   } else {
    localStorage.setItem("superadmin_authToken", response.data.token);
   }

   //store user in localStorage
   var user = response.data.user;

   if (user.role === "SUPER_ADMIN") {
    $state.go("superAdminDashboard");
   } else {
    $state.go("company");
   }
   return response;
  });
 };

 this.isAuthenticated = function () {
  var deferred = $q.defer();

  $http
   .get(BASE_URL + "user/")
   .then(function (response) {
    console.log("Authenticated: ", response.data);
    deferred.resolve(response.data.user);
   })
   .catch(function (error) {
    console.log("Authenticated Error: ", error);
    deferred.reject(error);
   });

  return deferred.promise;
 };

 this.getAllUsers = function (queryObject) {
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

  return $http.get(BASE_URL + `user/all?${queryString}`);
 };

 this.getAllUsersByProjectId = function (queryObject) {
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

  return $http.get(BASE_URL + `user/allByProjectId?${queryString}`);
 };

 this.logout = function () {
  var companyDomain = subdomainService.extractSubdomain();
  if (companyDomain && companyDomain !== "localhost") {
   localStorage.removeItem(companyDomain + "_authToken");
  } else {
   localStorage.removeItem("superadmin_authToken");
  }

  $state.go("login");
 };
}

trackflow.service("UserService", [
 "$q",
 "$http",
 "$state",
 "BASE_URL",
 "subdomainService",
 UserService,
]);
