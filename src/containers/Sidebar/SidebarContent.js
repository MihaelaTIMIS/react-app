import React, { Component } from "react";
import { connect } from "react-redux";
import { /* Menu, */ Divider } from "antd";
import { Link } from "react-router-dom";
// import CustomScrollbars from "util/CustomScrollbars";
import SearchBox from "components/SearchBox";
import Auxiliary from "util/Auxiliary";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  // THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import { getCategoriesCache } from "../../appRedux/actions/category";
import {
  searchProjects,
  initSearchProjects,
  updateSearchText
} from "../../appRedux/actions/projects";
import IntlMessages from "../../util/IntlMessages";

import { history } from "./../../appRedux/store";

// const SubMenu = Menu.SubMenu;
class SidebarContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: null
    };
  }

  componentDidMount() {
    // this.props.getCategoriesItems()
    this.props.getCategoriesCache();
  }

  getNoHeaderClass = navStyle => {
    if (
      navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR ||
      navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR
    ) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  getNavStyleSubMenuClass = navStyle => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };

  updateSearchChatUser = evt => {
    this.props.updateSearchText(evt.target.value);

    this.setState({
      searchText: evt.target.value
    });
  };

  onKeyDownSearch = evt => {
    /*   this.props.initSearchProjects(); */
    if (evt.keyCode === 13) {
      this.props.searchProjects(evt.target.value);
      history.push("/projects/search");
    }
  };

  createProject = () => {
    this.props.initCreateProject();
  };
  render() {
    // const {  themeType,  navStyle, items,  pathname } = this.props;
    // let language = this.props.locale.languageId;
    // const selectedKeys = pathname.substr(1);
    // const defaultOpenKeys = selectedKeys.split("/")[1];
    return (
      <Auxiliary>
        <div className="gx-layout-sider-header" style={{ paddingLeft: 15 }}>
          <SearchBox
            styleName="gx-lt-icon-search-bar-lg"
            placeholder="Rechercher un atelier..."
            onChange={this.updateSearchChatUser.bind(this)}
            onKeyDown={this.onKeyDownSearch.bind(this)}
            value={
              this.props.searchText
                ? this.props.searchText
                : this.state.searchText
            }
          />
        </div>

        <div className="gx-sidebar-content">
          {/*  <div className={`gx-sidebar-notifications ${this.getNoHeaderClass(navStyle)}`}>
          <UserProfile />
          <AppsNavigation />
        </div> */}
          <br />
          <Link to="/projects" style={{ margin: "20px" }}>
            <IntlMessages id="miuwi.welcome.lastWorkshops" />
          </Link>
          <Divider />
          <Link to="/projects" style={{ margin: "20px" }}>
            <IntlMessages id="miuwi.welcome.mostViewed" />
          </Link>
          <Divider />
          <Link to="/projects" style={{ margin: "20px" }}>
            <IntlMessages id="miuwi.welcome.unavoidables" />
          </Link>
          <Divider />
          {/* <CustomScrollbars className="gx-layout-sider-scrollbar"> */}
            {/* workshop categories */}
            {/* <Menu
              defaultOpenKeys={[defaultOpenKeys]}
              selectedKeys={[selectedKeys]}
              theme={themeType === THEME_TYPE_LITE ? "lite" : "dark"}
              mode="inline"
            >
              {items &&
                items.map((cat, key) => {
                  let id = cat.id;
                  // let label = language === 'french' ? cat.label_fr : (language === 'english' ? cat.label_en : (language === 'spanish' && cat.label_es))
                  let label = cat["label_" + language];
                  return (
                    <SubMenu
                      key={"main" + key}
                      className={this.getNavStyleSubMenuClass(navStyle)}
                      title={label}
                    >
                      <Menu.Item>
                        <Link to={"/projects/category/?id=" + id}>
                          <IntlMessages id="miuwi.keywords.all" /> - {label}
                        </Link>
                      </Menu.Item>
                      {cat &&
                        cat.projectSubcategories &&
                        cat.projectSubcategories.map((subCat, key) => {
                          let id = subCat.id;
                          // let subCatLabel = language === 'french' ? subCat.label_fr : (language === 'english' ? subCat.label_en : (language === 'spanish' && subCat.label_es))
                          let subCatLabel = subCat["label_" + language];
                          return (
                            <Menu.Item key={key}>
                              <Link to={"/projects/subcategory/?id=" + id}>
                                {subCatLabel}
                              </Link>
                            </Menu.Item>
                          );
                        })}
                    </SubMenu>
                  );
                })}
            </Menu> */}
            {/* <Divider /> */}
            <a
              href="https://www.spliik.com/supports"
              rel="noopener noreferrer"
              target="_blank"
              style={{ margin: "20px" }}
            >
              FAQ
            </a>
          {/* </CustomScrollbars> */}
        </div>
      </Auxiliary>
    );
  }
}

SidebarContent.propTypes = {};
const mapStateToProps = ({ settings, categories, projects }) => {
  const { navStyle, themeType, locale, pathname, width } = settings;
  const { items } = categories;
  const { searchText } = projects;
  return { navStyle, themeType, locale, pathname, items, searchText, width };
};
export default connect(
  mapStateToProps,
  {
    getCategoriesCache,
    searchProjects,
    initSearchProjects,
    updateSearchText
  }
)(SidebarContent);
