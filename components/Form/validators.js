function passwordValidateDirective() {
 return {
  require: "ngModel",
  link: function (scope, element, attrs, ctrl) {
   ctrl.$validators.passwordValidate = function (modelValue, viewValue) {

    if (ctrl.$isEmpty(modelValue)) {
     // consider empty model valid
     return true;
    }

    var errors = [];

    // Password must be at least 8 characters long
    if (viewValue.length < 8) {
     errors.push("Password must be at least 8 characters long.");
    }

    // Password must contain at least one number
    if (!/\d/.test(viewValue)) {
     errors.push("Password must contain at least one number.");
    }

    // Password must contain at least one uppercase letter
    if (!/[A-Z]/.test(viewValue)) {
     errors.push("Password must contain at least one uppercase letter.");
    }

    // Password must contain at least one lowercase letter
    if (!/[a-z]/.test(viewValue)) {
     errors.push("Password must contain at least one lowercase letter.");
    }

    // Password must contain at least one special symbol
    if (!/[\W_]/.test(viewValue)) {
     errors.push("Password must contain at least one special symbol.");
    }
 

    ctrl.$errorList = errors;

    return errors.length === 0;
   };

   // Watch for changes and trigger validation

   scope.$watch(attrs.ngModel, function () {
    ctrl.$validate();
   });
  },
 };
}

function confirmPasswordValidateDirective() {
 return {
  require: "ngModel",
  link: function (scope, element, attrs, ctrl) {

   ctrl.$validators.confirmPasswordValidate = function (modelValue, viewValue) {
    if (ctrl.$isEmpty(modelValue)) {
     // Consider empty model valid
     return false;
    }
    if (modelValue === scope.$eval(attrs.compareWith).$viewValue) {
     // Matched, return true (valid)
     return true;
    } else {
     // Not matched, return false (invalid)
     return false;
    }
   };

   scope.$watch(
    function () {
     return [attrs.ngModel, scope.$eval(attrs.compareWith).$viewValue];
    },
    function () {
     ctrl.$validate();
    },
    true
   );
  },
 };
}

trackflow.directive("passwordValidate", passwordValidateDirective);

trackflow.directive(
  "confirmPasswordValidate",
  confirmPasswordValidateDirective
);
