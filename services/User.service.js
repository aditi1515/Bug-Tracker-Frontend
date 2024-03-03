function UserService($q, $http, $state, BASE_URL, subdomainService) {
 this.getUser = function (id) {
  return $http.get("/api/users/" + id);
 };

 this.login = function (user) {
  return $http.post(BASE_URL + "user/login", user).then(function (response) {
   console.log("Login response: ", response.data);

   var companyName = subdomainService.extractSubdomain();
   if (companyName && companyName !== "localhost") {
    localStorage.setItem(companyName + "_authtoken", response.data.token);
   } else {
    localStorage.setItem("superadmin_authtoken", response.data.token);
   }

   var user = response.data.user;
   localStorage.setItem("user", JSON.stringify(user));

   if (user.role === "SUPER_ADMIN") {
    $state.go("superAdminDasboard");
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
}

trackflow.service("UserService", [
 "$q",
 "$http",
 "$state",
 "BASE_URL",
 "subdomainService",
 UserService,
]);
