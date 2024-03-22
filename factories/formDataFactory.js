function formDataFactory() {
 var factory = {};

 factory.getCompanyFormData = function (companyFormData) {
  var formData = new FormData();
  console.log("Company data: ", companyFormData);
  // Append company details
  formData.append("name", companyFormData.name);
  formData.append("city", companyFormData.city);
  formData.append("state", companyFormData.state);
  formData.append("domain", companyFormData.domain);
  formData.append("country", companyFormData.country);

  if (companyFormData.logo) {
   formData.append("logo", companyFormData.logo);
  }

  if (companyFormData.isEnabled !== undefined) {
   formData.append("isEnabled", companyFormData.isEnabled);
  }

  if (companyFormData.previousLogo) {
   formData.append("previousLogo", companyFormData.previousLogo);
  }

  // Append admin details
  formData.append("admin[firstname]", companyFormData.admin.firstname);
  formData.append("admin[lastname]", companyFormData.admin.lastname);
  formData.append("admin[email]", companyFormData.admin.email);
  formData.append("admin[phoneNumber]", companyFormData.admin.phoneNumber);

  return formData;
 };

 //project
 factory.getProjectFormData = function (project) {
  var formdata = new FormData();

  formdata.append("name", project.name);
  formdata.append("description", project.description);
  formdata.append("dueDate", project.dueDate);
  if (project.members) {
   formdata.append("members", JSON.stringify(project.members));
  }

  if (project.removedMembers) {
   formdata.append("removedMembers", JSON.stringify(project.removedMembers));
  }

  if (project.logo) {
   formdata.append("logo", project.logo);
  }

  if (project.previousLogo) {
   formdata.append("previousLogo", project.previousLogo);
  }

  formdata.append("inProgress", project.inProgress);

  formdata.append("key", project.key);

  return formdata;
 };

 //ticket
 factory.getTicketFormData = function (ticketData) {
  // Validate title
  if (typeof ticketData.title !== "string") {
   return new Error("Title must be a string.");
  }

  // Validate description
  if (ticketData.description && typeof ticketData.description !== "string") {
   return new Error("Description must be a string.");
  }

  // Validate dueDate
  if (!(ticketData.dueDate instanceof Date)) {
   return new Error("Due date must be a Date object.");
  }

  // Validate status
  if (typeof ticketData.status !== "string") {
   return new Error("Status must be a string.");
  }

  // Validate ticketType
  if (typeof ticketData.ticketType !== "string") {
   return new Error("Ticket type must be a string.");
  }

  // Validate priority
  if (typeof ticketData.priority !== "string") {
   return new Error("Priority must be a string.");
  }

  // Validate projectDetails
  if (
   ticketData.projectDetails &&
   typeof ticketData.projectDetails !== "object"
  ) {
   return new Error("Project details must be an object.");
  }

  var data = {
   title: ticketData.title,
   description: ticketData.description,
   dueDate: ticketData.dueDate,
   status: ticketData.status,
   ticketType: ticketData.ticketType,
   priority: ticketData.priority,
   assignees: ticketData.assignees,
   alreadyAssigned: ticketData.alreadyAssigned,
   reporterClient: ticketData.reporterClient,
   removeAssignees: ticketData.removeAssignees,
   previousAttachments: ticketData.previousAttachments,
   removedAttachments: ticketData.removedAttachments,
   attachments: ticketData.attachments,

   projectDetails: {
    _id: ticketData.metaData.projectDetails._id,
    name: ticketData.metaData.projectDetails.name,
    key: ticketData.metaData.projectDetails.key,
   },
   companyDetails: {
    _id: ticketData.metaData.companyDetails._id,
    name: ticketData.metaData.companyDetails.name,
    domain: ticketData.metaData.companyDetails.domain,
   },
   assignedBy: {
    _id: ticketData.metaData.user._id,
    firstname: ticketData.metaData.user.firstname,
    lastname: ticketData.metaData.user.lastname,
    email: ticketData.metaData.user.email,
    image: ticketData.metaData.user.image,
   },
  };

  var formData = convertDataToFormData(data);

  console.log("FormData: by generalised ", ...formData);
  return formData;

 };



 return factory;
}

trackflow.factory("FormDataFactory", [formDataFactory]);
