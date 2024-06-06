import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Col } from "antd";
import ProjectItem from "../../../../routes/ListProjects/ProjectItem";
import { getSeoProject } from "../../../../library/transformToUrl";
import {
  associateProjects,
  getProjectsOwner,
  getProject,
  dissociateProjects
} from "../../../../appRedux/actions/projects";
import { connect } from "react-redux";
import { MODE_EXPERT } from "../../../ReadProject/ProjectInfos";

class ProjectCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project_slug: null,
      readProject: false
    };
  }

  readProject(project) {
    this.setState({
      project_slug: project.slug,
      readProject: true
    });
  }

  associate(project1, project2) {
    this.props.associateProjects(project1.slug, project2.slug).then(() => {
      this.props.getProjectsOwner();
      this.props.getProject(project1.slug);
    });
  }

  dissociate(project1, project2) {
    this.props.dissociateProjects(project1.slug, project2.slug).then(() => {
      this.props.getProjectsOwner();
      this.props.getProject(project1.slug);
    });
  }
  render() {
    let projectAssociations = this.props.projectAssociation;
    if (this.props.owner) projectAssociations = this.props.projectsOwner;

    //create an array with the ids of the associated workshops
    let projectToAssociate = this.props.projectToAssociate
      ? this.props.projectToAssociate
      : this.props.project;
    let projects_associated = [];
    if (projectToAssociate)
      for (let i = 0; i < projectToAssociate.associatedProjects.length; i++) {
        projects_associated.push(projectToAssociate.associatedProjects[i].id);
      }

    //show the associated workshops
    if (projectAssociations.length === 0) {
      return <div></div>;
    } else {
      return (
        projectAssociations &&
        projectAssociations.map((proj, key) => {
          //on n'affiche pas le tutoriel sur lequel on est positoinnés
          if (
            this.props.owner &&
            projectToAssociate &&
            proj.id === projectToAssociate.id
          )
            return null;
          //on n'affiche pas les tutoriel pas publiés
          else if (!this.props.owner && !proj.online) {
            return null;
          } else {
            return (
              <Col key={key} xl={6} md={12} sm={12} xs={24}>
                {this.state.readProject ? (
                  <Redirect
                    to={{
                      pathname: getSeoProject(proj),
                      state: {
                        mode: MODE_EXPERT,
                        slug: this.state.project_slug
                      }
                    }}
                  />
                ) : (
                  <ProjectItem
                    project={proj}
                    grid
                    readProject={() => this.readProject(proj)}
                    associate={() =>
                      this.associate(this.props.projectToAssociate, proj)
                    }
                    dissociate={() =>
                      this.dissociate(this.props.projectToAssociate, proj)
                    }
                    owner={this.props.owner}
                    projects_associated={projects_associated}
                  />
                )}
              </Col>
            );
          }
        })
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    project: state.projects.proiect,
    projectAssociation: state.projects.projectsAssociate
  };
};
export default connect(
  mapStateToProps,
  {
    getProject,
    getProjectsOwner,
    associateProjects,
    dissociateProjects
  }
)(ProjectCard);
