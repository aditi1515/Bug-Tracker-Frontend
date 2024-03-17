function dashboardCompanyController(
  $scope,
  $timeout,
  CompanyService,
  ModalService,
  SnackbarService
) {
  $scope.addCompanyFormData = {
    name: "Acme Corporation",
    domain: "acme",
    city: "New York",
    state: "NY",
    country: "USA",

    admin: {
      firstname: "John",
      lastname: "Doe",
      email: "john.doe@example.com",
      phoneNumber: "123-456-7890",
    },
  };
  $scope.companiesData = {};
  $scope.isEditing = false;
  $scope.currentEditingCompanyId = null;

  $scope.addCompanyFormSubmit = function (modalId, addCompanyForm) {
    console.log("Form data: ", $scope.addCompanyFormData);
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

  $scope.editCompany = function (company, modalId) {
    console.log(company);
    var editCompanyData = {
      name: company.name,
      domain: company.domain,
      city: company.city,
      state: company.state,
      country: company.country,
      logo: company.logo,
      isEnabled: company.isEnabled,
      admin: {
        firstname: company.admin.firstname,
        lastname: company.admin.lastname,
        email: company.admin.email,
        phoneNumber: company.admin.phoneNumber,
      },
    };
    $scope.currentEditingCompanyId = company._id;
    $scope.addCompanyFormData = editCompanyData;
    $scope.isEditing = true;
    ModalService.showModal(modalId);

    console.log($scope.addCompanyFormData);
  };

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
    $scope.isEditing = false;
    $scope.addCompanyFormData = {};
    ModalService.showModal(modalId);
  };

  //edit company form submit
  $scope.editCompanyFormSubmit = function (modalId, editCompanyForm) {
    console.log("Form data: ", $scope.addCompanyFormData);
    CompanyService.editCompany($scope.currentEditingCompanyId, $scope.addCompanyFormData)
      .then(function (response) {
        console.log("Company updated successfully: ", response);
        SnackbarService.showAlert(
          "Company updated successfully ",
          2000,
          "success"
        );
        $scope.addCompanyFormData = {}; // reset form data
        editCompanyForm.$setPristine();
        editCompanyForm.$setUntouched();
        getCompanies();
        ModalService.hideModal(modalId);
      })
      .catch(function (err) {
        console.error("Error updating company: ", err.data.message);
        editCompanyForm.$invalid = true;
        editCompanyForm.errorMessage = err.data.message;
      });
  };

  //change company status
  $scope.changeCompanyStatus = function (companyId, company) {
    var editCompanyData = {
      name: company.name,
      domain: company.domain,
      city: company.city,
      state: company.state,
      country: company.country,
      logo: company.logo,
      isEnabled: !company.isEnabled,
      admin: {
        firstname: company.admin.firstname,
        lastname: company.admin.lastname,
        email: company.admin.email,
        phoneNumber: company.admin.phoneNumber,
      },
    };

    console.log(companyId);
    CompanyService.editCompany(companyId, editCompanyData)
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
