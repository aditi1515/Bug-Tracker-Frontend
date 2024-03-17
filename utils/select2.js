trackflow.directive("select2Init", function () {
 return {
  restrict: "A",
  scope: {
   placeholder: "@",
  },
  link: function (scope, element, attrs) {
   // Initialize Select2 when the element is ready

   function formatOption(option) {
    console.log("Option here : ", option);
    if (!option.id) {
     return option.text;
    }

    var optimage = $(option.element).attr("data-image");
    console.log("Option: ", optimage);
    var imageUrl = optimage;
    if (imageUrl) {
     var optionWithImage = $(
      '<span><img src="' +
       imageUrl +
       '" class="select-option-image" /> ' +
       option.text +
       "</span>"
     );
     return optionWithImage;
    }
   }

   $(element).select2({
    width: "100%",
    templateResult: formatOption,
    templateSelection: formatOption,
    theme: "classic",
    closeOnSelect: false,
    placeholder: scope.placeholder,
   });
  },
 };
});
