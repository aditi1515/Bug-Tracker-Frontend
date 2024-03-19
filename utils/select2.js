trackflow.directive("select2Init", function () {
 return {
  restrict: "A",
  scope: {
   placeholder: "@",
   closeOnSelect: "@",
   defaultSelected: "=",
  },
  link: function (scope, element, attrs) {
   // Initialize Select2 when the element is ready

   function formatOption(option) {
    if (!option.id) {
     return option.text;
    }

    var optimage = $(option.element).attr("data-image");
    var imageUrl = optimage;
    if (imageUrl) {
     var optionWithImage = $(
      '<span class="select2-option"><img src="' +
       imageUrl +
       '" class="select-option-image" /> ' +
       option.text +
       "</span>"
     );
     return optionWithImage;
    }
   }
   console.log("defaultSelected", scope.defaultSelected);
   $(element)
    .select2({
     width: "100%",
     templateResult: formatOption,
     templateSelection: formatOption,
     theme: "classic",
     closeOnSelect: scope.closeOnSelect === "true" ? true : false,
     placeholder: scope.placeholder,
    })
    .val(scope.defaultSelected);
  },
 };
});
