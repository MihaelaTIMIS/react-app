import React from "react";
import { Button, Avatar } from "antd";

import IntlMessages from "../../util/IntlMessages";
import {
  updateUser,
  getUser,
  updateUserProfile,
  userProfile,
  userFollower,
  annulationFollow,
  viewUserFollowed,
} from "../../appRedux/actions/users";
import { connect } from "react-redux";
import { getUrlVars } from "../../library/urlVar";
import { MEDIA_TYPE_USER } from "../../appRedux/actions/media";

import { history } from "./../../appRedux/store";

class UserInfoProfile extends React.Component {
  componentDidMount() {
    this.props.getUser();
    let slugUser = getUrlVars()["slug"];
    this.props.userProfile(slugUser);
    this.props.viewUserFollowed();
  }

  follow() {
    if (!this.props.user) {
      history.push("/login");
    } else {
      let slug = getUrlVars()["slug"];
      this.props.userFollower(slug, this.props.user.id).then(() => {
        this.props.viewUserFollowed();
      });
    }
  }

  annulateFollow() {
    let slug = getUrlVars()["slug"];
    this.props.annulationFollow(slug, this.props.user.id).then(() => {
      this.props.viewUserFollowed();
    });
  }

  render() {
    let idUserFollow = [];
    let userProfile = this.props.profile;
    let followerUser = this.props.userFollowed;

    if (followerUser) {
      for (let i = 0; i < followerUser.length; i++) {
        if (
          userProfile &&
          userProfile.id &&
          followerUser[i].followed === userProfile.id
        ) {
          idUserFollow.push(followerUser[i].id);
        }
      }
    }
    return (
      <div className="gx-profile-banner">
        <div className="gx-profile-container">
          <div className="gx-profile-banner-top">
            {
              <div className="gx-profile-banner-top-left">
                <div className="gx-profile-banner-avatar">
                  {userProfile && userProfile.__mediaProfile__ && (
                    <img
                      className="gx-rounded-lg"
                      style={{ width: "100px" }}
                      type={MEDIA_TYPE_USER}
                      src={userProfile.__mediaProfile__.path}
                      alt=""
                    />
                  )}
                  {userProfile && !userProfile.__mediaProfile__ && (
                    <Avatar shape="square" size={120} icon="user" />
                  )}
                </div>

                <div className="gx-profile-banner-avatar-info">
                  <h2 className="gx-mb-2 gx-mb-sm-3 gx-fs-xxl gx-font-weight-light">
                    {userProfile && userProfile.firstname}
                    {userProfile &&
                      !userProfile.firstname &&
                      userProfile.pseudo}{" "}
                    {userProfile && userProfile.linkedin && (
                      <a
                        href={userProfile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ borderRadius: "20%" }}
                      >
                        <Avatar
                          style={{ marginBottom: "10px" }}
                          shape="circle"
                          src={require("assets/images/linkedin.png")}
                        />
                      </a>
                    )}
                  </h2>
                  {userProfile && idUserFollow && idUserFollow.length ? (
                    <Button onClick={() => this.annulateFollow()}>
                      <IntlMessages id="miuwi.user.notfollow" />
                    </Button>
                  ) : (
                    <Button onClick={() => this.follow()}>
                      <IntlMessages id="miuwi.user.tofollow" />
                    </Button>
                  )}
                </div>
              </div>
            }

            {/* <div className="gx-profile-banner-top-right">
              <ul className="gx-follower-list">
                <li>
                  <span className="gx-follower-title gx-fs-lg gx-font-weight-medium">2k+</span>
                  <span className="gx-fs-sm">Followers</span></li>
                <li>
                  <span className="gx-follower-title gx-fs-lg gx-font-weight-medium">847</span>
                  <span className="gx-fs-sm">Following</span></li>
                <li>
                  <span className="gx-follower-title gx-fs-lg gx-font-weight-medium">327</span>
                  <span className="gx-fs-sm">Friends</span>
                </li>
              </ul>
            </div> */}
          </div>
          <div className="gx-profile-banner-bottom">
            <div className="gx-tab-list">
              {/* <ul className="gx-navbar-nav">
              <li>
                <span className="gx-link">Timeline</span>
              </li>
              <li>
                <span className="gx-link">About</span>
              </li>
              <li>
                <span className="gx-link">Photos</span>
              </li>
              <li>
                <span className="gx-link">Friends <span className="gx-fs-xs">287</span></span>
              </li>
              <li>
                <span className="gx-link">More</span>
              </li>
            </ul> */}
            </div>
            <span className="gx-link gx-profile-setting">
              {/* <i className="icon icon-setting gx-fs-lg gx-mr-2 gx-mr-sm-3 gx-d-inline-flex gx-vertical-align-middle" /> */}
              {/* <span className="gx-d-inline-flex gx-vertical-align-middle gx-ml-1 gx-ml-sm-0" onClick={() => this.switchViews()}>Setting</span> */}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state,
    user: state.user.user,
    locale: state.settings.locale,
    profile: state.user.profileUser,
    userFollowed: state.user.userFollowed,
  };
};

export default connect(mapStateToProps, {
  updateUser,
  getUser,
  updateUserProfile,
  userProfile,
  userFollower,
  annulationFollow,
  viewUserFollowed,
})(UserInfoProfile);
