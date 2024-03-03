// Define the modal directive
trackflow.directive("myModal", function (ModalService) {
 return {
  restrict: "E",
  transclude: true,
  scope: {
   modalId: "@",
   title: "@",
   body: "@",
   closeBtnText: "@",
   confirmBtnText: "@",
  },
  templateUrl: "../components/Modal/modal.html", // Path to the directive's template
  link: function (scope) {
   // Function to handle modal close
   scope.closeModal = function () {
    if (scope.onClose) {
     scope.onClose();
    }
    ModalService.hideModal(scope.modalId);
   };

   // Function to handle modal confirm
   scope.confirmModal = function () {
    console.log("Confirm action performed");
    console.log("Modal ID: ", scope.modalId);
    console.log(scope.onConfirm);
    if (scope.onConfirm) {
     scope.onConfirm();
    }
    scope.closeModal();
   };
  },
 };
});
