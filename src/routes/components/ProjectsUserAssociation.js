import React, { Component } from "react";
import { getProjectsOwner, getProject } from "../../appRedux/actions/projects";
import { connect } from "react-redux";
import { Row } from "antd";
import ProjectCard from "../../components/CreateProject/CreateSteps/Step4Components/ProjectCard";
import { getUrlVars } from "../../library/urlVar";
let slug;
class ProjectsUserAssociations extends Component {
  componentDidMount() {
    slug = getUrlVars()["id"];
    if (slug) {
      this.props.getProjectsOwner();
      this.props.getProject(slug);
    }
  }

  render() {
    let projectsOwner = this.props.projects;
    let project = this.props.project;

    return (
      <div>
        <Row>
          <ProjectCard
            projectsOwner={projectsOwner}
            projectToAssociate={project}
            history={this.props.history}
            owner={true}
          />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects.projects,
    project: state.projects.project,
  };
};
export default connect(mapStateToProps, {
  getProjectsOwner,
  getProject,
})(ProjectsUserAssociations);
