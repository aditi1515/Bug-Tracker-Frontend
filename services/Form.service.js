trackflow.service("FormService", function () {
 // Sample data of form fields for different forms and user roles
 var formFieldsData = {
  registrationForm: {
   admin: [
    {
     label: "Username",
     placeholder: "Enter username",
     name: "username",
     type: "text",
     required: true,
     minlength: 3,
     validatorType: "pattern",
     pattern: "/^[a-zA-Z0-9]+$/",
     validPatternMessage: "Alphanumeric characters only",
     // Example pattern for alphanumeric characters only
    },
    {
     label: "Email",
     placeholder: "Enter email",
     name: "email",
     type: "email",
     required: true,
     validatorType: "pattern",
     pattern: "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/",
     validPatternMessage: "Enter a valid email address",
     // Email pattern
    },
    {
     label: "Password",
     placeholder: "Enter password",
     name: "password",
     type: "password",
     required: true,
     minlength: 8,
     validatorType: "password",
    },
    {
     label: "Confirm Password",
     placeholder: "Enter password to confirm",
     name: "confirmPassword",
     type: "password",
     required: true,
     minlength: 8,
     validatorType: "confirmPassword",
     compareWith: "password", // name of field
    },
    {
     label: "Admin Code",
     placeholder: "Enter admin code",
     name: "adminCode",
     type: "text",
     validatorType: "noValidator",
    },
   ],
   user: [
    {
     label: "Username",
     placeholder: "Enter username",
     name: "username",
     type: "text",
     minlength: 3,
     validatorType: "pattern",
     pattern: "/^[a-zA-Z0-9]+$/",
     required: true,
     validPatternMessage: "Alphanumeric characters only",
     // Example pattern for alphanumeric characters only
    },
    {
     label: "Email",
     placeholder: "Enter email",
     name: "email",
     type: "email",
     validatorType: "pattern",
     pattern: "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/",
     required: true,
     validPatternMessage: "Enter a valid email address",
     // Email pattern
    },
    {
     label: "Password",
     placeholder: "Enter password",
     name: "password",
     type: "password",
     minlength: 8,
     validatorType: "pattern",
     pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$",
     validatorType: "password",
     // Password pattern (at least one lowercase, one uppercase, one digit)
    },

    {
     label: "Password",
     placeholder: "Enter password",
     name: "password",
     type: "password",
     minlength: 8,
     validatorType: "pattern",
     pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$",
     validatorType: "confirmPassword",
     compareWith: "password", // name of field
     required: true,
     // Password pattern (at least one lowercase, one uppercase, one digit)
    },
   ],
  },
  addCompanyForm: {
   superadmin: [
    {
     label: "Company Name",
     placeholder: "Enter company name",
     name: "companyName",
     type: "text",
     required: true,
     minlength: 3,
     validatorType: "pattern",
     pattern: "/^[a-zA-Z0-9]+$/",
     validPatternMessage: "Alphanumeric characters only",
     // Example pattern for alphanumeric characters only
    },
    {
     label: "Company Email",
     placeholder: "Enter company email",
     name: "companyEmail",
     type: "email",
     required: true,
     validatorType: "pattern",
     pattern: "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/",
     validPatternMessage: "Enter a valid email address",
     // Email pattern
    },
    {
     label: "Company Phone",
     placeholder: "Enter company phone",
     name: "companyPhone",
     type: "text",
     required: true,
     validatorType: "pattern",
     pattern: "/^[0-9]+$/",
     validPatternMessage: "Numbers only",
    },
    {
     label: "Company Address",
     placeholder: "Enter company address",
     name: "companyAddress",
     type: "text",
     required: true,
     minlength: 8,
     validatorType: "noValidator",
    },
   ],
  },
  addUserForm: {
   superadmin: [
    {
     label: "Username",
     placeholder: "Enter username",
     name: "username",
     type: "text",
     minlength: 3,
     validatorType: "pattern",
     pattern: "/^[a-zA-Z0-9]+$/",
     required: true,
     validPatternMessage: "Alphanumeric characters only",
     // Example pattern for alphanumeric characters only
    },
    {
     label: "Email",
     placeholder: "Enter email",
     name: "email",
     type: "email",
     validatorType: "pattern",
     pattern: "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/",
     required: true,
     validPatternMessage: "Enter a valid email address",
     // Email pattern
    },
    {
     label: "Password",
     placeholder: "Enter password",
     name: "password",
     type: "password",
     minlength: 8,
     validatorType: "pattern",
     pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$",
     validatorType: "password",
     // Password pattern (at least one lowercase, one uppercase, one digit)
    },
    {
     label: "Confirm Password",
     placeholder: "Enter password to confirm",
     name: "confirmPassword",
     type: "password",
     minlength: 8,
     validatorType: "confirmPassword",
     compareWith: "password", // name of field
     required: true,
    },
    {
     label: "Role",
     placeholder: "Enter role",
     name: "role",
     type: "text",
     required: true,
     minlength: 3,
     validatorType: "noValidator",
    },
    {
     label: "phone number",
     placeholder: "Enter phone number",
     name: "phoneNumber",
     type: "text",
     required: true,
     minlength: 10,
     validatorType: "pattern",
     pattern: "/^[0-9]+$/",
    },
   ],
  },
  // Add more forms and their corresponding fields as needed
 };

 // Function to get form fields based on form name and user role
 this.getFormFields = function (formName, userRole) {
  if (formFieldsData[formName] && formFieldsData[formName][userRole]) {
   return formFieldsData[formName][userRole];
  } else {
   return [];
  }
 };
});
