import React from "react";
import IntlMessages from "util/IntlMessages";
import SwitchStep from "../../components/CreateProject/SwitchStep";
import { ScrollToTopController } from "../../components/ScrollToTopController";
const Project = (props) => {
  return (
    <div>
      <ScrollToTopController {...props} />
      <h1 className="title gx-mb-4" style={{ textAlign: "center" }}>
        <IntlMessages id="miuwi.sidebar.createProject" />
      </h1>
      <SwitchStep />
    </div>
  );
};
export default Project;
