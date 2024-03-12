function companyPeopleController(
 $scope,
 $timeout,
 ModalService,
 SnackbarService,
 UserService
) {
 $scope.addEmployeeFormData = {
  firstname: "Jatin",
  lastname: "Pandey",
  email: "playerhun191@gmail.com",
  role: "PROJECT_MANAGER",
  phoneNumber: "1234567890",
 };

 $scope.peopleData = {};

 $scope.addEmployeeFormSubmit = function (modalId, addEmployeeForm) {
  console.log("Form submitted: ", addEmployeeForm);
  UserService.createUser({ user: $scope.addEmployeeFormData })
   .then(function (response) {
    console.log("Employee added successfully: ", response);
    SnackbarService.showAlert("Employee added successfully", 2000, "success");
    getAllPeople();
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
  getAllPeople(
   $scope.peopleData.currentPage,
   $scope.peopleData.pageSize,
   query
  );
 }

 var debounceTimeout;

 $scope.debounceSearch = function () {
  console.log("Debouncing...");
  $timeout.cancel(debounceTimeout);
  debounceTimeout = $timeout(function () {
   searchPeople($scope.peopleData.query);
  }, 1000);
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
