function dashboardCompanyController(
 $scope,
 CompanyService,
 ModalService,
 SnackbarService
) {
 $scope.addCompanyFormData = {
  company: {
   name: "Dummy Company",
   email: "dummy@example.com",
   city: "Dummy City",
   state: "Dummy State",
   country: "Dummy Country",
  },
  admin: {
   firstname: "Dummy First Name",
   lastname: "Dummy Last Name",
   email: "admin@example.com",
   phoneNumber: "1234567890",
  },
 };

 $scope.addCompanyFormSubmit = function (modalId, addCompanyForm) {
  var formData = new FormData();

  // Append company details
  formData.append("company[name]", $scope.addCompanyFormData.company.name);
  formData.append("company[email]", $scope.addCompanyFormData.company.email);
  formData.append("company[city]", $scope.addCompanyFormData.company.city);
  formData.append("company[state]", $scope.addCompanyFormData.company.state);
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
    ModalService.hideModal(modalId)
   })
   .catch(function (err) {
    console.error("Error saving company: ", err.data.message);
    console.log(addCompanyForm);
    addCompanyForm.$invalid = true;
    addCompanyForm.errorMessage = err.data.message;
   });

  
 };
}

trackflow.controller("dashboardCompanyController", [
 "$scope",
 "CompanyService",
 "ModalService",
 "SnackbarService",
 dashboardCompanyController,
]);
