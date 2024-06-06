import React from "react";
import "./index.css";
import CalendarModal from "./Modal";
import CalendarButton from "./Button";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Checkout from "./CheckoutPayment";
import IntlMessages from "../../util/IntlMessages";
import { getUrlVars } from "../../library/urlVar";
import AddToCalendarHOC from "react-add-to-calendar-hoc";
import { NotificationManager } from "react-notifications";
import { Row, Col, Button, Avatar, Modal, Input, Spin, Tag } from "antd";
import { MEDIA_TYPE_PROJECT } from "../../appRedux/actions/media";
import UploadPicture from "../../routes/components/Upload/UploadPicture";
import {
  getProject,
  emailInviteHelper,
  studentStartsProject,
  initProjectStudent,
  studentArchivesProject,
  getProjectStudent,
  getProjectHelper,
  getProjectAuthor,
  getProjectOwner
} from "../../appRedux/actions/projects";
import { history } from "./../../appRedux/store";

import { getUser } from "../../appRedux/actions/users";
import CircularProgress from "../../components/CircularProgress";
import ConversationThreading from "../CreateProject/CreateSteps/components/ConversationThreading";
import {
  TITLE_AUTHOR,
  getProjectThreads,
  RESUME_AUTHOR
} from "../../appRedux/actions/threadsAction";
import CopyProject from "./CopyProject";

export const MODE_CONTRIBUTE = "MODE_CONTRIBUTE";
export const MODE_EXPERT = "MODE_EXPERT";
export const MODE_STUDENT = "MODE_STUDENT";
export const MODE_HELPER = "MODE_HELPER";
export const MODE_READONLY = "MODE_READONLY";
export const MODE_ASSOCIATE = "MODE_ASSOCIATE";
export const MODE_ADMIN = "MODE_ADMIN";

//add calendar
var moment = require("moment");
const AddToCalendarModal = AddToCalendarHOC(CalendarButton, CalendarModal);
const startDatetime = moment()
  .utc()
  .add(2, "days");
const endDatetime = startDatetime.clone().add(9, "hours");
const duration = moment.duration(endDatetime.diff(startDatetime)).asHours();
const event = {
  description:
    "Description of event. Going to have a lot of fun doing things that we scheduled ahead of time.",
  duration: duration.toString(),
  endDatetime: endDatetime.format("YYYYMMDDTHHmmssZ"),
  location: "NYC",
  startDatetime: startDatetime.format("YYYYMMDDTHHmmssZ"),
  title: ""
};

const jwt = require("jsonwebtoken");
let slug;
class ProjectInfos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thread: {
        visible: false,
        title: "",
        type: TITLE_AUTHOR,
        label: ""
      },
      connect: false,
      loading: false,
      emailHelper: "",
      userProfile: false
    };
  }

  componentWillMount() {
    this.setState({ loading: true });
  }

  componentWillUnmount() {
    this.mounted = false;
  }
  componentDidMount() {
    this.mounted = true;
    this.importComponent();
  }

  importComponent() {
    let { mode } = this.props;
    this.setState({ connect: false });
    if (jwt.decode(localStorage.jwt, { complete: true })) {
      this.setState({ connect: true });
    }

    slug = getUrlVars()["id"];
    if (mode === MODE_ASSOCIATE) slug = this.props.slug;
    if (slug) {
      switch (mode) {
        case MODE_HELPER:
          this.setState({ hideStartButton: true, loading: true });
          this.props.getUser().then(() => {
            this.props.getProjectHelper(slug).then(() => {
              let project =
                this.props.project_helper && this.props.project_helper.project;
              if (project) {
                this.props.getProject(project.slug).then(() => {
                  this.setState({ loading: false });
                });
              }
            });
          });
          break;

        case MODE_STUDENT:
          let project;
          this.setState({ loading: true });
          this.props.getUser().then(() => {
            this.props
              .getProjectStudent(slug)
              .then(() => {
                project =
                  this.props.project_student &&
                  this.props.project_student.project;
                if (project) {
                  this.props.getProject(project.slug).then(() => {
                    this.setState({ loading: false });
                  });
                }
              })
              .catch(() => {
                this.setState({ loading: true });
                this.props.getProject(slug).then(() => {
                  this.setState({ loading: false });
                  if (project) {
                    this.initializeCalendarTitle(project);
                  }
                });
              });
          });
          break;

        default:
          this.setState({ loading: true });
          this.props.getProject(slug).then(() => {
            this.props.getUser().then(user => {
              this.setState({ loading: false });
              if (user) {
                this.props.getProjectAuthor(slug);
                this.props.getProjectOwner(slug);
                this.props.getProjectStudent(slug);
                this.initializeCalendarTitle(this.props.project);
              } else {
                this.props.initProjectStudent();
              }
            });
          });
          break;
      }
    }
    if (this.mounted) {
      this.setState({ loading: false });
    }
  }

  initializeCalendarTitle = project => {
    if (project) {
      event.title = `Mon atelier Spliik: ${project.title}`;
    }
  };

  copy() {
    var copyText = document.querySelector("#link");
    copyText.select();
    document.execCommand("copy");
  }

  showProfile = () => {
    this.setState({
      userProfile: true
    });
  };

  showThreads = (type, project, label) => {
    if (project) {
      this.props.getProjectThreads(project.slug, type);

      this.setState({
        thread: {
          visible: true,
          type: type,
          title: project.title,
          resume: project.resume,
          label: label
        }
      });
    }
  };

  hideThreads = e => {
    this.setState({
      thread: { visible: false, type: "", title: "" }
    });
  };

  startProject = (project, project_student) => {
    if (this.props.user) {
      if (project_student && project_student.is_archived) {
        this.resumeProject(project_student);
        history.push(`/project/student/?id=${project_student.slug}`);
      } else {
        this.props.studentStartsProject(project.slug).then(project_student => {
          if (project_student) {
            history.push(`/project/student/?id=${project_student.slug}`);
          }
        });
      }
    } else {
      history.push("/login");
    }
  };

  resumeProject = project_student => {
    this.props.studentArchivesProject(project_student.slug, false).then(() => {
      NotificationManager.success(
        <IntlMessages id="notification.projectUnarchived" />,
        <IntlMessages id="notification.success" />
      );
    });
  };

  inviteHelper = slug_project => {
    if (this.state.emailHelper.length) {
      this.props
        .emailInviteHelper(slug_project, this.state.emailHelper)
        .then(() => {
          this.props.getProjectStudent(slug);
          NotificationManager.success(
            <IntlMessages id="notification.projectInviteAuthors" />,
            <IntlMessages id="notification.success" />
          );
          document.getElementById("emailHelper").value = "";
          this.setState({ emailHelper: "" });
        })
        .catch(error => {
          if (error.message.indexOf("code 409") !== -1) {
            NotificationManager.error(
              <IntlMessages id="notification.already_helper" />,
              <IntlMessages id="notification.errorMessage" />,
              5000
            );
          }
        });
    } else {
      NotificationManager.error(
        <IntlMessages id="notification.projectInviteAuthors.error" />
      );
    }

    this.setState({ emailHelper: "" });
  };

  render() {
    if (this.state.loading) return <CircularProgress />;
    else {
      let { mode } = this.props;
      let user = this.props.user;
      let project = this.props.project;
      let project_student = this.props.project_student;
      let threads = this.props.threads;
      let language = this.props.settings.locale.languageId;
      let owner = project && project.owner;
      let ownerName = "";
      if (owner) {
        if (owner.firstname && owner.lastname) {
          ownerName =
            owner.firstname.charAt(0).toUpperCase() + owner.firstname.slice(1);
        } else ownerName = owner.pseudo;
      }
      return (
        <div>
          {this.state.loading && (
            <div style={{ textAlign: "center" }}>
              <Spin size="large" />
            </div>
          )}
          {!this.state.loading && (
            <>
              {this.state.userProfile && (
                <Redirect to={`/profile/?slug=${owner.slugUser}`} />
              )}
              <Row span={24}>
                {/* workshop image */}
                <Col span={8}>
                  {!this.props.allowUploadPicture1 ? (
                    <img
                      alt="Illustration"
                      src={
                        project && project.media1 && project.media1.id
                          ? project.media1.path
                          : require("assets/images/Logo_SPLIIK-single-bw.png")
                      }
                      className="spliik-img-illustration"
                    />
                  ) : (
                    <UploadPicture
                      type={MEDIA_TYPE_PROJECT}
                      indexMedia="1"
                      projectId={project && project.id}
                      projectSlug={project && project.slug}
                      media={project && project.media1}
                      labelBtn={<IntlMessages id="miuwi.form.addPicture" />}
                    />
                  )}
                </Col>

                <Col span={16}>
                  {/* TITLE */}
                  <span
                    style={{
                      overflow: "ellipsis",
                      fontWeight: "500",
                      fontSize: "22px"
                    }}
                  >
                    {project && project.title}
                  </span>
                  &nbsp;
                  {/* IN PROGRESS label */}
                  {(mode === MODE_STUDENT || mode === MODE_READONLY) &&
                    !this.state.loading &&
                    project_student &&
                    !project_student.finish_date &&
                    !project_student.is_archived && (
                      <Tag color="volcano">
                        <IntlMessages id="miuwi.project.student.statusInProgress" />
                      </Tag>
                    )}
                  {/* FINISHED label */}
                  {(mode === MODE_STUDENT || mode === MODE_READONLY) &&
                    !this.state.loading &&
                    project_student &&
                    project_student.finish_date && (
                      <Tag color="green">
                        <IntlMessages id="miuwi.project.student.statusFinished" />
                      </Tag>
                    )}
                  {/* fil de discussion titre  Expert/Assistant */}
                  {(mode === MODE_EXPERT || mode === MODE_CONTRIBUTE) &&
                    threads &&
                    this.props.current !== 5 && (
                      <Button
                        style={{
                          color: "#F04E14",
                          border: "none",
                          boxShadow: "none"
                        }}
                        onClick={() =>
                          this.showThreads(
                            TITLE_AUTHOR,
                            project,
                            <IntlMessages id="miuwi.titleLabel" />
                          )
                        }
                      >
                        <IntlMessages id="miuwi.thread.link" />
                      </Button>
                    )}
                  {/* category */}
                  <p>
                    <IntlMessages id="miuwi.project.category" />
                    :&nbsp;
                    {project &&
                      project.category &&
                      project.category["label_" + language]}
                    {project && project.subcategory && (
                      <span>
                        {" "}
                        &gt; {project.subcategory["label_" + language]}
                      </span>
                    )}
                  </p>
                  {/* workshop owner */}
                  {
                    <p
                      onClick={() => this.showProfile(owner.slugUser)}
                      style={{ cursor: "pointer" }}
                    >
                      <IntlMessages id="miuwi.user.owner" />:{` ${ownerName} `}
                      {owner &&
                        owner.__mediaProfile__ &&
                        owner.__mediaProfile__.path && (
                          <Avatar
                            src={
                              owner &&
                              owner.__mediaProfile__ &&
                              owner.__mediaProfile__.path
                            }
                          />
                        )}
                      {owner && !owner.__mediaProfile__ && (
                        <Avatar
                          style={{ backgroundColor: "#5498D5" }}
                          icon="user"
                        />
                      )}
                      {owner && owner.linkedin && (
                        <a
                          href={owner.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ borderRadius: "20%" }}
                        >
                          <Avatar
                            shape="circle"
                            style={{ marginBottom: "10px" }}
                            src={require("assets/images/linkedin.png")}
                          />
                        </a>
                      )}
                    </p>
                  }
                  {/* calendar */}
                  {mode === MODE_STUDENT && (
                    <AddToCalendarModal
                      className="componentStyles"
                      linkProps={{ className: "linkStyles" }}
                      event={event}
                      buttonText=""
                    />
                  )}
                  {/* résumé */}
                  <p style={{ fontWeight: "100", whiteSpace: "pre-line" }}>
                    {project && project.resume}
                  </p>
                  {/* fil de discussion résumé */}
                  {(mode === MODE_EXPERT || mode === MODE_CONTRIBUTE) &&
                    threads &&
                    this.props.current !== 5 && (
                      <Button
                        style={{
                          color: "#F04E14",
                          border: "none",
                          boxShadow: "none"
                        }}
                        onClick={() =>
                          this.showThreads(
                            RESUME_AUTHOR,
                            project,
                            <IntlMessages id="miuwi.project.create.resume" />
                          )
                        }
                      >
                        <IntlMessages id="miuwi.thread.link" />
                      </Button>
                    )}
                  {/* link of project to copy */}
                  <CopyProject project={project} />
                  {/* project price */}
                  {mode === MODE_READONLY && project && !project.is_free && (
                    <div>
                      <br />
                      <IntlMessages id="miuwi.project.tarif.label" />
                      <label style={{ marginRight: "7px", fontSize: "1.2em" }}>
                        :&nbsp;{project.price_totalHT}€ HT (
                        <label style={{ fontSize: "12px" }}>
                          {project.price_totalTTC}€ TTC
                        </label>
                        )
                      </label>
                    </div>
                  )}
                  {/* button start if CONNECTED and NOT STARTED and PAYING */}
                  {mode === MODE_READONLY &&
                    project &&
                    !project.is_free &&
                    user &&
                    !project_student && (
                      <Checkout
                        amount={project && project.price_totalTTC}
                        project_student={project_student}
                        project_title={project.title}
                      />
                    )}
                  {/* commencer l'atelier */}
                  {mode === MODE_READONLY &&
                    project &&
                    project.slug &&
                    project.online &&
                    (project.is_free ||
                      !user ||
                      (project_student && !project_student.finish_date)) && (
                      <Link to={`project/student/?id=${project.slug}`}>
                        <Button
                          type="primary"
                          style={{ position: "center", marginRight: "15px" }}
                          onClick={() =>
                            this.startProject(project, project_student)
                          }
                        >
                          {(!user || (user && !project_student)) && (
                            <IntlMessages id="miuwi.offlineUser.readyButton" />
                          )}
                          {user && user.id && project_student && (
                            <>
                              {project_student.is_archived ? (
                                <IntlMessages id="miuwi.project.student.resume" />
                              ) : (
                                <IntlMessages id="miuwi.project.student.continue" />
                              )}
                            </>
                          )}
                        </Button>
                      </Link>
                    )}
                  {/* PAYED label */}
                  {(mode === MODE_READONLY || mode === MODE_STUDENT) &&
                    !this.state.loading &&
                    project &&
                    !project.is_free &&
                    project_student &&
                    project_student.is_payed &&
                    !project_student.is_archived &&
                    !project_student.finish_date && (
                      <Tag color="geekblue">
                        <IntlMessages id="miuwi.project.student.payed" />
                      </Tag>
                    )}
                  {/* ARCHIVED label */}
                  {!this.state.loading &&
                    project_student &&
                    project_student.is_archived && (
                      <Tag color="purple">
                        <IntlMessages id="miuwi.project.student.statusArchived" />
                      </Tag>
                    )}
                  {/* FREE label */}
                  {project &&
                    project.is_free &&
                    project.online &&
                    !project_student && (
                      <Tag color="geekblue">
                        <IntlMessages id="miuwi.project.tarif.free" />
                      </Tag>
                    )}
                  {/* student invites helper */}
                  {this.props.student &&
                    !this.props.student.finish_date &&
                    !this.props.helper && (
                      <div>
                        <p style={{ color: "#F04E14", fontWeight: "100" }}>
                          <IntlMessages id="miuwi.project.student.help" />
                        </p>
                        <Input
                          id="emailHelper"
                          placeholder="Email"
                          value={this.state.emailHelper}
                          style={{ width: "150px" }}
                          onChange={event =>
                            this.setState({ emailHelper: event.target.value })
                          }
                        ></Input>
                        <Button
                          style={{ position: "absolute", marginLeft: "10px" }}
                          onClick={() => this.inviteHelper(slug)}
                        >
                          <IntlMessages id="miuwi.thread.sendButton" />
                        </Button>
                      </div>
                    )}
                </Col>

                {/* fil de discussion  */}
                <Modal
                  title={
                    <p>
                      <IntlMessages id="miuwi.thread.label" />{" "}
                      {this.state.thread.label}
                    </p>
                  }
                  visible={this.state.thread.visible}
                  onCancel={() => this.hideThreads()}
                  footer={[null, null]}
                  width="60%"
                >
                  {this.state.thread.type === TITLE_AUTHOR && (
                    <p style={{ whiteSpace: "pre-line" }}>
                      {this.state.thread.title}{" "}
                    </p>
                  )}
                  {this.state.thread.type === RESUME_AUTHOR && (
                    <div style={{ fontWeight: "100", whiteSpace: "pre-line" }}>
                      {this.state.thread.resume}
                    </div>
                  )}
                  {project && project.id && (
                    <ConversationThreading
                      type={this.state.thread.type}
                      threads={threads}
                      project={project}
                    />
                  )}
                </Modal>
              </Row>
            </>
          )}
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    state,
    user: state.user.user,
    settings: state.settings,
    project: state.projects.project,
    project_student: state.projects.project_student,
    project_helper: state.projects.project_helper,
    project_author: state.projects.project_author,
    project_owner: state.projects.project_owner,
    current: state.screen.current
  };
};
export default connect(
  mapStateToProps,
  {
    getProject,
    getUser,
    getProjectHelper,
    studentStartsProject,
    studentArchivesProject,
    initProjectStudent,
    getProjectThreads,
    emailInviteHelper,
    getProjectStudent,
    getProjectAuthor,
    getProjectOwner
  }
)(ProjectInfos);
