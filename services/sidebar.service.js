function sideBarService() {
 this.getSideBarOptions = function (role) {
  if (role === "SUPER_ADMIN") {
   return [
    {
     label: "Company",
     state: "superAdminDashboard.company",
     icon: "bi-building",
    },
    // {
    //  label: "Settings",
    //  state: "admin.settings",
    //  icon: "bi-gear",
    // },
   ];
  } else if (role === "COMPANY_ADMIN") {
   return [
    {
     label: "Dashboard",
     state: "company.dashboard",
     icon: "bi-house",
    },
    {
     label: "Projects",
     state: "company.projects",
     icon: "bi-clipboard",
    },
    {
     label: "People",
     state: "company.people",
     icon: "bi-people",
    },
    {
     label: "Settings",
     state: "company.settings",
     icon: "bi-gear",
    },
   ];
  } else if (role === "PROJECT_MANAGER" || role === "EMPLOYEE") {
   return [
    {
     label: "Projects",
     state: "company.projects.base",
     icon: "bi-clipboard",
    },
    {
     label: "Settings",
     state: "company.settings",
     icon: "bi-gear",
    },
   ];
  }
 };
}

trackflow.service("SideBarService", [sideBarService]);
