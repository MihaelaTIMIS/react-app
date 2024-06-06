import React from "react";
import { connect } from "react-redux";
import { Row, Button, Avatar, Col } from "antd";
import TextArea from "antd/lib/input/TextArea";

import { getUrlVars } from "../../../../library/urlVar";
import IntlMessages from "../../../../util/IntlMessages";
import { getUser } from "./../../../../appRedux/actions/users";
import { getProject } from "../../../../appRedux/actions/projects";
import {
  addThread,
  getProjectThreads,
  OVERVIEW_HELPER,
  EXERCICE_STUDENT
} from "../../../../appRedux/actions/threadsAction";
import { formatDate } from "../../../../library/formatDate";
import UploadPicture from "../../../../routes/components/Upload/UploadPicture";
import { MEDIA_TYPE_THREADS } from "../../../../appRedux/actions/media";
import UploadVideo from "../../../../routes/components/Upload/UploadVideo";
import { VIDEO_TYPE_THREAD } from "../../../../appRedux/actions/videos";
import {
  getProjectStudent,
  getProjectSpecifiedStudent
} from "../../../../appRedux/actions/projects";
import Thumb from "../../../Media/Thumb";

let slug;

class ConversationThreading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      project: null
    };
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    let slug_target, id_student;
    if (this.props.helper) {
      slug_target = this.props.helper.slug_project_student;
      id_student = this.props.helper.student && this.props.helper.student.id;
    }
    if (this.props.student) {
      id_student = this.props.student.id_student;
      slug_target = this.props.student.slug;
    }

    switch (this.props.type) {
      case EXERCICE_STUDENT:
        slug = slug_target;
        this.setState({
          project: this.props.student
        });
        break;
      case OVERVIEW_HELPER:
        slug = slug_target;
        this.props.getProjectSpecifiedStudent(slug, id_student).then(() => {
          this.setState({
            project: this.props.project_student
          });
        });
        break;
      default:
        slug = getUrlVars()["id"] || this.props.slug;
        this.setState({ project: this.props.project });

        //when create project
        if (!slug && this.state.project) slug = this.state.project.slug;

        break;
    }

    this.props.getProjectThreads(slug, this.props.type);
  }
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSendMessage = (message, type) => {
    this.setState({ message: "" });

    // if (type === "OVERVIEW_HELPER")
    //     slug = this.props.helper.project.slug
    // if (!slug)
    //     slug = this.props.project && this.props.project.slug
    const id_exercise = this.props.exercice ? this.props.exercice.id : null;
    if (typeof message === "string" && message.length)
      this.props.addThread({ message, type, slug, id_exercise }).then(() => {
        this.props.getProjectThreads(slug, type);
      });
  };

  render() {
    const connectedUser = this.props.user;
    const threads = this.props.threads;
    const exercice = this.props.exercice;
    let { project } = this.state;

    return (
      <>
        {!project ? (
          <div></div>
        ) : this.props.type.includes("EXERCICE") && !exercice.id ? (
          <div></div>
        ) : (
          <>
            {/* écrire un message */}
            {connectedUser && (
              <div style={{ marginTop: "15px", alignContent: "left" }}>
                <Row>
                  {/* <Col md={4} xs={8} style={{ textAlign: "center" }}>
                    {connectedUser &&
                      connectedUser.__mediaProfile__ &&
                      connectedUser.__mediaProfile__.id && (
                        <Avatar
                          src={connectedUser.__mediaProfile__.path}
                        ></Avatar>
                      )}
                    {(!connectedUser || !connectedUser.__mediaProfile__) && (
                      <Avatar src="/assets/icon-user-blue.png"></Avatar>
                    )}
                    <br />
                    <label>{connectedUser.pseudo}</label>
                  </Col> */}
                  <Col md={12} xs={24}>
                    <TextArea
                      value={this.state.message}
                      rows={6}
                      name="message"
                      onChange={e => this.onChange(e)}
                    ></TextArea>
                    <br />
                    <br />

                    <Button
                      style={{ float: "right" }}
                      onClick={() =>
                        this.onSendMessage(this.state.message, this.props.type)
                      }
                    >
                      <IntlMessages id="miuwi.thread.sendButton" />
                    </Button>
                  </Col>
                  <Col
                    md={12}
                    xs={24}
                    style={{ alignContent: "bottom", textAlign: "center" }}
                  >
                    
                        <UploadPicture
                          type={MEDIA_TYPE_THREADS}
                          thread_type={this.props.type}
                          project={project && project}
                          exercice={exercice}
                          labelBtn={<IntlMessages id="miuwi.form.addFile" />}
                        />
                        <span style={{ fontWeight: "100" }}>
                          {" "}
                          Format : JPG, PNG, PDF /{" "}
                          <IntlMessages id="miuwi.file.size" /> &lt; 10 Mo
                        </span>
                     
                        <UploadVideo
                          upload={true}
                          type={VIDEO_TYPE_THREAD}
                          project={project && project}
                          thread_type={this.props.type}
                          exercice={exercice}
                        />
                        <IntlMessages id="miuwi.project.edit.video.description" />
                        <br />{" "}
                        <span style={{ fontWeight: "100" }}>
                          <IntlMessages id="miuwi.video.duration" />
                        </span>
                      
                  </Col>
                </Row>
              </div>
            )}

            {/* l'historique des messages */}
            <div
              style={{
                maxHeight: "250px",
                overflow: "hidden",
                overflowY: "scroll",
                marginTop: "10px"
              }}
            >
              {threads &&
                threads.map((thread, index) => {
                  let date = formatDate(thread.date_create, true);
                  let thread_project = thread.project;
                  if (this.props.type === OVERVIEW_HELPER) {
                    thread_project = thread.projectStudent;
                  }
                  return (
                    <div key={index}>
                      {thread.type === this.props.type &&
                        (thread.exercise
                          ? thread.exercise.id === exercice.id
                          : thread_project &&
                            thread_project.id === project.id) && (
                          <>
                            <Row>
                              <Col md={4} xs={8} style={{ textAlign: "center" }}>
                                {thread.user.__mediaProfile__ && (
                                  <Avatar
                                    src={
                                      thread.user.__mediaProfile__ &&
                                      thread.user.__mediaProfile__.id &&
                                      thread.user.__mediaProfile__.path
                                    }
                                  ></Avatar>
                                )}
                                {!thread.user.__mediaProfile__ && (
                                  <Avatar src="/assets/icon-user-blue.png">
                                    {" "}
                                  </Avatar>
                                )}
                                <br />
                                <label>{thread.user.pseudo}</label>
                              </Col>
                              <Col md={20} xs={16}>
                                  <label
                                    style={{
                                      color: "gray",
                                      float: "right",
                                      fontStyle: "italic"
                                    }}
                                  >
                                    {date}
                                  </label>
                              </Col>
                            </Row>
                            <Row>
                            <Col span={20} style={{ whiteSpace: "pre-line",  textAlign: "right", padding: "5% 10% 5% 10%" }}>
                                    {thread.message}
                                    {thread.video && (
                                      <UploadVideo video={thread.video} />
                                    )}
                                    {thread.media && (
                                      <Thumb media={thread.media} />
                                    )}
                                  </Col>
                            </Row>
                          </>
                        )}
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    state,
    user: state.user.user,
    project: state.projects.project,
    threads: state.threads.threads,
    project_student: state.projects.project_student
  };
};

export default connect(
  mapStateToProps,
  {
    getUser,
    getProject,
    addThread,
    getProjectThreads,
    getProjectStudent,
    getProjectSpecifiedStudent
  }
)(ConversationThreading);
