function dashboardCompanyController(
 $scope,
 $timeout,
 CompanyService,
 ModalService,
 SnackbarService
) {
 $scope.addCompanyFormData = {
  company: {
   name: "Dominos",
   email: "info@dominos.com",
   domain: "dominos",
   city: "Ann Arbor",
   state: "Michigan",
   country: "United States",
  },
  admin: {
   firstname: "Aditi",
   lastname: "gemini",
   email: "aditi152003@gmail.com",
   phoneNumber: "+1 734 123 4567",
  },
 };

 $scope.addCompanyFormSubmit = function (modalId, addCompanyForm) {
  var formData = new FormData();

  // Append company details
  formData.append("company[name]", $scope.addCompanyFormData.company.name);
  formData.append("company[email]", $scope.addCompanyFormData.company.email);
  formData.append("company[city]", $scope.addCompanyFormData.company.city);
  formData.append("company[state]", $scope.addCompanyFormData.company.state);
  formData.append("company[domain]", $scope.addCompanyFormData.company.domain);
  formData.append(
   "company[country]",
   $scope.addCompanyFormData.company.country
  );
  formData.append("company[logo]", $scope.addCompanyFormData.company.logo);
  // Append admin details
  formData.append(
   "admin[firstname]",
   $scope.addCompanyFormData.admin.firstname
  );
  formData.append("admin[lastname]", $scope.addCompanyFormData.admin.lastname);
  formData.append("admin[email]", $scope.addCompanyFormData.admin.email);
  formData.append(
   "admin[phoneNumber]",
   $scope.addCompanyFormData.admin.phoneNumber
  );

  console.log("Form data: ", ...formData);

  CompanyService.saveCompany(formData)
   .then(function (response) {
    console.log("Company saved successfully: ", response);
    SnackbarService.showAlert(
     "Company and Admin saved successfully ",
     2000,
     "success"
    );
    getCompanies()
    ModalService.hideModal(modalId);
   })
   .catch(function (err) {
    console.error("Error saving company: ", err.data.message);
    console.log(addCompanyForm);
    addCompanyForm.$invalid = true;
    addCompanyForm.errorMessage = err.data.message;
   });
 };

 $scope.companiesData = {};

 function getCompanies(
  pageNo = 1,
  pageSize = 10,
  query = $scope.companiesData.query || ""
 ) {
  CompanyService.getCompanies(pageNo, pageSize, query)
   .then(function (response) {
    $scope.companiesData = response.data;
   })
   .catch(function (err) {
    console.error("Error getting companies: ", err);
   });
 }

 getCompanies();

 $scope.pageChange = function (pageNo, pageSize) {
  console.log("Page changed: ", pageNo);
  getCompanies(pageNo, pageSize);
 };

 function searchCompanies(query) {
  console.log("Search query: ", query);
  getCompanies(
   $scope.companiesData.currentPage,
   $scope.companiesData.pageSize,
   query
  );
 }

 var debounceTimeout;

 $scope.debounceSearch = function () {
  console.log("Debouncing...");
  $timeout.cancel(debounceTimeout);
  debounceTimeout = $timeout(function () {
   searchCompanies($scope.companiesData.query);
  }, 1000);
 };
}

trackflow.controller("dashboardCompanyController", [
 "$scope",
 "$timeout",
 "CompanyService",
 "ModalService",
 "SnackbarService",
 dashboardCompanyController,
]);
