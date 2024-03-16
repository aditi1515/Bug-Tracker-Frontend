function formDataFactory() {
 var factory = {};

 factory.getCompanyFormData = function (companyFormData) {
  var formData = new FormData();

  // Append company details
  formData.append("company[name]", companyFormData.company.name);
  formData.append("company[city]", companyFormData.company.city);
  formData.append("company[state]", companyFormData.company.state);
  formData.append("company[domain]", companyFormData.company.domain);
  formData.append("company[country]", companyFormData.company.country);
  formData.append("company[logo]", companyFormData.company.logo);
  // Append admin details
  formData.append("admin[firstname]", companyFormData.admin.firstname);
  formData.append("admin[lastname]", companyFormData.admin.lastname);
  formData.append("admin[email]", companyFormData.admin.email);
  formData.append("admin[phoneNumber]", companyFormData.admin.phoneNumber);

  return formData;
 };

 factory.getProjectFormData = function (project) {
  var formdata = new FormData();

  formdata.append("name", project.name);
  formdata.append("description", project.description);
  formdata.append("dueDate", project.dueDate);
  if (project.members) {
   formdata.append("members", JSON.stringify(project.members));
  }
  formdata.append("inProgress", project.inProgress);
  formdata.append("logo", project.logo);
  formdata.append("key", project.key);

  return formdata;
 };

 factory.getTicketFormData = function (ticketData) {
  var formdata = new FormData();
  console.log("Ticket data: ", ticketData.attachments);
  formdata.append("description", ticketData.description);
  formdata.append("dueDate", ticketData.dueDate);
  formdata.append("status", ticketData.status);
  formdata.append("ticketType", ticketData.ticketType);
  formdata.append("priority", ticketData.priority);
  formdata.append("projectDetails", JSON.stringify(ticketData.project));

  var files = ticketData.attachments;
  for (var i = 0; i < files?.length; i++) {
   formdata.append("attachments[]", files[i]);
  }

  // if attarchments is just 1 file of type file then append it as a single file
  //  check type file
  if (files instanceof File) {
   formdata.append("attachments[]", files);
  }

  if (ticketData.assignees) {
   formdata.append("assignees", JSON.stringify(ticketData.assignees));
  }

  return formdata;
 };

 return factory;
}

trackflow.factory("FormDataFactory", [formDataFactory]);
