function TicketService($http, BASE_URL, FormDataFactory) {
 this.createTicket = function (ticketData) {
  // have to put form data creation in factory

  var formdata = FormDataFactory.getTicketFormData(ticketData);

  return $http.post(BASE_URL + "ticket", formdata, {
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
