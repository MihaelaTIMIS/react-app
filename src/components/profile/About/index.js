import React from "react";
import { Tabs } from "antd";
import Widget from "components/Widget";
import ProjectsUser from "../../../routes/components/ProjectsUser";
import ProjectsAuthor from "../../../routes/components/ProjectsAuthor";
import PublishRequest from "../../../routes/components/PublishRequest";
import ProjectsStudent from "../../../routes/components/ProjectsStudent";
import ProjectsHelper from "../../../routes/components/ProjectsHelper";
import IntlMessages from "../../../util/IntlMessages";

import { getUrlVars } from "./../../../library/urlVar";
import { connect } from "react-redux";

const TabPane = Tabs.TabPane;

class About extends React.Component {
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
    let { user } = this.props;
    return (
      <Widget
        title={
          <p style={{ color: "#3065AF" }}>
            <IntlMessages id="miuwi.sidebar.projects" />
          </p>
        }
        styleName={
          "gx-card-tabs-right gx-card-profile spliik-card-profil" + //gx-card-tabs
          (user && user.is_admin ? "-admin" : "")
        }
      >
        <Tabs
          type="card"
          tabBarGutter={5}
          defaultActiveKey={this.state.keyTabs}
        >
          {this.props.user && this.props.user.is_admin && (
            <TabPane
              tab={<IntlMessages id="miuwi.user.admin" />}
              key="publication"
            >
              <div className="gx-mb-2">
                <PublishRequest />
              </div>
            </TabPane>
          )}

          <TabPane
            tab={
              <p style={{ color: "#3065AF" }}>
                <IntlMessages id="miuwi.user.student.action" />
              </p>
            }
            key="student"
          >
            <div className="gx-mb-2">
              <ProjectsStudent />
            </div>
          </TabPane>
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
              <ProjectsHelper />
            </div>
          </TabPane>
          <TabPane
            tab={
              <p style={{ color: "#EF7911" }}>
                <IntlMessages id="miuwi.user.owner.action" />
              </p>
            }
            key="owner"
          >
            <div className="gx-mb-2">
              <ProjectsUser {...this.props} />
            </div>
          </TabPane>
          <TabPane
            tab={
              <p style={{ color: "#E40E20" }}>
                <IntlMessages id="miuwi.offlineUser.authorTitle.action" />
              </p>
            }
            key="assistant"
          >
            <div className="gx-mb-2">
              <ProjectsAuthor />
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
export default connect(mapStateToProps)(About);
