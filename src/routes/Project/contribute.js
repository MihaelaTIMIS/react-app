import React from "react";
import IntlMessages from "util/IntlMessages";
import { getUrlVars } from "../../library/urlVar"
import ContributeToTheProject from "./../../components/ContributeToTheProject/ContributeToTheProject";

const UpdateProject = (props) => {
    let slug = getUrlVars()['id'];
      return (
        <div>
            <h1 className="title gx-mb-4" style={{ textAlign: "center" }}>
                {slug && <IntlMessages id="miuwi.sidebar.contributeProject" />}
            </h1>
            <ContributeToTheProject slug={slug} history={props.history} />
        </div>
    );
};

export default UpdateProject;
