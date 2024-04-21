import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css"; // Import styles for react-tabs
import Settings from "./Settings";
import General from "./General";
import PaymentMethod from "./Payment";
import "react-tabs/style/react-tabs.css";

const TabsSetting = () => {
  return (
    <div>
      <Tabs>
        {/* Define the TabList */}
        <TabList>
          <Tab>Personal info</Tab>
          <Tab>Setting</Tab>
          <Tab>Appearance</Tab>
          <Tab>Payment</Tab>
        </TabList>

        {/* Define the TabPanel for each tab */}
        <TabPanel>
          <General />
        </TabPanel>

        <TabPanel>
          <Settings />
        </TabPanel>

        {/* <TabPanel>
          <Appearance />
        </TabPanel> */}

        <TabPanel>
          <PaymentMethod />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TabsSetting;
