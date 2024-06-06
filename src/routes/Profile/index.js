import React, { Component } from "react";
import { Col, Row, Button } from "antd";
import Widget from "components/Widget";
import About from "../../components/profile/About/index";
import Contact from "../../components/profile/Contact/index";

import Auxiliary from "../../util/Auxiliary";
import ProfileHeader from "../../components/profile/ProfileHeader/index";
import { getUser } from "../../appRedux/actions/users";
import { connect } from "react-redux";
import { ScrollToTopController } from "../../components/ScrollToTopController";
import AccountBanking from "../../components/profile/AccountBanking";
import Followers from "../../components/profile/Followers";
import Followedby from "../../components/profile/Followedby";
import IntlMessages from "../../util/IntlMessages";
import WorkshopArchives from "../WorkshopArchives";
import { InboxOutlined, ProfileOutlined } from "@ant-design/icons";
import { history } from "./../../appRedux/store";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      archive_page: false
    };
  }

  componentDidMount() {
    this.props.getUser();

    let { pathname } = history.location;
    this.setState({
      archive_page: pathname.includes("archive")
    });
  }

  render() {
    let user = this.props.user;
    let { archive_page } = this.state;

    return (
      <Auxiliary>
        <ScrollToTopController {...this.props} />
        <ProfileHeader user={user} archive_page={archive_page} />
        <div className="gx-profile-content">
          <Row>
            <Col xl={16} lg={14} md={14} sm={24} xs={24}>
              {archive_page ? <WorkshopArchives /> : <About />}
            </Col>

            <Col xl={8} lg={10} md={10} sm={24} xs={24}>
              <Widget title={"Actions"} styleName="gx-card-profile-sm">
                <div>
                  {archive_page && (
                    <Button
                      style={{
                        color: "rgb(48, 101, 175)",
                        border: "none",
                        boxShadow: "none",
                        lineHeight: "1.2em",
                        marginLeft: "0",
                        paddingLeft: "0"
                      }}
                      onClick={() => history.push("/user")}
                    >
                      <ProfileOutlined
                        style={{
                          fontSize: "22px",
                          color: "rgb(48, 101, 175)"
                        }}
                      />
                      <IntlMessages id="miuwi.project.viewProjects" />
                    </Button>
                  )}
                  {!archive_page && (
                    <Button
                      style={{
                        color: "#8A709B",
                        border: "none",
                        boxShadow: "none",
                        lineHeight: "1.2em",
                        marginLeft: "0",
                        paddingLeft: "0"
                      }}
                      onClick={() => history.push("/user/archives")}
                    >
                      <InboxOutlined
                        style={{
                          fontSize: "22px",
                          color: "#8A709B"
                        }}
                      />
                      <IntlMessages id="miuwi.user.show.archives" />
                    </Button>
                  )}
                </div>
              </Widget>

              <Contact user={user} />
              <Row>
                <Col xl={24} lg={24} md={24} sm={12} xs={24}>
                  <AccountBanking></AccountBanking>
                  {user && user.followed && user.followed.length !== 0 && (
                    <Followers followers={user.followed} />
                  )}
                  {user && user.followed && user.followedby.length !== 0 && (
                    <Followedby followedby={user.followedby} />
                  )}
                </Col>
                <Col xl={24} lg={24} md={24} sm={12} xs={24}>
                  {/* <Photos photo={photoList}/> */}
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
    user: state.user.user
  };
};

export default connect(
  mapStateToProps,
  { getUser }
)(Profile);
