import React, { Component } from "react";
import { Layout, Popover } from "antd";
import {
  getAllProjects,
  searchProjects,
  initSearchProjects,
  updateSearchText
} from "./../../../appRedux/actions/projects";

import { history } from "./../../../appRedux/store";

import { connect } from "react-redux";
import CustomScrollbars from "util/CustomScrollbars";
import languageData from "../languageData";
import SearchBox from "components/SearchBox";
import UserInfo from "components/UserInfo";
import { Link } from "react-router-dom";
import {
  switchLanguage,
  toggleCollapsedSideNav
} from "../../../appRedux/actions/Setting";
import IntlMessages from "../../../util/IntlMessages";
import { logout } from "../../../appRedux/actions/Auth";
import { userLanguage, getUser } from "../../../appRedux/actions/users";
import jwt_decod from "jwt-decode";
import { FormattedMessage } from "react-intl";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

class HorizontalDefault extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: null
    };
  }

  componentDidMount() {
    this.props.getUser();
  }

  languageMenu = () => (
    <CustomScrollbars className="gx-popover-lang-scroll">
      <ul className="gx-sub-popover">
        {languageData.map(language => (
          <li
            className="gx-media gx-pointer"
            key={JSON.stringify(language)}
            onClick={e => this.myLanguage(language)}
          >
            <i className={`flag flag-24 gx-mr-2 flag-${language.icon}`} />
            <span className="gx-language-text">{language.name}</span>
          </li>
        ))}
      </ul>
    </CustomScrollbars>
  );

  updateSearchChatUser = evt => {
    let value = evt.target.value;
    this.setState({ searchText: value });
    if (value.length >= 3) {
      this.props.searchProjects(value).then(() => {
        history.push("/projects/search");
      });
    } else {
      this.props.initSearchProjects();
    }
  };

  cleanStorage() {
    this.props.logout().then(() => {
      history.push("/welcome");
    });
  }

  myLanguage = language => {
    let languageUser = language.languageId;
    this.props.switchLanguage(language);
    if (localStorage.getItem("jwt")) {
      this.props.userLanguage(languageUser);
    }
  };

  render() {
    let langUser = this.props.user && this.props.user.languageUser;
    if (langUser) {
      languageData.forEach(lang => {
        if (lang.languageId === langUser) {
          this.props.switchLanguage(lang);
        }
      });
    }

    const { locale, navCollapsed } = this.props;
    let jwt = localStorage.getItem("jwt");
    if (jwt) {
      let decode = jwt_decod(jwt);
      if (decode.exp < Date.now() / 1000) {
        localStorage.clear();
        jwt = null;
      }
    }

    return (
      <div
        className="gx-header-horizontal"
        style={{
          zIndex: "999",
          position: "fixed",
          margin: "0 auto",
          width: "100%"
        }}
      >
        <div className="gx-header-horizontal-top">
          <div className="gx-container">
            <div className="gx-header-horizontal-top-flex">
              {/* <div className="gx-header-horizontal-top-left">
                <i className="icon icon-alert gx-mr-3" />
                 <p className="gx-mb-0 gx-text-truncate"><IntlMessages id="app.announced" /></p>
              </div>*/}
              <ul className="gx-login-list">
                <li>
                  {jwt && (
                    <span style={{ color: "grey" }}>
                      <a
                        href="mailto:louis@spliik.com?subject=Feedback&body=Hello,"
                        style={{
                          color: "#320540",
                          textTransform: "initial",
                          fontWeight: "100"
                        }}
                      >
                        <IntlMessages id="spliik.feedback.label" />
                      </a>{" "}
                      |{" "}
                    </span>
                  )}
                  {jwt && (
                    <Link
                      to="/#"
                      onClick={() => this.cleanStorage()}
                      style={{ fontWeight: "100" }}
                    >
                      <IntlMessages id="miuwi.sideBar.logout" />
                    </Link>
                  )}
                  {!jwt && (
                    <Link to="/login">
                      <IntlMessages id="miuwi.sidebar.login" />
                    </Link>
                  )}
                </li>
                {!jwt && (
                  <li>
                    <Link to="/signup">
                      <IntlMessages id="app.userAuth.signUp" />
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <Header className="gx-header-horizontal-main">
          <div className="gx-container">
            <div className="gx-header-horizontal-main-flex">
              <div className=" gx-linebar ">
                <i
                  className="gx-icon-btn icon icon-menu"
                  onClick={() => {
                    this.props.toggleCollapsedSideNav(!navCollapsed);
                  }}
                />
              </div>
              <Link
                to="/"
                className="gx-d-block gx-d-lg-none gx-pointer gx-w-logo"
              >
                <img
                  alt=""
                  src="https://spliik-asset.s3.eu-central-1.amazonaws.com/LogoSPLIIK_final.png"
                  width="150"
                />
              </Link>
              <Link
                to="/"
                className="gx-d-none gx-d-lg-block gx-pointer gx-mr-xs-5 gx-logo"
              >
                <img
                  alt=""
                  src="https://spliik-asset.s3.eu-central-1.amazonaws.com/LogoSPLIIK_final.png"
                  width="150"
                />
              </Link>
              <div className="gx-header-search gx-d-none gx-d-lg-flex gx-d-md-flex gx-xl-flex">
                <FormattedMessage id="spliik.search.placeholder">
                  {placeholder => (
                    <SearchBox
                      styleName="gx-lt-icon-search-bar-lg"
                      placeholder={placeholder}
                      onChange={this.updateSearchChatUser.bind(this)}
                      value={
                        this.props.searchText
                          ? this.props.searchText
                          : this.state.searchText
                      } //searchProject={searchProject}
                    />
                  )}
                </FormattedMessage>
              </div>

              <ul className="gx-header-notifications gx-ml-auto">
                {jwt && (
                  <li className="gx-user-nav">
                    <UserInfo />
                  </li>
                )}
                {!jwt && (
                  <li className="gx-user-nav">
                    <Link to="/login">
                      <UserOutlined
                        style={{ fontSize: "22px", color: "#FB6116" }}
                      />
                    </Link>
                  </li>
                )}
                <li className="gx-language">
                  <Popover
                    overlayClassName="gx-popover-horizantal"
                    placement="bottomRight"
                    content={this.languageMenu()}
                    trigger="click"
                  >
                    <span className="gx-pointer gx-flex-row gx-align-items-center">
                      <i className={`flag flag-24 flag-${locale.icon}`} />
                    </span>
                  </Popover>
                </li>
              </ul>
              {/*   <div className="gx-header-search gx-d-xl-none gx-d-md-none">
                <SearchBox
                  placeholder="Rechercher un atelier..."
                  onChange={this.updateSearchChatUser.bind(this)}
                  value={
                    this.props.searchText
                      ? this.props.searchText
                      : this.state.searchText
                  }
                />
              </div> */}
            </div>
          </div>
        </Header>
        <div
          className="gx-header-horizontal-nav gx-header-horizontal-nav-curve gx-d-none gx-d-lg-block"
          style={{
            minHeight: "25px",
            lineHeight: "23px",
            textAlign: "center",
            color: "#FFF",
            fontWeight: "100",
            fontSize: "16px"
          }}
        >
          <IntlMessages id="miuwi.welcome" />
        </div>
        {/*  <div className="gx-header-horizontal-nav gx-header-horizontal-nav-curve gx-d-none gx-d-lg-block">
          <div className="gx-container">
            <div className="gx-header-horizontal-nav-flex">
              <HorizontalNav />
            
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = ({ settings, user }) => state => {
  const { locale, navCollapsed } = settings;
  return {
    locale,
    navCollapsed,
    user: state.user.user,
    projects: state.projects.projects,
    searchText: state.projects.searchText
  };
};
export default connect(mapStateToProps, {
  toggleCollapsedSideNav,
  switchLanguage,
  logout,
  userLanguage,
  getUser,
  getAllProjects,
  searchProjects,
  initSearchProjects,
  updateSearchText
})(HorizontalDefault);
