trackflow.service("SnackbarService", function () {
 this.showAlert = function (message, time, type) {
  var alertElement = angular.element(document.querySelector(".alert"));
  console.log(alertElement);
  alertElement.html(message);
  alertElement.addClass("alert-" + type);
  alertElement.removeClass("hide");

  setTimeout(function () {
   alertElement.removeClass("alert-" + type);
   alertElement.addClass("hide");
  }, 3000); // Hides the alert after 3 seconds
 };
});
