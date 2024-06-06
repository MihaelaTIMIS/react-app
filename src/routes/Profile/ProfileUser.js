import React, { Component } from "react";
import { Col, Row } from "antd";
import About from "../../components/profile/About/aboutUser";
import Biography from "../../components/profile/Biography/index";

import Auxiliary from "../../util/Auxiliary";
import UserInfoProfile from "../../routes/components/UserInfoProfile";
import { userProfile } from "../../appRedux/actions/users";
import { getUrlVars } from "../../library/urlVar";
import { connect } from "react-redux";
class Profile extends Component {
  componentDidMount() {
    let slug = getUrlVars()["slug"];
    this.props.userProfile(slug);
  }

  render() {
    let user = this.props.profile;
    let history = this.props;
    let languageId = this.props.language;
    return (
      <Auxiliary>
        <UserInfoProfile history={history} />
        <div className="gx-profile-content" style={{ padding: "20px 0 0 0" }}>
          <Row>
            <Col xl={16} lg={14} md={14} sm={24} xs={24}>
              {user && (
                <About
                  projects={user.projects}
                  history={history}
                  languageId={languageId}
                />
              )}
            </Col>
            <Col xl={8} lg={10} md={10} sm={24} xs={24}>
              <Row>
                <Col xl={24} lg={24} md={24} sm={12} xs={24}>
                  {user && <Biography headline={user.headline} />}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.user.profileUser,
    language: state.settings.locale.languageId
  };
};

export default connect(
  mapStateToProps,
  { userProfile }
)(Profile);
