import React from "react";
import IntlMessages from "util/IntlMessages";
import { Card, Row, Col, Layout, Icon } from "antd";
import ProjectCard from "../../components/CreateProject/CreateSteps/Step4Components/ProjectCard";
import "./index.css";
import {
  getAwsProject,
  getProject,
  readProjectAssociate,
  emailInvite,
  loaderProject,
  getSlugProject
} from "./../../appRedux/actions/projects";
import { getUser } from "./../../appRedux/actions/users";
import { getOpinion } from "../../appRedux/actions/opinion";
import { connect } from "react-redux";
import { getUrlVars } from "../../library/urlVar";
import Avis from "../Opinion/Avis";
import { MODE_READONLY, MODE_EXPERT, MODE_CONTRIBUTE } from "./ProjectInfos";
import { NotificationManager } from "react-notifications";

import CircularProgress from "../../components/CircularProgress";
import ContributeExercises from "../ContributeToTheProject/ContributeExercises";
import RealizeProjectHeader from "../RealizeProject/RealizeProjectHeader";
import Invitations from "./Invitations";
import CopyProject from "./CopyProject";

const { Content } = Layout;
let mode, slug;
class ReadProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inviteEmail: "",
      loading: true
    };
    this.onChange = this.handleChange.bind(this);
    this.onSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { inviteEmail } = this.state;
    this.props
      .emailInvite(this.props.project.slug, inviteEmail)
      .then(() => {
        NotificationManager.success(
          <IntlMessages id="notification.projectInviteAuthors" />,
          <IntlMessages id="notification.success" />
        );
      })
      .catch(eror => {
        console.log(eror);
      });
  };

  componentDidMount() {
    /* = getUrlVars()["id"]; */
    mode = this.props.location.state
      ? this.props.location.state.mode
      : this.props.mode;

    if (!mode) {
      let search = this.props.location && this.props.location.search;
      if (search.includes("MODE_EXPERT")) mode = MODE_EXPERT;
    }

    slug = this.props.location.state
      ? this.props.location.state.slug
      : getUrlVars()["id"];

    if (!slug || slug === undefined) {
      if (
        this.props.match &&
        this.props.match.params &&
        this.props.match.params.minislug
      ) {
        slug = this.props.match.params.minislug;
      }
    }

    
    this.props.loaderProject(true);
    if (mode === MODE_EXPERT || mode === MODE_CONTRIBUTE) {
      if (slug) {
        this.props.getProject(slug).then(project => {
          if (project) {
            this.props.getUser();
            this.props.getOpinion(project.slug);
            this.props.readProjectAssociate(project.slug);
          }
        });
      }
    } else if(slug) {
      this.props.getAwsProject(slug).then(project => {
        if (project && project.slug) {
          this.props.readProjectAssociate(project.slug);
        }
      });
    } else {
      if(!slug && this.props.location && this.props.location.pathname){
        this.props.getSlugProject(this.props.location.pathname).then(result => {
          if(result.data && result.data.slug){
            this.props.getAwsProject(result.data.slug).then(project => {
              if (project && project.slug) {
                this.props.readProjectAssociate(project.slug);
              }
            });
          }
        }).catch(() => {
          return null;
        })
      }
    }
    this.setState({
      loading: false
    });
  }

  render() {
    if (this.state.loading) return <CircularProgress />;
    else {
      if (this.props.location.search) {
        localStorage.setItem("slug", this.props.location.search);
      }
      let associationsProjects = this.props.associations;
      let history = this.props.history;
      let project = { ...this.props.project };
      let user = { ...this.props.user };
      let aws_project = { ...this.props.aws_project };
      let online = project.online || aws_project.online;

      return (
        <div>
          {this.props.loader && (
            <div className="gx-loader-view">
              <img alt="example" src="/LogoSPLIIK.png" />
            </div>
          )}
          {!this.props.loader && (
            <Card className="gx-card">
              <Layout className="content">
                <Content>
                  <RealizeProjectHeader
                    history={this.props.history}
                    mode={mode === undefined ? MODE_READONLY : mode}
                  />

                  {/* exercices */}
                  {user && project.owner && user.id === project.owner.id && (
                    <Row>
                      <Col span={24}>
                        <p style={{ color: "#FB6116", fontSize: "18px" }}>
                          <Icon
                            type="exclamation-circle"
                            style={{
                              fontSize: "20px",
                              marginTop: "20px",
                              marginBottom: "20px"
                            }}
                            theme="twoTone"
                            twoToneColor="#FB6116"
                          />{" "}
                          &nbsp;{" "}
                          <IntlMessages id="miuwi.project.exercises.owner" />
                        </p>
                        <ContributeExercises readonly={true} slug={slug} />
                      </Col>
                    </Row>
                  )}

                  {/* opinions */}
                  {project.opinions && (
                    <Row
                      type="flex"
                      justify="space-between"
                      style={{ marginLeft: "1%" }}
                    >
                      <Col>
                        <h3 style={{ marginLeft: "15px" }}>
                          <IntlMessages id="miuwi.offlineUser.noticeTitle" />
                        </h3>
                        <Avis />
                      </Col>

                      <Col>
                        {online && (
                          <>
                            {/* share & discover  */}
                            <Row>
                              <h3>
                                <IntlMessages id="miuwi.project.shareAndDiscover" />
                              </h3>
                            </Row>

                            {/* project link */}
                            <Row>
                              <CopyProject project={project} />
                            </Row>

                            {/* share this workshop */}
                            {user && user.id && (
                              <Row>
                                <Invitations
                                  invitationsMode="SHARE_WORKSHOP"
                                  project={project}
                                />
                              </Row>
                            )}
                          </>
                        )}
                      </Col>
                    </Row>
                  )}

                  {/* associated workshops */}
                  <Row>
                    {associationsProjects && associationsProjects.length ? (
                      <h3>
                        <IntlMessages id="miuwi.offlineUser.projectsLabel" />
                      </h3>
                    ) : null}
                  </Row>
                  <br />
                  <Row justify="space-between">
                    <ProjectCard
                      associationsProjects={associationsProjects}
                      history={history}
                    />
                  </Row>
                </Content>
              </Layout>
            </Card>
          )}
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    aws_project: state.projects.aws_project,
    project: state.projects.project,
    loader: state.projects.loader,
    user: state.user.user,
    opinions: state.opinion.opinions,
    associations: state.projects.projectsAssociate
  };
};

export default connect(
  mapStateToProps,
  {
    getAwsProject,
    getProject,
    getUser,
    getOpinion,
    readProjectAssociate,
    emailInvite,
    loaderProject,
    getSlugProject
  }
)(ReadProject);
