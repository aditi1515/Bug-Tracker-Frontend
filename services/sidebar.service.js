function sideBarService() {
 this.getSideBarOptions = function (role) {
  if (role === "SUPER_ADMIN") {
   return [
    {
     label: "Company",
     state: "superAdminDashboard.company",
     icon: "bi-building",
    },
    {
     label: "Tracks",
     state: "admin.tracks",
     icon: "bi-compass",
    },
    {
     label: "Users",
     state: "admin.users",
     icon: "bi-people",
    },
    {
     label: "Settings",
     state: "admin.settings",
     icon: "bi-gear",
    },
   ];
  }
 };
}

trackflow.service("SideBarService", [sideBarService]);
