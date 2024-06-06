import React from "react";
import { Tabs } from "antd";
import Widget from "components/Widget";
import ExpertArchives from "../../routes/components/ExpertArchives";
import IntlMessages from "../../util/IntlMessages";

import { getUrlVars } from "./../../library/urlVar";
import { connect } from "react-redux";
import ProjectsStudent from "../components/ProjectsStudent";
import ProjectsHelper from "../components/ProjectsHelper";
import ProjectsAuthor from "../components/ProjectsAuthor";

// import { history } from "./../../appRedux/store";

const TabPane = Tabs.TabPane;

class WorkshopArchives extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: null,
      keyTabs: "student"
    };
  }
  componentWillMount() {
    this.setState({ keyTabs: getUrlVars()["view"] });
  }

  render() {

    return (
      <Widget
        title={
          <p style={{ color: "#421152" }}>
            <IntlMessages id="miuwi.user.archives" />
          </p>
        }
        styleName="gx-card-tabs gx-card-tabs-right gx-card-profile spliik-card-profil"
      >
        <Tabs
          type="card"
          defaultActiveKey={this.state.keyTabs}
        >
          <TabPane
            tab={
              <p style={{ color: "#3065AF" }}>
                <IntlMessages id="miuwi.user.student" />
              </p>
            }
            key="student"
          >
            <div className="gx-mb-2">
              <ProjectsStudent archive_page={true} />
            </div>
          </TabPane>
          {
            <TabPane
              tab={
                <p
                  style={{ color: "#421152" }}
                  className="spliik-tabcard-profil"
                  id="spliik-tabcard-profil"
                >
                  <IntlMessages id="miuwi.user.soutien.action" />
                </p>
              }
              key="support"
              className="spliik-tabcard-profil"
            >
              <div className="gx-mb-2">
                <ProjectsHelper archive_page={true} />
              </div>
            </TabPane>
          }
          <TabPane
            tab={
              <p style={{ color: "#EF7911" }}>
                <IntlMessages id="miuwi.user.owner" />
              </p>
            }
            key="expert"
          >
            <div className="gx-mb-2">
              <ExpertArchives />
            </div>
          </TabPane>
          <TabPane
            tab={
              <p style={{ color: "#E40E20" }}>
                <IntlMessages id="miuwi.offlineUser.authorTitle" />
              </p>
            }
            key="assistant"
          >
            <div className="gx-mb-2">
              <ProjectsAuthor archive_page={true} />
            </div>
          </TabPane>
        </Tabs>
      </Widget>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};
export default connect(mapStateToProps)(WorkshopArchives);
