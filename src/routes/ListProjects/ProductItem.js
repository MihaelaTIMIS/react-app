import "./ProductItem.css";
import React from "react";
import { Col, Row, Spin, Icon } from "antd";
import {
  getProject,
  getProjectId,
  searchProjects,
  getAllProjects,
  getProjectWithCategory,
  getProjectWithSubCategory,
  getLastProjects,
  getMostViewed,
  getUnavoidables
} from "../../appRedux/actions/projects";
import ProjectItem from "./ProjectItem";
import { connect } from "react-redux";
import { getUrlVars } from "../../library/urlVar";
import IntlMessages from "../../util/IntlMessages";
import { FormattedMessage } from "react-intl";
import CircularProgress from "../../components/CircularProgress";
import { Link } from "react-router-dom";
import { getSeoProject } from "../../library/transformToUrl";

class ProductItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loadingLastProjects: false,
      loadingMostViewed: false,
      loadingUnavoidables: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.getAllProjects();
    let url = this.props.history.location.pathname;
    let id = getUrlVars()["id"];
    if (this.props.searchText) {
      this.setState({ loading: true });
      this.props.searchProjects(this.props.searchText).then(() => {
        this.setState({ loading: false });
      });
    } else {
      if (
        url.includes("projects/category/") ||
        url.includes("projects/subcategory/")
      ) {
        if (url.includes("projects/category/")) {
          this.setState({ loading: true });
          this.props.getProjectWithCategory(id).then(() => {
            this.setState({ loading: false });
          });
        }
        if (url.includes("projects/subcategory/")) {
          this.setState({ loading: true });
          this.props.getProjectWithSubCategory(id).then(() => {
            this.setState({ loading: false });
          });
        }
      }
      if (this.props.welcome || this.props.projects.length === 0) {
        this.setState({
          loading: true,
          loadingLastProjects: true,
          loadingMostViewed: true,
          loadingUnavoidables: true
        });
        this.props.getLastProjects().then(() => {
          this.setState({ loading: false, loadingLastProjects: false });
        });
        this.props.getMostViewed().then(() => {
          this.setState({ loading: false, loadingMostViewed: false });
        });
        this.props.getUnavoidables().then(() => {
          this.setState({ loading: false, loadingUnavoidables: false });
        });
      }
    }
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) return <CircularProgress />;
    else {
      const foundProjects = this.props.foundProjects;
      let {
        most_viewed_projects,
        unavoidable_projects,
        last_projects,
        projects
      } = this.props;
      return (
        <div>
          {/* lors de la recherche d'un tutoriel */}
          <Row>
            {this.props.searchText &&
              foundProjects.length &&
              foundProjects.map((proj, key) => {
                return (
                  <Col key={key} xl={6} md={8} sm={12} xs={24}>
                    {this.state.loading && (
                      <Row>
                        <Spin size="large" />
                      </Row>
                    )}
                    <Link
                      to={{
                        pathname: getSeoProject(proj),
                        state: { slug: proj.slug }
                      }}
                    >
                      {!this.state.loading && (
                        <ProjectItem project={proj} grid />
                      )}
                    </Link>
                  </Col>
                );
              })}
          </Row>

          {/* tous les tutoriels */}
          <Row>
            {!this.props.searchText &&
              !this.props.welcome &&
              projects.length !== 0 &&
              projects.map((proj, key) => {
                return (
                  <Col key={key} xl={6} md={8} sm={12} xs={24}>
                    {this.state.loading && (
                      <Row>
                        <Spin size="large" />
                      </Row>
                    )}
                    {proj.category && (
                      <Link
                        to={{
                          pathname: getSeoProject(proj),
                          state: { slug: proj.slug }
                        }}
                      >
                        {!this.state.loading && (
                          <ProjectItem project={proj} grid />
                        )}
                      </Link>
                    )}
                  </Col>
                );
              })}
          </Row>

          <div>
            {/* Last published */}
            {!this.state.loading &&
              (this.props.welcome ||
                (projects.length === 0 && foundProjects.length === 0)) && (
                <div>
                  {!this.props.welcome && projects.length === 0 && (
                    <Row>
                      <Col
                        span={24}
                        style={{ marginBottom: "25px", textAlign: "center" }}
                      >
                        <Icon
                          type="exclamation-circle"
                          style={{ fontSize: "28px", color: "#FDCC56" }}
                        />
                        <br />
                        <br />
                        <FormattedMessage id="miuwi.not.whorkshop"></FormattedMessage>
                        <br />
                        <br />
                        <hr />
                      </Col>
                    </Row>
                  )}

                  {foundProjects.length === 0 && (
                    <div>
                      <Row>
                        <h2>
                          <IntlMessages id="miuwi.welcome.lastWorkshops" />
                        </h2>
                      </Row>
                      {this.state.loadingLastProjects && (
                        <Row>
                          <Spin size="large" />
                        </Row>
                      )}
                      {!this.state.loadingLastProjects && (
                        <Row>
                          {last_projects.map((proj, key) => {
                            return (
                              <Col key={key} xl={6} md={8} sm={12} xs={24}>
                                <Link
                                  to={{
                                    pathname: getSeoProject(proj),
                                    state: {
                                      slug: proj.slug
                                    }
                                  }}
                                >
                                  <ProjectItem project={proj} grid />
                                </Link>
                              </Col>
                            );
                          })}
                        </Row>
                      )}

                      {/* Most viewed */}
                      <Col span={24}>
                        <Row>
                          <h2>
                            <IntlMessages id="miuwi.welcome.mostViewed" />
                          </h2>
                        </Row>
                        {this.state.loadingMostViewed && (
                          <Row>
                            <Spin size="large" />
                          </Row>
                        )}
                        {!this.state.loadingMostViewed && (
                          <Row>
                            {most_viewed_projects.map((proj, key) => {
                              return (
                                <Col key={key} xl={6} md={8} sm={12} xs={24}>
                                  {proj.category && (
                                    <Link
                                      to={{
                                        pathname: getSeoProject(proj),
                                        state: {
                                          slug: proj.slug
                                        }
                                      }}
                                    >
                                      <ProjectItem project={proj} grid />
                                    </Link>
                                  )}
                                </Col>
                              );
                            })}
                          </Row>
                        )}
                      </Col>

                      {/* Unavoidables */}
                      <Col span={24}>
                        <Row>
                          <h2>
                            {" "}
                            <IntlMessages id="miuwi.welcome.unavoidables" />
                          </h2>
                        </Row>
                        {this.state.loadingUnavoidables && (
                          <Row>
                            <Spin size="large" />
                          </Row>
                        )}
                        {!this.state.loadingUnavoidables && (
                          <Row>
                            {unavoidable_projects.map((proj, key) => {
                              return (
                                <Col key={key} xl={6} md={8} sm={12} xs={24}>
                                  {proj.category && (
                                    <Link
                                      to={{
                                        pathname: getSeoProject(proj),
                                        state: {
                                          slug: proj.slug
                                        }
                                      }}
                                    >
                                      <ProjectItem project={proj} grid />
                                    </Link>
                                  )}
                                </Col>
                              );
                            })}
                          </Row>
                        )}
                      </Col>
                    </div>
                  )}
                </div>
              )}
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    categories: state.categories.items,
    projects: state.projects.projects,
    foundProjects: state.projects.foundProjects,
    searchText: state.projects.searchText,
    last_projects: state.projects.last_projects,
    most_viewed_projects: state.projects.most_viewed_projects,
    unavoidable_projects: state.projects.unavoidable_projects
  };
};

export default connect(mapStateToProps, {
  getProject,
  searchProjects,
  getProjectId,
  getAllProjects,
  getProjectWithCategory,
  getProjectWithSubCategory,
  getLastProjects,
  getMostViewed,
  getUnavoidables
})(ProductItem);
