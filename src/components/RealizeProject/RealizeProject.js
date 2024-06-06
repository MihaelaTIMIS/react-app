import "./index.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { Card, Modal, Button, Row, Col, Spin, Icon, Layout } from "antd";
import {
  getProjectStudent,
  studentArchivesProject,
  studentFinalizesProject
} from "../../appRedux/actions/projects";
import { OVERVIEW_HELPER } from "../../appRedux/actions/threadsAction";
import IntlMessages from "../../util/IntlMessages";
import ConversationThreading from "../../components/CreateProject/CreateSteps/components/ConversationThreading";
import { MODE_STUDENT } from "../../components/ReadProject/ProjectInfos";
import StudentRealizeExercises from "./StudentRealizeExercises";
import "./index.css";
import FormOpinion from "../Opinion/FormOpinion";
import { editExerciseError } from "../../library/editExerciseError";
import RealizeProjectHeader from "./RealizeProjectHeader";
import StudentCalendar from "./StudentCalendar";
import Invitations from "../ReadProject/Invitations";
import CopyProject from "../ReadProject/CopyProject";

const { Content } = Layout;

class RealizeProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thread: {
        visible: false,
        title: "",
        type: "",
        label: ""
      },
      showVideo: false,
      showEditError: false,
      exerciseBeingEdited: null,
      loading: false,
      showMailToModal: false,
      owner_email: null
    };
    this.mailToClick = this.mailToClick.bind(this);
  }

  mailToClick(email) {
    window.location.href = `mailto:${email}`;
    this.setState({
      showMailToModal: false
    });
  }

  showMailToModal(owner_email) {
    this.setState({
      showMailToModal: true,
      owner_email: owner_email
    });
  }

  showThreads = (type, title, label) => {
    this.setState({
      thread: { visible: true, title: title, type: type, label: label }
    });
  };

  hideThreads = e => {
    this.setState({
      thread: { visible: false, type: "", title: "" }
    });
  };

  finishProject = slug => {
    this.props.studentFinalizesProject(slug).then(() => {
      NotificationManager.success(
        <IntlMessages id="notification.finishProject" />,
        <IntlMessages id="notification.success" />
      );

      this.setState({
        showConfirmFinishModal: false
      });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  saveExercises = (e, exercices) => {
    let isBeingEdited = editExerciseError(exercices);
    if (isBeingEdited) {
      e.preventDefault();
      this.setState({
        showEditError: true,
        exerciseBeingEdited: isBeingEdited
      });
    }
  };
  copy() {
    var copyText = document.querySelector("#link");
    copyText.select();
    document.execCommand("copy");
  }

  render() {
    let user = this.props.user;
    let project_student = this.props.project_student;
    let project = project_student && project_student.project;

    let projectsHelper =
      project_student &&
      project_student.projectsHelper &&
      project_student.projectsHelper;

    //prepare helpers emails
    let helper_emails = [];
    projectsHelper &&
      projectsHelper.map(p => {
        p.helper && helper_emails.push(p.helper.email);
        return p;
      });

    let exercices = project && project.exercices;
    let { threads } = this.props;
    return (
      <Card className="gx-card">
        <Layout>
          <Content>
            <RealizeProjectHeader
              student={project_student}
              mode={MODE_STUDENT}
            />

            <br />
            {this.state.loading && <Spin size="large" />}

            {/* fil de discussion d'ensemble */}
            {projectsHelper && projectsHelper.length > 0 && (
              <div
                style={{
                  textAlign: "center",
                  fontWeight: "100",
                  fontSize: "15px"
                }}
              >
                <p style={{ whiteSpace: "pre-line" }}>
                  <IntlMessages id="miuwi.thread.student.bubble" />:
                  <br />
                  {/*  {user ? user.firstname || user.pseudo : ""},{" "} */}
                  <span style={{ color: "#421152", fontWeight: "400" }}>
                    {projectsHelper.map(
                      (p_helper, index) =>
                        p_helper.helper &&
                        (index === 0 ? "" : ", ") + p_helper.helper.pseudo
                    )}{" "}
                  </span>
                </p>
                <Icon
                  type="message"
                  theme="twoTone"
                  twoToneColor="#3065AF"
                  style={{ fontSize: "35px", marginBottom: "15px" }}
                  onClick={() =>
                    this.showThreads(OVERVIEW_HELPER, project && project.title)
                  }
                />
                <hr />
              </div>
            )}

            {/* exercises */}
            {!this.state.loading && (
              <StudentRealizeExercises
                project={project}
                project_student={project_student}
                wrappedComponentRef={this.saveFormRef}
              />
            )}

            {/* footer buttons */}
            {project_student && !project_student.finish_date && (
              <Row
                type="flex"
                justify="space-between"
                span={24}
                style={{ marginTop: "25px" }}
              >
                <Col>
                  <Link
                    className="btnCentered"
                    to={
                      project_student && project_student.is_archived
                        ? `/user/archives?view=student`
                        : `/user?view=student`
                    }
                  >
                    <Button onClick={e => this.saveExercises(e, exercices)}>
                      <IntlMessages id="miuwi.project.saveAndCancel" />
                    </Button>
                  </Link>
                </Col>
                <Col>
                  <Button
                    style={{ float: "right" }}
                    onClick={() => this.finishProject(project_student.slug)}
                  >
                    <IntlMessages id="miuwi.project.student.finish" />
                  </Button>
                </Col>
              </Row>
            )}

            {/* footer */}
            {project && (
              <Col>
                {/* opinion */}
                {project_student && project_student.finish_date && (
                  <Row
                    type="flex"
                    justify="center"
                    style={{ paddingTop: "25px" }}
                  >
                    <Col>
                      <FormOpinion {...project} />
                    </Col>
                  </Row>
                )}

                <Row type="flex" gutter={12} justify="center">
                  {/* mail to helpers */}
                  <Col>
                    <Button
                      style={{ color: "#421152", borderColor: "#421152" }}
                      onClick={() => this.mailToClick(helper_emails)}
                    >
                      <IntlMessages id="miuwi.project.mailToHelpers" />
                    </Button>
                  </Col>

                  {/* mail to expert */}
                  <Col>
                    <Button
                      style={{ color: "#ef7911", borderColor: "#ef7911" }}
                      onClick={() => this.showMailToModal(project.owner.email)}
                    >
                      <IntlMessages id="miuwi.project.mailToExpert" />
                    </Button>
                  </Col>
                </Row>

                <Row
                  type="flex"
                  justify="space-between"
                  style={{ marginLeft: "1%" }}
                >
                  <Col>
                    {/* calendar */}
                    <StudentCalendar project_title={project.title} />
                    {/* student invites helper */}
                    {project_student && !project_student.finish_date && (
                      <Row className="student-invite-helper">
                        <Invitations
                          invitationsMode="INVITE_HELPER"
                          project={project}
                          project_student={project_student}
                        />
                      </Row>
                    )}
                  </Col>

                  {/* share & discover  */}
                  <Col>
                    <Row>
                      <h3>
                        <IntlMessages id="miuwi.project.shareAndDiscover" />
                      </h3>
                    </Row>

                    {/* link of project to copy */}
                    {project && <CopyProject project={project} />}

                    {/* share this workshop */}
                    {user && user.id && (
                      <Row>
                        <Invitations
                          invitationsMode="SHARE_WORKSHOP"
                          project={project}
                          project_student={project_student}
                        />
                      </Row>
                    )}
                  </Col>
                </Row>
              </Col>
            )}

            {/* conversation threading */}
            <Modal
              title={
                <p>
                  <IntlMessages id="miuwi.thread.overview" />
                  {this.state.thread.label}
                </p>
              }
              visible={this.state.thread.visible}
              onCancel={() => this.hideThreads()}
              footer={false}
              width="60%"
            >
              <p style={{ whiteSpace: "pre-line" }}>
                {this.state.thread.title}
              </p>
              {project && project.id && (
                <ConversationThreading
                  type={this.state.thread.type}
                  threads={threads}
                  student={project_student}
                />
              )}
            </Modal>

            {/* error when edit exercise */}
            <Modal
              // title
              visible={this.state.showEditError}
              onCancel={() => this.setState({ showEditError: false })}
              footer={[
                null,
                <Button
                  key="submit"
                  type="primary"
                  onClick={() => this.setState({ showEditError: false })}
                >
                  {" "}
                  OK
                </Button>
              ]}
            >
              {
                <div>
                  <br />
                  <p>
                    {<IntlMessages id="miuwi.project.exercises.editError" />}
                  </p>
                  <p>
                    <IntlMessages id="miuwi.project.title.exercise" />{" "}
                    <IntlMessages id="miuwi.titleLabel" />:{" "}
                    {this.state.exerciseBeingEdited &&
                      this.state.exerciseBeingEdited.idea}
                  </p>
                </div>
              }
            </Modal>

            {/* when send mail to expert */}
            <Modal
              title={<IntlMessages id="spliik.confirm" />}
              visible={this.state.showMailToModal}
              onCancel={() => this.setState({ showMailToModal: false })}
              onOk={() => this.mailToClick(this.state.owner_email)}
            >
              {<p>{<IntlMessages id="miuwi.project.mailToExpert.info" />}</p>}
            </Modal>
          </Content>
        </Layout>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    project_student: state.projects.project_student,
    threads: state.threads.threads,
    user: state.user.user
  };
};

export default connect(
  mapStateToProps,
  {
    getProjectStudent,
    studentArchivesProject,
    studentFinalizesProject
  }
)(RealizeProject);
