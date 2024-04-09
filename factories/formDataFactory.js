function formDataFactory() {
    var factory = {};
  
    factory.getCompanyFormData = function (companyFormData) {
      console.log("Company data: ", companyFormData);
      var formdata = new FormData();

      var data = {
        name: companyFormData.name,
        city: companyFormData.city,
        state: companyFormData.state,
        domain: companyFormData.domain,
        country: companyFormData.country,
        previousLogo: companyFormData.previousLogo,
        admin: {
          firstname: companyFormData.admin.firstname,
          lastname: companyFormData.admin.lastname,
          email: companyFormData.admin.email,
          phoneNumber: companyFormData.admin.phoneNumber,
        },
        previousData: companyFormData.previousData,
      };
  
      if (companyFormData.isEnabled !== undefined) {
        data.isEnabled = companyFormData.isEnabled;
      }
  
      if (companyFormData.logo) {
        data.logo = companyFormData.logo;
      }

      formdata.append("name" , data.name)
      formdata.append("city" , data.city)
      formdata.append("state" , data.state)
      formdata.append("country" , data.country)
      formdata.append("previousLogo" , data.previousLogo)
      formdata.append("admin" , JSON.stringify(data.admin))
  
  
      return formData;
    };
  
    //project
    factory.getProjectFormData = function (project) {
      console.log("Project data: ", project);
      var data = {
        name: project.name,
        description: project.description,
        dueDate: project.dueDate,
        members: project.members,
        removedMembers: project.removedMembers,
        previousLogo: project.previousLogo,
        inProgress: project.inProgress,
        key: project.key,
        previousData: project.previousData,
        createdBy: {
          _id: project.metaData.user._id,
          firstname: project.metaData.user.firstname,
          lastname: project.metaData.user.lastname,
          email: project.metaData.user.email,
          image: project.metaData.user.image,
        },
        companyDetails: {
          _id: project.metaData.company._id,
          name: project.metaData.company.name,
          domain: project.metaData.company.domain,
        },
      };
      console.log("project.logo", project.logo);
      if (project.logo) {
        data.logo = project.logo;
      }
      console.log("Data before form: ", data);
      var formData = new FormData();
      console.log("Company data: ", companyFormData);
      // Append company details
      formData.append("name", data.name);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("domain", data.domain);
      formData.append("country", data.country);
  
      if (data.logo) {
        formData.append("logo", data.logo);
      }
  
      if (data.isEnabled !== undefined) {
        formData.append("isEnabled", data.isEnabled);
      }
  
      if (data.previousLogo) {
        formData.append("previousLogo", data.previousLogo);
      }
  
      // Append admin details
      formData.append("admin[firstname]", data.admin.firstname);
      formData.append("admin[lastname]", data.admin.lastname);
      formData.append("admin[email]", data.admin.email);
      formData.append("admin[phoneNumber]", data.admin.phoneNumber);
  
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
      return formData;
    };
  
    //ticket
    factory.getTicketFormData = function (ticketData) {
      console.log("Ticket data: in getTicketFormData", ticketData);
     
  
      var data = {
        title: ticketData.title,
        description: ticketData.description || "",
        dueDate: ticketData.dueDate,
        status: ticketData.status,
        ticketType: ticketData.ticketType,
        priority: ticketData.priority,
        assignees: ticketData.assignees ? ticketData.assignees : [],
        alreadyAssigned: ticketData.alreadyAssigned,
        reporterClient: ticketData.reporterClient,
        removeAssignees: ticketData.removeAssignees,
        previousAttachments: ticketData.previousAttachments,
        removedAttachments: ticketData.removedAttachments,
        attachments: ticketData.attachments,
        previousTicket: ticketData.previousTicket,
      };
  
      if (ticketData.metaData.projectDetails !== null) {
        data.projectDetails = {
          _id: ticketData.metaData.projectDetails._id,
          name: ticketData.metaData.projectDetails.name,
          key: ticketData.metaData.projectDetails.key,
        };
      }
  
      if (ticketData.metaData.companyDetails !== null) {
        data.companyDetails = {
          _id: ticketData.metaData.companyDetails._id,
          name: ticketData.metaData.companyDetails.name,
          domain: ticketData.metaData.companyDetails.domain,
        };
      }
      if (ticketData.metaData.user !== null) {
        data.assignedBy = {
          _id: ticketData.metaData.user._id,
          firstname: ticketData.metaData.user.firstname,
          lastname: ticketData.metaData.user.lastname,
          email: ticketData.metaData.user.email,
          image: ticketData.metaData.user.image,
        };
      }
  
      var formdata = new FormData();
    console.log("Ticket data: ", ticketData.attachments);
    formdata.append("title", ticketData.title);
    if (ticketData.description) {
     formdata.append("description", ticketData.description);
    }
    formdata.append("dueDate", ticketData.dueDate);
    formdata.append("status", ticketData.status);
    formdata.append("ticketType", ticketData.ticketType);
    formdata.append("priority", ticketData.priority);
    formdata.append("projectDetails", JSON.stringify(ticketData.projectDetails));
  
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
  
    if (ticketData.alreadyAssigned) {
     formdata.append(
      "alreadyAssigned",
      JSON.stringify(ticketData.alreadyAssigned)
     );
    }
  
    if (ticketData.reporterClient) {
     formdata.append("reporterClient", ticketData.reporterClient);
    }
  
    if (ticketData.removeAssignees) {
     formdata.append(
      "removeAssignees",
      JSON.stringify(ticketData.removeAssignees)
     );
    }
  
    if (ticketData.removedAttachments) {
     formdata.append(
      "previousAttachments",
      JSON.stringify(ticketData.previousAttachments)
     );
    }
  
    if (ticketData.removedAttachments) {
     formdata.append(
      "removedAttachments",
      JSON.stringify(ticketData.removedAttachments)
     );
    }
      return formData;
    };
  
    return factory;
  }
  
  trackflow.factory("FormDataFactory", [formDataFactory]);
  