function CompanyService($http, BASE_URL) {
 this.getCompanies = function (pageNo,pageSize,query) {
  return $http.get(BASE_URL + `company?pageNo=${pageNo}&&pageSize=${pageSize}&&query=${query}`);
 };

 this.saveCompany = function (company) {
  console.log("Company data: ", ...company);
  return $http.post(BASE_URL + "company", company, {
   headers: { "Content-Type": undefined },
  });
 };
}

trackflow.service("CompanyService", ["$http", "BASE_URL", CompanyService]);
