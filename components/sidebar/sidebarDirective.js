trackflow.directive("sidebar", function () {
 return {
  restrict: "E",
  scope: {
   profile: "=",
   options: "=",
  },
  templateUrl: "../components/sidebar/sidebar.html",
 };
});
