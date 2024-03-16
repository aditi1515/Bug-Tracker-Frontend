function dashboardCompanyController(
 $scope,
 $timeout,
 CompanyService,
 ModalService,
 SnackbarService
) {

 $scope.addCompanyFormSubmit = function (modalId, addCompanyForm) {
  CompanyService.saveCompany($scope.addCompanyFormData)
   .then(function (response) {
    console.log("Company saved successfully: ", response);
    SnackbarService.showAlert(
     "Company and Admin saved successfully ",
     2000,
     "success"
    );
    $scope.addCompanyFormData = {}; // reset form data
    addCompanyForm.$setPristine();
    addCompanyForm.$setUntouched();
    getCompanies();
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

 //display all companies
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

 //pn chaning page number
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

 $scope.launchModal = function (modalId) {
  ModalService.showModal(modalId);
 };

 //change company status
 $scope.changeCompanyStatus = function (companyId) {
  console.log(companyId);
  CompanyService.changeCompanyStatus(companyId)
   .then(function (response) {
    console.log("Company status changed", response);
    getCompanies(
     $scope.companiesData.currentPage,
     $scope.companiesData.pageSize
    );
   })
   .catch(function (error) {
    console.log("Error while changing company status", error.message);
   });
 };
}

trackflow.controller("dashboardCompanyController", [
 "$scope",
 "$timeout",
 "CompanyService",
 "ModalService",
 "SnackbarService",
 "FormDataFactory",
 dashboardCompanyController,
]);
