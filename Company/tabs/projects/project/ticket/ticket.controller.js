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
 $scope.isEditing = false;
 $scope.currentEditingTicket = null;

 //add ticket
 $scope.addTicketFormSubmit = function (modalId, addTicketForm) {
  console.log("Add ticket form data: ", $scope.addTicketFormData);
  $scope.addTicketFormData.projectDetails = $scope.projectDetails;
  TicketService.createTicket($scope.addTicketFormData)
   .then(function (response) {
    console.log("Ticket created successfully: ", response);
    ModalService.hideModal(modalId);
    SnackbarService.showAlert("Ticket created successfully", 2000, "success");

    $scope.addTicketFormData = {};
    addTicketForm.$setPristine();
    addTicketForm.$setUntouched();

    $state.reload("company.projects.project.ticket");
   })
   .catch(function (error) {
    addTicketForm.errorMessage = error.message;
    console.log("Error adding ticket: ", error);
   });
 };

 $scope.$on("fileSelected", function (event, files) {
  console.log("Files: ", typeof files[0]);

  var objectUrls = Object.keys(files).map(function (key) {
   var blobUrl = URL.createObjectURL(files[key]);
   return { url: blobUrl, type: files[key].type };
  });

  if ($scope.isEditing) {
   $scope.viewTicketDetails.attachmentsPreview = objectUrls;
  } else {
   $scope.addTicketFormData.attachmentsPreview = objectUrls;
  }
 });

 $scope.setReporterClient = function () {
  var currentUsername =
   $scope.profile.firstname + " " + $scope.profile.lastname;
  $scope.viewTicketDetails.reporterClient =
   $scope.viewTicketDetails.reporterClient || currentUsername;
 };

 $scope.isImage = function (preview) {
  // Check if the fileType starts with "image/"
  return preview.type && preview.type.startsWith("image/");
 };

 $scope.isImageUrl = function (url) {
  // check extensions
  var imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
  var extension = url.split(".").pop();

  return imageExtensions.includes(extension);
 };

 //get all tickets
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

  // Calling getAllTickets with the varructed query object
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

 //  view ticket

 $scope.viewTicket = function (modalId, ticket) {
  console.log("Viewing ticket: ", ticket);

  $scope.currentEditingTicket = ticket;
  $scope.isEditing = false;

  $scope.viewTicketDetails = angular.copy(ticket);
  $scope.viewTicketDetails.removedAttachments = [];
  $scope.viewTicketDetails.previousAttachments = ticket.attachments;
  $scope.viewTicketDetails.alreadyAssigned = ticket.assignees;
  $scope.viewTicketDetails.assignees = [];
  $scope.viewTicketDetails.attachments = [];
  $scope.viewTicketDetails.removeAssignees = [];
  $scope.viewTicketDetails.dueDate = new Date(ticket.dueDate);

  ModalService.showModal(modalId);
 };

 $scope.removeAttachment = function (url) {
  console.log("Removing attachment: ", url);

  $scope.viewTicketDetails.removedAttachments.push(url);

  $scope.viewTicketDetails.previousAttachments =
   $scope.viewTicketDetails.previousAttachments.filter(function (preview) {
    return preview !== url;
   });

  console.log(
   "new attachments: ",
   $scope.viewTicketDetails.previousAttachments
  );
 };

 $scope.isAssigneeSelected = function (member) {
  return $scope.viewTicketDetails.alreadyAssigned.some(function (m) {
   return m._id === member._id;
  });
 };

 $scope.removeAssignee = function (member) {
  console.log("Removing member: ", member);
  $scope.viewTicketDetails.removeAssignees.push(member);
  $scope.viewTicketDetails.alreadyAssigned =
   $scope.viewTicketDetails.alreadyAssigned.filter(function (m) {
    return m._id !== member._id;
   });
 };

 //edit ticket

 $scope.editTicketToggle = function (modalId) {
  if ($scope.isEditing) {
   $scope.viewTicket(modalId, $scope.currentEditingTicket);
  }
  $scope.isEditing = $scope.isEditing ? false : true;
 };

 $scope.editTicketSubmit = function (modalId, editTicketForm) {
  console.log("Editing ticket: ", $scope.viewTicketDetails);

  TicketService.updateTicket(
   $scope.viewTicketDetails._id,
   $scope.viewTicketDetails
  )
   .then(function (response) {
    console.log("Ticket updated successfully: ", response);

    $scope.viewTicketDetails = {};
    editTicketForm.$setPristine();
    editTicketForm.$setUntouched();

    SnackbarService.showAlert("Ticket updated successfully", 2000, "success");
    ModalService.hideModal(modalId);
    getAllTickets();
   })
   .catch(function (error) {
    editTicketForm.errorMessage = error.message;
    editTicketForm.$invalid = true;
    console.error("Error updating ticket: ", error);
   });
 };
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
