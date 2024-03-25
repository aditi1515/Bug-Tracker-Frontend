function TicketService($http, BASE_URL, FormDataFactory) {
 this.createTicket = function (ticketData) {
  // have to put form data creation in factory

  var formdata = FormDataFactory.getTicketFormData(ticketData);
  console.log("formdata", ...formdata);
  return $http.post(BASE_URL + "ticket", formdata, {
   headers: { "Content-Type": undefined },
  });
 };
 this.updateTicket = function (ticketId, ticketData) {
  // have to put form data creation in factory
  console.log("ticketData", ticketData);
  var formdata = FormDataFactory.getTicketFormData(ticketData);
  return $http.patch(BASE_URL + "ticket/" + ticketId, formdata, {
   headers: { "Content-Type": undefined },
  });
 };

 this.getAllTickets = function (queryObject) {
  var queryString = QueryGenerator(queryObject);
  console.log("Query string: ", queryString);

  return $http.get(BASE_URL + "ticket/all?" + queryString);
 };
}

trackflow.service("TicketService", [
 "$http",
 "BASE_URL",
 "FormDataFactory",
 TicketService,
]);
