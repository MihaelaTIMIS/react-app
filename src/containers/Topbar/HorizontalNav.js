import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { getCategoriesCache } from "../../appRedux/actions/category";
import { getProjectWithCategory } from "../../appRedux/actions/projects";
import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";

const SubMenu = Menu.SubMenu;

class HorizontalNav extends Component {
  getNavStyleSubMenuClass = navStyle => {
    switch (navStyle) {
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return "gx-menu-horizontal gx-submenu-popup-curve";
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-inside-submenu-popup-curve";
      case NAV_STYLE_BELOW_HEADER:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-below-submenu-popup-curve";
      case NAV_STYLE_ABOVE_HEADER:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-above-submenu-popup-curve";
      default:
        return "gx-menu-horizontal";
    }
  };

  componentDidMount() {
    // this.props.getCategoriesItems();
    this.props.getCategoriesCache();
  }

  redirectChange() {
    console.log("e");
  }

  render() {
    const { items } = this.props;
    let language = this.props.locale.languageId;
    const { pathname, navStyle } = this.props;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split("/")[1];
    return (
      <Menu
        defaultOpenKeys={[defaultOpenKeys]}
        selectedKeys={[selectedKeys]}
        mode="horizontal"
      >
        {items &&
          items.map((cat, key) => {
            let id = cat.id;
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
      </Menu>
    );
  }
}

/*

*/

HorizontalNav.propTypes = {};

const mapStateToProps = ({ settings, categories, projects }) => {
  const { ...project } = projects;
  const { items } = categories;
  const { themeType, navStyle, pathname, locale } = settings;

  return { themeType, navStyle, pathname, locale, items, project };
};
export default connect(mapStateToProps, {
  getCategoriesCache,
  getProjectWithCategory
})(HorizontalNav);
