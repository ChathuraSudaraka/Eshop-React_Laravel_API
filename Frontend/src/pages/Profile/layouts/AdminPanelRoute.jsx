import React, { useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Dashboard from "../pages/Dashboard";

function AdminPanelRoute() {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  return (
    <div className="flex px-2 py-2 bg-slate-300">
      <Sidebar sidebarToggle={sidebarToggle} />
      <Dashboard
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
      />
    </div>
  );
}

export default AdminPanelRoute;
