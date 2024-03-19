function companyPeopleController(
 $scope,
 $timeout,
 ModalService,
 SnackbarService,
 UserService
) {
 $scope.addEmployeeFormData = {
  firstname: "Hello",
  lastname: "",
  email: "hello@gmail.com",
  role: "PROJECT_MANAGER",
  phoneNumber: "1234567890",
 };

 $scope.peopleData = {};
 $scope.isEditing = false;
 $scope.currentEditingEmployeeId = null;

 //submit add employee form
 $scope.addEmployeeFormSubmit = function (modalId, addEmployeeForm) {
  UserService.createUser({ user: $scope.addEmployeeFormData })
   .then(function (response) {
    console.log("Employee added successfully: ", response);
    SnackbarService.showAlert("Employee added successfully", 2000, "success");
    getAllPeople();
    $scope.addEmployeeFormData = {};
    ModalService.hideModal(modalId);
   })
   .catch(function (error) {
    console.log("Error adding employee: ", error);
    addEmployeeForm.$invalid = true;
    addEmployeeForm.errorMessage = error.data.message;
   });
  // ModalService.hideModal(modalId);
 };

 function getAllPeople(
  pageNo = 1,
  pageSize = 10,
  query = $scope.peopleData.query || ""
 ) {
  UserService.getAllUsers({
   pageNo,
   pageSize,
   query,
  }).then(function (response) {
   console.log("All people: ", response);
   $scope.peopleData = response.data;
  });
 }

 getAllPeople();

 $scope.pageChange = function (pageNo, pageSize) {
  console.log("Page changed: ", pageNo);
  getAllPeople(pageNo, pageSize);
 };

 function searchPeople(query) {
  console.log("Search query: ", query);
  getAllPeople($scope.peopleData.currentPage, $scope.peopleData.pageSize, {
   query: query,
  });
 }

 var debounceTimeout;

 $scope.debounceSearch = function () {
  console.log("Debouncing...");
  $timeout.cancel(debounceTimeout);
  debounceTimeout = $timeout(function () {
   searchPeople($scope.peopleData.query);
  }, 1000);
 };

 $scope.launchModal = function (modalId, addEmployeeForm) {
  if ($scope.isEditing) {
   $scope.isEditing = false;
   $scope.addEmployeeFormData = {};
   $scope.currentEditingEmployeeId = null;
   addEmployeeForm.$setPristine();
   addEmployeeForm.$setUntouched();
  }
  ModalService.showModal(modalId);
 };

 $scope.editEmployee = function (modalId, employee) {
  console.log("Editing employee: ", employee);
  $scope.isEditing = true;
  $scope.currentEditingEmployeeId = employee._id;
  var editEmployeeFormData = {
   firstname: employee.firstname,
   lastname: employee.lastname,
   email: employee.email,
   role: employee.role,
   phoneNumber: employee.phoneNumber,
  };

  $scope.addEmployeeFormData = editEmployeeFormData;
  ModalService.showModal(modalId);
 };

 $scope.editEmployeeFormSubmit = function (modalId, addEmployeeForm) {
  console.log("Editing employee: ", $scope.addEmployeeFormData);
  UserService.updateUser(
   $scope.currentEditingEmployeeId,
   $scope.addEmployeeFormData
  )
   .then(function (response) {
    console.log("Employee updated successfully: ", response);
    SnackbarService.showAlert("Employee updated successfully", 2000, "success");
    getAllPeople();
    ModalService.hideModal(modalId);
   })
   .catch(function (error) {
    console.log("Error updating employee: ", error);
    addEmployeeForm.$invalid = true;
    addEmployeeForm.errorMessage = error.data.message;
   });
 };
}

trackflow.controller("companyPeopleController", [
 "$scope",
 "$timeout",
 "ModalService",
 "SnackbarService",
 "UserService",
 companyPeopleController,
]);
