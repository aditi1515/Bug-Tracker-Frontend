function CompanyService($http, BASE_URL) {
 this.getCompany = function () {
  return $http.get("/api/company");
 };

 this.saveCompany = function (company) {
  console.log("Company data: ", ...company);
  return $http.post(BASE_URL + "/company", company, {
   headers: { "Content-Type": undefined },
  });
 };
}

trackflow.service("CompanyService", ["$http", "BASE_URL", CompanyService]);
