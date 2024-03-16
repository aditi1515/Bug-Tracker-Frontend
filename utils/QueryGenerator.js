function QueryGenerator(queryObject) {
 var params = new URLSearchParams();

 for (var key in queryObject) {
  if (queryObject.hasOwnProperty(key) && queryObject[key] !== undefined) {
   if (key === "query") {
    for (var queryKey in queryObject.query) {
     if (queryObject.query.hasOwnProperty(queryKey)) {
      params.append(queryKey, queryObject.query[queryKey]);
     }
    }
   } else {
    params.append(key, queryObject[key]);
   }
  }
 }

 var queryString = params.toString();

 return queryString;
}
