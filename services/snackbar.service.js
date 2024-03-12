trackflow.service("SnackbarService", function () {
 this.showAlert = function (message, time = 2000, type = 'success') {
  var alertElement = angular.element(document.querySelector(".alert"));
  console.log(alertElement);
  alertElement.html(message);
  alertElement.addClass("alert-" + type);
  alertElement.removeClass("hide");

  setTimeout(function () {
   alertElement.removeClass("alert-" + type);
   alertElement.addClass("hide");
  }, time); // Hides the alert after 3 seconds
 };
});
