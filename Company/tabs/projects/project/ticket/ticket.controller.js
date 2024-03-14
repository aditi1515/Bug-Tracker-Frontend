function ticketController(
 $scope,
 $state,
 $timeout,
 $stateParams,
 ModalService,
 SnackbarService,

 TicketService
) {
 var currentState = $state.current;
 console.log("Active state:", currentState);

 $scope.addTicketFormData = {
  dueDate: new Date(),
 };

 $scope.currentDate = new Date();

 $scope.addTicketFormSubmit = function (modalId, addTicketForm) {
  console.log("Add ticket form data: ", $scope.addTicketFormData);
  $scope.addTicketFormData.project = $scope.metaData.projectDetails
  TicketService.createTicket($scope.addTicketFormData)
   .then(function (response) {
    console.log("Ticket created successfully: ", response);
    ModalService.hideModal(modalId);
    SnackbarService.showAlert("Ticket created successfully", 2000, "success");

    $scope.addTicketFormData = {};
    addTicketForm.$setPristine();
    addTicketForm.$setUntouched();

    $state.reload();
   })
   .catch(function (error) {
    addTicketForm.errorMessage = error.message;
    console.log("Error adding ticket: ", error);
   });
 };

 function getAllTickets(pageNo = 1, pageSize = 10, query = {}) {
  TicketService.getAllTickets({
   pageNo: pageNo,
   pageSize: pageSize,
   query: query,
   project_id: $state.params.projectId,
  }).then(function (response) {
   console.log("All tickets: ", response);
   $scope.ticketsData = response.data;
  });
 }

 $scope.basicFilterSelected = function (basicFilter) {
  $scope.selectedBasicFilter = basicFilter;
  console.log("Basic filter selected: ", basicFilter);
  var query = {};

  // Assigning the filter value to the appropriate property in the query object
  query[basicFilter.filterType] = basicFilter.filterValue;

  console.log("Query: ", query);

  // Calling getAllTickets with the constructed query object
  getAllTickets(
   $scope.ticketsData.currentPage,
   $scope.ticketsData.pageSize,
   query
  );
 };

 $scope.pageChange = function (pageNo, pageSize) {
  console.log("Page changed: ", pageNo, pageSize);
  getAllTickets(pageNo, pageSize);
 };

 function searchTickets(nameSearch) {
  console.log("Search query: ", nameSearch);
  getAllTickets($scope.ticketsData.currentPage, $scope.ticketsData.pageSize, {
   name: nameSearch,
   description: nameSearch,
  });
 }

 var debounceTimeout;

 $scope.debounceSearch = function () {
  console.log("Debouncing...");
  $timeout.cancel(debounceTimeout);
  debounceTimeout = $timeout(function () {
   searchTickets($scope.searchTicket);
  }, 1000);
 };

 getAllTickets();
}

trackflow.controller("ticketController", [
 "$scope",
 "$state",
 "$timeout",
 "$stateParams",
 "ModalService",
 "SnackbarService",
 "TicketService",
 ticketController,
]);
