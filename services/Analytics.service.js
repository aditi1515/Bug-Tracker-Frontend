function AnalyticsService($http, BASE_URL) {
  this.getCountCompanies = function (body) {
    return $http
      .post(BASE_URL + "analytics/numberOfCompanies", body)
      .then(function (response) {
        console.log("getCountCompanies", response);
        return response;
      })
      .catch(function (err) {
        console.log("Error getting companies: ", err);
        return err;
      });
  };

  this.getRecentlyEnrolledCompanies = function (option) {
    return $http
      .get(BASE_URL + "analytics/recentlyEnrolledCompanies")
      .then(function (response) {
        console.log("getRecentlyEnrolledCompanies", response);
        return response;
      })
      .catch(function (err) {
        console.log("Error getting RecentlyEnrolledCompanies  : ", err);
        return err;
      });
  };

  this.getLocationWiseCompanyCount = function (body) {
    return $http
      .post(BASE_URL + "analytics/countCompanyByLocation", body)
      .then(function (response) {
        console.log("getLocationWiseCompanyCount", response);
        return response;
      })
      .catch(function (err) {
        console.log("Error getting location wise company count: ", err);
        return err;
      });
  };

  this.getProjectCountTrend = function (data) {
    var query = "";
    if (data.option) {
      query = "option=" + data.option;
    }
    if (data.startDate) {
      query = query + "&startDate=" + data.startDate;
    }
    if (data.endDate) {
      query = query + "&endDate=" + data.endDate;
    }

    return $http
      .get(BASE_URL + "analytics/projectCountTrend?" + query)
      .then(function (response) {
        console.log("projectCountTrend", response);
        return response;
      })
      .catch(function (err) {
        console.log("Error getting projectCount Trend : ", err);
        return err;
      });
  };

  this.getticketCountTrend = function (data) {
    var query = "";
    if (data.option) {
      query = "option=" + data.option;
    }
    if (data.startDate) {
      query = query + "&startDate=" + data.startDate;
    }
    if (data.endDate) {
      query = query + "&endDate=" + data.endDate;
    }

    return $http
      .get(BASE_URL + "analytics/ticketCountTrend?" + query)
      .then(function (response) {
        console.log("ticketCount Trend", response);
        return response;
      })
      .catch(function (err) {
        console.log("Error getting ticketcount Trend : ", err);
        return err;
      });
  };

  this.getcompanyCountTrend = function (data) {
    var query = "";
    if (data.option) {
      query = "option=" + data.option;
    }
    if (data.startDate) {
      query = query + "&startDate=" + data.startDate;
    }
    if (data.endDate) {
      query = query + "&endDate=" + data.endDate;
    }
    return $http
      .get(BASE_URL + "analytics/companyCountTrend?" + query)
      .then(function (response) {
        console.log("ticketCount Trend", response);
        return response;
      })
      .catch(function (err) {
        console.log("Error getting ticketcount Trend : ", err);
        return err;
      });
  };

  this.getCompanySize = function (body) {
    var param = "";
    if(body){
      param = "?startDate=" + body.startDate + "&endDate=" + body.endDate;
    }

    return $http
      .get(BASE_URL + "analytics/companySize"+param)
      .then(function (response) {
        console.log("getCompanySize", response);
        return response;
      })
      .catch(function (err) {
        console.log("Error getting company size: ", err);
        return err;
      });
  };

  this.getMostLoyalPartners = function (limit) {
    return $http
      .get(BASE_URL + "analytics/mostLoyalPartners?limit=" + limit)
      .then(function (response) {
        console.log("getMostLoyalPartners", response);
        return response;
      })
      .catch(function (err) {
        console.log("Error getting mostLoyalPartners: ", err);
        return err;
      });
  };

  this.getProjectsInCompany = function (limit, top) {
    return $http
      .get(
        BASE_URL +
          "analytics/countProjectsInCompany?limit=" +
          limit +
          "&top=" +
          top
      )
      .then(function (response) {
        console.log("getProjectsInCompany", response);
        return response;
      })
      .catch(function (err) {
        console.log("Error getting projects in company: ", err);
        return err;
      });
  };

  this.getProjectCount = function (body) {
    return $http
      .post(BASE_URL + "analytics/numberOfProjects", body)
      .then(function (response) {
        console.log("getProjectCount", response);
        return response;
      })
      .catch(function (err) {
        console.log("Error getting project count: ", err);
        return err;
      });
  };

  this.getTotalTickets = function (body) {
    return $http
      .post(BASE_URL + "analytics/totalTickets", body)
      .then(function (response) {
        console.log("getTotalTickets", response);
        return response;
      })
      .catch(function (err) {
        console.log("Error getting total tickets: ", err);
        return err;
      });
  };

  this.companyWiseTicketCounts = function () {
    return $http
      .get(BASE_URL + "analytics/companyWiseTicketCounts")
      .then(function (response) {
        console.log("companyWiseTicketCounts", response);
        return response;
      })
      .catch(function (err) {
        console.log("Error getting company wise ticket counts: ", err);
        return err;
      });
  };

  this.getRoleBasedEmployeesCount = function () {
    return $http
      .get(BASE_URL + "analytics/employeesRoleDistribution")
      .then(function (response) {
        console.log("employeesRoleDistribution", response);
        return response;
      })
      .catch(function (err) {
        console.log("Error getting employeesRoleDistribution count: ", err);
        return err;
      });
  };
  this.getprojectWiseUsers = function (body) {

    var param = "";
    if(body){
      param = "?startDate=" + body.startDate + "&endDate=" + body.endDate;
    }

    return $http
      .get(BASE_URL + "analytics/projectWiseUsers"+param)
      .then(function (response) {
        console.log("getprojectWiseUsers", response);
        return response;
      })
      .catch(function (err) {
        console.log("Error getting project wise users: ", err);
        return err;
      });
  };

  //get number of tickets in project
  this.getprojectWiseTickets = function (data) {

    var query = "";

    if(data){
      query = "?startDate=" + data.startDate + "&endDate=" + data.endDate;
    }


    if (data.projectId) {
      query = "?projectId=" + data.projectId;
    }

    return $http
      .get(BASE_URL + "analytics/projectWiseTickets" + query)
      .then(function (response) {
        console.log("getprojectWiseTickets", response);
        return response;
      })
      .catch(function (err) {
        console.log("Error getting project wise tickets: ", err);
        return err;
      });
  };

  //get status wise tickets in project
  this.getStatusWiseTickets = function (projectId) {
    console.log("getstatuswisetickets", projectId);
    return $http
      .get(BASE_URL + "analytics/statusWiseTickets/" + projectId)
      .then(function (response) {
        console.log("getprojectWiseTickets", response);
        return response;
      })
      .catch(function (err) {
        console.log("Error getting status wise tickets: ", err);
        return err;
      });
  };

  //get priority wise tickets in project
  this.getPriorityWiseTickets = function (projectId) {
    console.log("priority wise tickets", projectId);
    return $http
      .get(BASE_URL + "analytics/priorityWiseTickets/" + projectId)
      .then(function (response) {
        console.log("getPriorityWiseTickets", response);
        return response;
      })
      .catch(function (err) {
        console.log("Error getting priority wise tickets: ", err);
        return err;
      });
  };
  this.getUsersInProject = function (projectId) {
    console.log("projectId", projectId);
    return $http
      .get(BASE_URL + "analytics/usersInProject/" + projectId)
      .then(function (response) {
        console.log("getUsersInAProject", response);
        return response;
      })
      .catch(function (err) {
        console.log("Error getting users in a project: ", err);
        return err;
      });
  };

  this.getuserProductivityInTickets = function (body) {
    return $http
      .post(BASE_URL + "analytics/userProductivityInTickets", body)
      .then(function (response) {
        console.log("getuserProductivityInTickets", response);
        return response;
      })
      .catch(function (err) {
        console.log("Error getting user productivity in tickets: ", err);
        return err;
      });
  };

  this.getUsersWithMostProjects = function (body) {
    return $http
      .post(BASE_URL + "analytics/usersWithMostProjects", body)
      .then(function (response) {
        console.log("getUsersWithMostProjects", response);
        return response;
      })
      .catch(function (err) {
        console.log("Error getting users with most projects: ", err);
        return err;
      });
  };


  this.getUsersWithMostTickets = function (body) {
    return $http
      .post(BASE_URL + "analytics/usersWithMostTickets", body)
      .then(function (response) {
        console.log("getUsersWithMostProjects", response);
        return response;
      })
      .catch(function (err) {
        console.log("Error getting users with most projects: ", err);
        return err;
      });
  };

  this.getSystemUsageTime = function () {
    return $http
      .get(BASE_URL + "analytics/systemUsageTime/")
      .then(function (response) {
        console.log("systemUsageTime", response);
        return response;
      })
      .catch(function (err) {
        console.log("Error getting systemUsageTime: ", err);
        return err;
      });
  };


  this.getProjectCompletionTime = function (body) {

    var param = "";
    if(body){
      param = "?startDate=" + body.startDate + "&endDate=" + body.endDate;
    }

    return $http
      .get(BASE_URL + "analytics/getEachProjectCompletionTime"+param)
      .then(function (response) {
        console.log("projectCompletionTime", response);
        return response;
      })
      .catch(function (err) {
        console.log("Error getting projectCompletionTime: ", err);
        return err;
      });
  
  }
}

trackflow.service("AnalyticsService", ["$http", "BASE_URL", AnalyticsService]);
