import "./MainApp.css";
import React, { Component } from "react";
import { Layout } from "antd";

import Sidebar from "../Sidebar/index";
import HorizontalDefault from "../Topbar/HorizontalDefault/index";
import HorizontalDark from "../Topbar/HorizontalDark/index";
import InsideHeader from "../Topbar/InsideHeader/index";
import AboveHeader from "../Topbar/AboveHeader/index";
import BelowHeader from "../Topbar/BelowHeader/index";

import { NotificationContainer } from "react-notifications";
import Topbar from "../Topbar/index";
import { footerText } from "util/config";
import App from "routes/index";
import { connect } from "react-redux";
import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  NAV_STYLE_MINI_SIDEBAR,
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR
} from "../../constants/ThemeSetting";
import NoHeaderNotification from "../Topbar/NoHeaderNotification/index";
import IntlMessages from "../../util/IntlMessages";

import CookieConsent from "react-cookie-consent";
import { FormattedMessage } from "react-intl";

const { Content, Footer } = Layout;

export class MainApp extends Component {
  getContainerClass = navStyle => {
    switch (navStyle) {
      case NAV_STYLE_DARK_HORIZONTAL:
        return "gx-container-wrap";
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return "gx-container-wrap";
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return "gx-container-wrap";
      case NAV_STYLE_BELOW_HEADER:
        return "gx-container-wrap";
      case NAV_STYLE_ABOVE_HEADER:
        return "gx-container-wrap";
      default:
        return "";
    }
  };
  getNavStyles = navStyle => {
    switch (navStyle) {
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return <HorizontalDefault />;
      case NAV_STYLE_DARK_HORIZONTAL:
        return <HorizontalDark />;
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return <InsideHeader />;
      case NAV_STYLE_ABOVE_HEADER:
        return <AboveHeader />;
      case NAV_STYLE_BELOW_HEADER:
        return <BelowHeader />;
      case NAV_STYLE_FIXED:
        return <Topbar />;
      case NAV_STYLE_DRAWER:
        return <Topbar />;
      case NAV_STYLE_MINI_SIDEBAR:
        return <Topbar />;
      case NAV_STYLE_NO_HEADER_MINI_SIDEBAR:
        return <NoHeaderNotification />;
      case NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR:
        return <NoHeaderNotification />;
      default:
        return null;
    }
  };

  getSidebar = (/* navStyle, width */) => {
    /* if (width < TAB_SIZE) { */
    return <Sidebar history={this.props.history} />;
    /*  } */
    /*    switch (navStyle) {
      case NAV_STYLE_FIXED:
        return <Sidebar />;
      case NAV_STYLE_DRAWER:
        return <Sidebar />;
      case NAV_STYLE_MINI_SIDEBAR:
        return <Sidebar />;
      case NAV_STYLE_NO_HEADER_MINI_SIDEBAR:
        return <Sidebar />;
      case NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR:
        return <Sidebar />;
      default:
        return null;
    } */
  };

  render() {
    const { match, width, navStyle } = this.props;
    return (
      <Layout className="gx-app-layout">
        {this.getSidebar(navStyle, width)}
        <Layout>
          {this.getNavStyles(navStyle)}
          <Content
            className={`gx-layout-content ${this.getContainerClass(
              navStyle
            )} spliik-layout-content`}
          >
            <App match={match} />
            <Footer>
              <div
                className="gx-layout-footer-content"
                style={{
                  textAlign: "center",
                  color: "grey",
                  fontWeight: "100"
                }}
              >
                <a
                  href="https://www.spliik.com/supports"
                  rel="noopener noreferrer"
                  target="_blank"
                  style={{ color: "grey" }}
                >
                  <IntlMessages id="miuwi.privacypolicy" />
                </a>{" "}
                -&nbsp;
                <a
                  href="https://www.spliik.com/supports"
                  rel="noopener noreferrer"
                  target="_blank"
                  style={{ color: "grey" }}
                >
                  <IntlMessages id="miuwi.cgv" />
                </a>{" "}
                -&nbsp;
                <a
                  href="https://www.spliik.com/supports"
                  rel="noopener noreferrer"
                  target="_blank"
                  style={{ color: "grey" }}
                >
                  <IntlMessages id="miuwi.cgu" />
                </a>
                <br />
                {footerText}
              </div>
              <FormattedMessage id="spliik.cookie.consent.button">
                {button => (
                  <CookieConsent
                    location="bottom"
                    buttonText={button}
                    cookieName="spliikCookieConsent"
                    style={{ background: "#320540" }}
                    buttonStyle={{
                      color: "#FFF",
                      fontSize: "14px",
                      background: "#F74A14"
                    }}
                  >
                    <FormattedMessage id="spliik.cookie.consent">
                      {privacy => (
                        <div dangerouslySetInnerHTML={{ __html: privacy }} />
                      )}
                    </FormattedMessage>
                  </CookieConsent>
                )}
              </FormattedMessage>
            </Footer>
            <NotificationContainer />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { width, navStyle } = settings;
  return { width, navStyle };
};
export default connect(mapStateToProps)(MainApp);
