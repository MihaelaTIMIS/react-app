import "./index.css";

import React from "react";
import Linkify from 'react-linkify';
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import StarRatingComponent from "react-star-rating-component";
import { Row, Col, Button, Modal, Spin, Tag } from "antd";

import { history } from "./../../appRedux/store";

import Thumb from "../Media/Thumb";
import {
  getAwsProject,
  getProject,
  studentStartsProject,
  initProjectStudent,
  studentArchivesProject,
  getProjectStudent,
  getProjectHelper,
  getProjectAuthor,
  getProjectOwner
} from "../../appRedux/actions/projects";
import Calendar from "./StudentCalendar";
import Invitations from "../ReadProject/Invitations";
import CopyProject from "../ReadProject/CopyProject";
import {
  TITLE_AUTHOR,
  getProjectThreads,
  RESUME_AUTHOR
} from "../../appRedux/actions/threadsAction";
import { getUrlVars } from "../../library/urlVar";
import IntlMessages from "../../util/IntlMessages";
import { getUser } from "../../appRedux/actions/users";
/* import Checkout from "./../ReadProject/CheckoutPayment"; */
import { getOpinion } from "../../appRedux/actions/opinion";
import CircularProgress from "../../components/CircularProgress";
import { MEDIA_TYPE_PROJECT } from "../../appRedux/actions/media";
import { VIDEO_TYPE_PROJECT } from "../../appRedux/actions/videos";
import UploadVideo from "../../routes/components/Upload/UploadVideo";
import UploadPicture from "../../routes/components/Upload/UploadPicture";
import ConversationThreading from "../CreateProject/CreateSteps/components/ConversationThreading";
import ComponentOwner from "./ComponentOwner";
/* import { FormattedMessage } from "react-intl"; */
import ProceedToPayment from "./ProceedToPayment";

export const MODE_CONTRIBUTE = "MODE_CONTRIBUTE";
export const MODE_EXPERT = "MODE_EXPERT";
export const MODE_STUDENT = "MODE_STUDENT";
export const MODE_HELPER = "MODE_HELPER";
export const MODE_READONLY = "MODE_READONLY";
export const MODE_ASSOCIATE = "MODE_ASSOCIATE";

let slug;
const jwt = require("jsonwebtoken");

class RealizeProjectheader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thread: {
        visible: false,
        title: "",
        type: TITLE_AUTHOR,
        label: ""
      },
      showPayementConfirmationModal: false,
      connect: false,
      loading: false,
      emailHelper: "",
      userProfile: false,
      showInvitationsModal: false,
      invitationsMode: ""
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
    if (!slug || slug === undefined) {
      if (this.props.aws_project && this.props.aws_project.slug) {
        slug = this.props.aws_project.slug;
      }
    }

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
                });
              });
          });
          break;

        default:
          this.setState({ loading: true });
          this.props.getAwsProject(slug).then(() => {
            this.props.getUser().then(user => {
              this.setState({ loading: false });
              if (user) {
                this.props.getProjectAuthor(slug);
                this.props.getProjectOwner(slug);
                this.props.getProjectStudent(slug);
              } else {
                this.props.initProjectStudent();
              }
            });
          });
          /* this.props.getProject(slug).then(() => {
          }); */
          break;
      }
    }
    if (this.mounted) {
      this.setState({ loading: false });
    }
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

  startProject = (project, project_student, aws_project) => {
    // console.log("this.props.student")
    // console.log(this.props.student)

    if (this.props.user) {
      if (project_student && project_student.is_archived) {
        this.resumeProject(project_student);
        history.push(`/project/student/?id=${project_student.slug}`);
      } else {
        let slug = project && project.slug ? project.slug : aws_project.slug;
        this.props.studentStartsProject(slug).then(project_student => {
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

  render() {
    if (this.state.loading) return <CircularProgress />;
    else {
      let {
        mode,
        user,
        project,
        project_student,
        opinions,
        threads,
        aws_project
      } = this.props;

      let language = this.props.settings.locale.languageId;

      let media1,
        title,
        video1,
        media2,
        media3,
        is_free,
        online,
        resume,
        // duration,
        nb_exercises,
        average,
        projectsStudent,
        category,
        subcategory,
        owner_slug,
        price_totalHT,
        price_totalTTC;

      if (mode === MODE_READONLY && aws_project) {
        media1 = aws_project.media1;
        title = aws_project.title;
        video1 = aws_project.video1;
        media2 = aws_project.media2;
        media3 = aws_project.media3;

        price_totalHT = aws_project.price_totalHT;
        price_totalTTC = aws_project.price_totalTTC;
        is_free = aws_project.is_free;
        online = aws_project.online;
        resume = aws_project.resume;
        nb_exercises = aws_project.nb_exercises;
        // duration =
        //   aws_project.nb_exercises *
        //   parseInt(process.env.REACT_APP_DURATION_EXERCICE);
        average = aws_project.notation;
        projectsStudent = aws_project.nb_collaboraters;

        category = aws_project && aws_project.category["label_" + language];
        subcategory =
          aws_project && aws_project.subcategory["label_" + language];

        owner_slug = aws_project.owner_slug;
      } else {
        if (project && project.title) {
          media1 = project.media1;
          title = project.title;
          video1 = project.video1;
          media2 = project.media2;
          media3 = project.media3;

          price_totalHT = project.price_totalHT;
          price_totalTTC = project.price_totalTTC;
          is_free = project.is_free;
          online = project.online;
          resume = project.resume;
          if (project.exercices) {
            // duration =
            //   project.exercices.length *
            //   parseInt(process.env.REACT_APP_DURATION_EXERCICE);
            nb_exercises = project.exercices.length;
          } 
          // else duration = 0;
          let total = 0;
          for (let i = 0; i < opinions.length; i++) {
            total += opinions[i].notation;
            average = total / opinions.length;
          }
          projectsStudent =
            project.projectsStudent && project.projectsStudent.length;

          category = project && project.category["label_" + language];
          subcategory = project && project.subcategory["label_" + language];
          let owner = project.owner;
          owner_slug = owner.slugUser;
        }
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
                <Redirect to={`/profile/?slug=${owner_slug}`} />
              )}
              <Row span={24}>
                {/* workshop image + video */}
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                  {/* media1 */}
                  <Row>
                    {!this.props.allowUploadPicture1 ? (
                      <img
                        alt="Illustration"
                        src={
                          (media1 && media1.path) ||
                          /* project && project.media1 && project.media1.id
                            ? project.media1.path
                            : */
                          require("assets/images/Logo_SPLIIK-single-bw.png")
                        }
                        className="spliik-img-illustration"
                      />
                    ) : (
                        <UploadPicture
                          height="150"
                          type={MEDIA_TYPE_PROJECT}
                          indexMedia="1"
                          projectId={project && project.id}
                          projectSlug={project && project.slug}
                          media={project && project.media1}
                          labelBtn={<IntlMessages id="miuwi.form.addPicture" />}
                        />
                      )}
                  </Row>
                  {!this.props.whenEditProject && (
                    <>
                      {/* duration */}
                      {/* <Row style={{ marginTop: "10px" }}>
                        <IntlMessages id="miuwi.offlineUser.timeNeeded" />
                        &nbsp;: {duration} minutes approx.
                      </Row> */}

                      {/* exercises nb */}
                      <Row style={{ marginTop: "10px" }}>
                        <IntlMessages id="miuwi.offlineUser.nbExercises" />
                        &nbsp;: {nb_exercises}
                      </Row>

                      {/* workshop rating */}
                      {average !== 0 && average !== undefined && (
                        <Row
                          style={{ marginTop: "10px" }}
                          hidden={average !== 0}
                        >
                          <IntlMessages id="miuwi.offlineUser.note" />
                          &nbsp;
                          <StarRatingComponent value={average} name="rating" />
                        </Row>
                      )}

                      {/* active students */}
                      {projectsStudent > 0 && (
                        <Row>
                          <IntlMessages id="miuwi.offlineUser.nbActive" />
                          &nbsp;: {projectsStudent}
                          {/* <Badge className="site-badge-count-4" count={projectsStudent} style={{ backgroundColor: '#52c41a' }} >
                          </Badge> */}
                        </Row>
                      )}
                      {/* video */}
                      <Row style={{ marginTop: "15px" }}>
                        {video1 && (
                          <UploadVideo
                            upload={false}
                            project={project}
                            video={video1}
                            type={VIDEO_TYPE_PROJECT}
                            width="90%"
                          />
                        )}
                      </Row>
                    </>
                  )}
                </Col>

                {/* other workshop infos */}
                <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                  <Row span={24}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      {/* TITLE */}
                      <Row>
                        <span
                          style={{
                            overflow: "ellipsis",
                            fontWeight: "500",
                            fontSize: "22px"
                          }}
                        >
                          {title}
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
                      </Row>

                      {/* CATEGORY */}
                      <Row style={{ marginTop: "7px" }}>
                        <p style={{ fontWeight: "100" }}>
                          <IntlMessages id="miuwi.project.category" />
                          &nbsp;:&nbsp;
                          {category}
                          {subcategory && <span>&nbsp;&gt; {subcategory}</span>}
                        </p>
                      </Row>

                      {/* OWNER - PRICE */}
                      {owner_slug && <ComponentOwner slug={owner_slug} />}

                      {/* project price */}
                      <Row style={{ marginTop: "10px" }}>
                        <Col>
                          {/* button start if CONNECTED and NOT STARTED and PAYING */}
                          {mode === MODE_READONLY &&
                            /* project && */
                            !is_free &&
                            user &&
                            !project_student && (
                              <ProceedToPayment
                                slug={slug}
                                project_student={project_student}
                                title={title}
                                price_totalTTC={price_totalTTC}
                                history={this.props.history}
                              />
                            )}
                          {mode === MODE_READONLY &&
                            !this.state.loading &&
                            project_student &&
                            project_student.finish_date && (
                              <Button
                                type="primary"
                                style={{
                                  position: "center",
                                  marginRight: "15px"
                                }}
                                onClick={() =>
                                  this.startProject(
                                    project,
                                    project_student,
                                    aws_project
                                  )
                                }
                              >
                                <IntlMessages id="miuwi.project.archive.review" />
                              </Button>
                            )}

                          {/* commencer l'atelier */}
                          {mode === MODE_READONLY &&
                            /* project && */
                            slug &&
                            online &&
                            ((is_free && !project_student) ||
                              !user ||
                              (project_student &&
                                !project_student.finish_date)) && (
                              <Link
                                to={{
                                  pathname: `project/student/?id=${slug}`,
                                  state: { slug: slug }
                                }}
                              >
                                {
                                  <Button
                                    type="primary"
                                    style={{
                                      position: "center",
                                      marginRight: "15px"
                                    }}
                                    onClick={() =>
                                      this.startProject(
                                        project,
                                        project_student,
                                        aws_project
                                      )
                                    }
                                  >
                                    {!user && (
                                      <IntlMessages id="miuwi.offlineUser.readyButton" />
                                    )}
                                    {user && !project_student && (
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
                                }
                              </Link>
                            )}
                          {mode === MODE_READONLY &&
                            /* project && */
                            !is_free &&
                            user &&
                            !project_student && (
                              <Tag color="geekblue">
                                {price_totalHT}€&nbsp;HT
                              </Tag>
                            )}

                          {mode === MODE_READONLY &&
                            project &&
                            !project.is_free && (
                              <div style={{ marginTop: "10px" }}>
                                <IntlMessages id="miuwi.project.tarif.label" />
                                <label
                                  style={{
                                    marginRight: "7px",
                                    fontSize: "1.2em"
                                  }}
                                >
                                  {/* project. */ price_totalHT}€ HT&nbsp;
                                  <label style={{ fontSize: "12px" }}>
                                    ({/* project. */ price_totalTTC}€ TTC)
                                  </label>
                                </label>
                              </div>
                            )}

                          {/* PAYED label */}
                          {(mode === MODE_READONLY || mode === MODE_STUDENT) &&
                            !this.state.loading &&
                            /*  project && */
                            !is_free &&
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
                          {/* project && */
                            is_free && online && !project_student && (
                              <Tag color="geekblue">
                                <IntlMessages id="miuwi.project.tarif.free" />
                              </Tag>
                            )}
                        </Col>
                      </Row>

                      {/* calendar */}
                      <Row style={{ marginTop: "10px" }}>
                        {mode === MODE_STUDENT && (
                          <Calendar project={project} />
                        )}
                      </Row>

                      {/* link of project to copy */}
                      {online && (
                        <Row>
                          <CopyProject project={project || aws_project} />
                        </Row>
                      )}

                      {/* share this workshop */}
                      {user && user.id && online && (
                        <Row>
                          <Invitations
                            invitationsMode="SHARE_WORKSHOP"
                            project={project}
                            project_student={project_student}
                          />
                        </Row>
                      )}
                    </Col>

                    {/* media 2,3 */}
                    {!this.props.whenEditProject && (
                      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Row
                          type="flex"
                          justify="center"
                          style={{ marginBottom: "10px" }}
                        >
                          {media2 && <Thumb media={media2} />}
                        </Row>

                        <Row type="flex" justify="center">
                          {media3 && <Thumb media={media3} />}
                        </Row>
                      </Col>
                    )}
                  </Row>

                  {/* résumé */}
                  <Row>
                    <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                      <a target="blank" href={decoratedHref} key={key}>
                        {decoratedText}
                      </a>
                    )}>
                      <p
                        style={{
                          fontWeight: "100",
                          whiteSpace: "pre-line",
                          textAlign: "justify",
                          marginRight: "20px",
                          marginTop: "20px"
                        }}
                      >
                        {resume}
                      </p>
                    </Linkify>
                  </Row>
                  <Row
                    style={{ float: "right" }}
                  >
                    {/* fil de discussion résumé */}
                    {(mode === MODE_EXPERT || mode === MODE_CONTRIBUTE) &&
                      threads &&
                      this.props.current !== 5 && (
                        <p
                          style={{
                            color: "#F04E14",
                            border: "none",
                            boxShadow: "none",
                            marginRight: "20px"
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
                        </p>
                      )}
                  </Row>

                  {/* student invites helper */}
                  {this.props.student &&
                    !this.props.student.finish_date &&
                    !this.props.helper && (
                      <Row className="student-invite-helper">
                        <Invitations
                          invitationsMode="INVITE_HELPER"
                          project={project}
                          project_student={project_student}
                        />
                      </Row>
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
                      {this.state.thread.title}
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
    aws_project: state.projects.aws_project,
    user: state.user.user,
    settings: state.settings,
    project: state.projects.project,
    project_student: state.projects.project_student,
    project_helper: state.projects.project_helper,
    project_author: state.projects.project_author,
    project_owner: state.projects.project_owner,
    current: state.screen.current,
    opinions: state.opinion.opinions
  };
};
export default connect(
  mapStateToProps,
  {
    getAwsProject,
    getProject,
    getUser,
    getOpinion,
    getProjectHelper,
    studentStartsProject,
    studentArchivesProject,
    initProjectStudent,
    getProjectThreads,
    getProjectStudent,
    getProjectAuthor,
    getProjectOwner
  }
)(RealizeProjectheader);
