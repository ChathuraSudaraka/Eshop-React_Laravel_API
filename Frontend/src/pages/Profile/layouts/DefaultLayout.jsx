// DefaultLayout.js
import React, { useState } from "react";
import PanelFooter from "./PanelFooter";
import ProfileSidebar from "./sidebar/ProfileSidebar";
import ProfileNavbar from "./sidebar/ProfileNavbar";

const DefaultLayout = ({ children }) => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <div className="flex bg-slate-300 h-auto">
      <ProfileSidebar
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
      />
      <div className={`${sidebarToggle ? "" : "ml-[265px]"} w-full`}>
        <ProfileNavbar
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />
        <div className="px-2 py-2 bg-slate-300">
          {children} <PanelFooter />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
