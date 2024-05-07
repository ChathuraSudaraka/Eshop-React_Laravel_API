// DefaultLayout.js
import React, { useState } from "react";
import PanelFooter from "./PanelFooter";
import AdminSidebar from "./sidebar/AdminSidebar";
import AdminNavbar from "./sidebar/AdminNavbar";

const DefaultLayout = ({ children }) => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <div className="bg-slate-300">
      <div className="flex bg-slate-300 h-auto">
        <AdminSidebar
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />
        <div className={`${sidebarToggle ? "" : "ml-[265px]"} w-full`}>
          <AdminNavbar
            sidebarToggle={sidebarToggle}
            setSidebarToggle={setSidebarToggle}
          />
          <div className="px-2 py-2 bg-slate-300">
            {children} <PanelFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
