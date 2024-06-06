import React from "react";
import { Col, Row, Button } from "antd";
import ProductItem from "./ProductItem";
import { initSearchProjects, initCreateProject } from './../../appRedux/actions/projects'
import { screenNext } from "../../appRedux/actions/screen";
import { getCategoriesCache } from '../../appRedux/actions/category'
import { getSubCategoriesItems } from '../../appRedux/actions/subCategory'
import { connect } from 'react-redux'
import IntlMessages from "util/IntlMessages";
import { getUrlVars } from "../../library/urlVar";
import { Link } from "react-router-dom";

class ListProjects extends React.Component {

  componentDidMount() {
    this.props.initSearchProjects();
    // this.props.getCategoriesItems();
    this.props.getCategoriesCache();
    this.props.getSubCategoriesItems();
  }
  createProject = () => {
    this.props.initCreateProject()
    this.props.screenNext(0)
  }
  render() {
    this.props.initSearchProjects();
    let url = this.props.history.location.pathname
    let history = this.props
    let { settings } = this.props
    let language = settings.languageId
    let id = getUrlVars()["id"];
    let category;
    let subCategory;
    const { categories } = this.props
    for (let i = 0; i < categories.length; i++) {

      if (categories[i].id === parseInt(id)) {
        category = categories[i]
        break;
      }

    }
    const { subCategories } = this.props
    for (let i = 0; i < subCategories.length; i++) {
      if (subCategories[i].id === parseInt(id)) {
        subCategory = subCategories[i]
        break;
      }
    }
    return (
      <div>
        <Row>
          <Col>
            <>
              {url.includes('projects/category/') && category &&
                < h2 className="title gx-mb-4">{category["label_" + language]}</h2>
              }
              {url.includes('projects/subcategory/') && subCategory &&
                <div>
                  <h2 className="title">{subCategory.categories["label_" + language]} &gt; {subCategory["label_" + language]}</h2>
                </div>
              }

            </>
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "center" }} >
            <Link to="/project/create"><Button type="primary" onClick={this.createProject}><IntlMessages id="miuwi.sidebar.createProject" /></Button></Link>
          </Col>
        </Row>
          <ProductItem history={history} />
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    categories: state.categories.items,
    settings: state.settings.locale,
    subCategories: state.subCategories.subCategories,
    searchText: state.projects.searchText
  }

};
export default connect(mapStateToProps, {
  getCategoriesCache,
  getSubCategoriesItems,
  initSearchProjects,
  initCreateProject,
  screenNext
})(ListProjects);