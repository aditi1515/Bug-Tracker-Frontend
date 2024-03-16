function TicketService($http, BASE_URL, $state, $timeout, $q) {
 this.createTicket = function (ticketData) {

    // have to put form data creation in factory
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

  return $http.post(BASE_URL + "ticket", formdata, {
   headers: { "Content-Type": undefined },
  });
 };

 this.getAllTickets = function (queryObject) {
  const params = new URLSearchParams();

  // Append all parameters from the queryObject
  for (const key in queryObject) {
   if (queryObject.hasOwnProperty(key) && queryObject[key] !== undefined) {
    if (key === "query") {
     // If it's the 'query' object, append its properties
     for (const queryKey in queryObject.query) {
      if (queryObject.query.hasOwnProperty(queryKey)) {
       params.append(queryKey, queryObject.query[queryKey]);
      }
     }
    } else {
     // For other parameters, directly append them
     params.append(key, queryObject[key]);
    }
   }
  }

  const queryString = params.toString();
  console.log("Query string: ", queryString);

  return $http.get(BASE_URL + "ticket/all?" + queryString);
 };
}

trackflow.service("TicketService", [
 "$http",
 "BASE_URL",
 "$state",
 "$timeout",
 "$q",
 TicketService,
]);
