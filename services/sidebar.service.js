function sideBarService() {
  this.getSideBarOptions = function (role) {
    if (role.name === "SUPER_ADMIN") {
      return [
        {
          label: "Company",
          state: "superAdminDashboard.company",
          icon: "bi-building",
        },
        {
          label: "Dashboard",
          state: "superAdminDashboard.base",
          icon: "bi-house",
        },
      ];
    }
    console.log("Role: ", role);
    var sideBarOptions = [];
    var userPermissions = role.permissionSet.permissions;
    if (userPermissions.PEOPLE.CREATE) {
      sideBarOptions.push({
        label: "People",
        state: "company.people",
        icon: "bi-people",
      });
    }

    if (userPermissions.PROJECT.CREATE) {
      sideBarOptions.push({
        label: "Projects",
        state: "company.projects",
        icon: "bi-clipboard",
      });
    }

    if (userPermissions.ROLE.CREATE) {
      sideBarOptions.push({
        label: "Role Management",
        state: "company.roleManagement",
        icon: "bi-bezier2",
      });
    }

    if (role.name === "COMPANY_ADMIN") {
      sideBarOptions.push({
        label: "Dashboard",
        state: "company.dashboard",
        icon: "bi-house",
      });

      sideBarOptions.push({
        label: "Activity",
        state: "company.activity",
        icon: "bi-hourglass-split",
      });
    }

    console.log("Side bar options: ", sideBarOptions);
    return sideBarOptions;
  };
}

trackflow.service("SideBarService", [sideBarService]);
