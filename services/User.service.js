function UserService($q, $http, $state, BASE_URL, subdomainService) {
  //to get user by id
  this.getUser = function (id) {
    return $http.get("/api/users/" + id);
  };

  this.login = function (user) {
    return $http.post(BASE_URL + "user/login", user).then(function (response) {
      console.log("Login response: ", response.data);

      //check subdomain value and store token in localstorage
      var companyName = subdomainService.extractSubdomain();
      if (companyName && companyName !== "localhost") {
        localStorage.setItem(companyName + "_authtoken", response.data.token);
      } else {
        localStorage.setItem("superadmin_authtoken", response.data.token);
      }

      //store user in localStorage
      var user = response.data.user;
      localStorage.setItem("user", JSON.stringify(user));

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
}

trackflow.service("UserService", [
  "$q",
  "$http",
  "$state",
  "BASE_URL",
  "subdomainService",
  UserService,
]);
