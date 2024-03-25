function RoleService($http, BASE_URL) {
 this.getPermissionSets = function () {
  return $http
   .get(BASE_URL + "role/getPermissionSets")
   .then(function (response) {
    console.log("Permission sets: ", response);
    return response.data.permissionSets;
   })
   .catch(function (err) {
    console.log("Error fetching permission sets : ", err);
    throw err;
   });
 };

 this.saveRole = function (role) {
  return $http
   .post(BASE_URL + "role", role)
   .then(function (response) {
    console.log("Role saved: ", response);
    return response;
   })
   .catch(function (err) {
    console.log("Error saving role: ", err);
    throw err;
   });
 };

 this.getAllRoles = function (companyId) {
  return $http
   .get(BASE_URL + "role/all?companyId=" + companyId)
   .then(function (response) {
    console.log("Roles: ", response);
    return response.data;
   })
   .catch(function (err) {
    console.log("Error fetching roles: ", err);
    throw err;
   });
 };

 this.saveTemplate = function (template) {
  console.log("Template to save: ", template);
  return $http
   .post(BASE_URL + "role/savePermissionSet", template)
   .then(function (response) {
    console.log("Template saved: ", response);
    return response;
   })
   .catch(function (err) {
    console.log("Error saving template: ", err);
    throw err;
   });
 };

 this.updateRole = function (roleId, role) {
  return $http
   .patch(BASE_URL + "role/" + roleId, role)
   .then(function (response) {
    console.log("Role updated: ", response);
    return response;
   })
   .catch(function (err) {
    console.log("Error updating role: ", err);
    throw err;
   });
 };
}

trackflow.service("RoleService", ["$http", "BASE_URL", RoleService]);
