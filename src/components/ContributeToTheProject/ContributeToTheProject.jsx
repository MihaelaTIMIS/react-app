import "./index.css";
import { Layout } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import FormItem from "antd/lib/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import IntlMessages from "../../util/IntlMessages";
import ContributeExercises from "./ContributeExercises";
import { NotificationManager } from "react-notifications";
import { Card, Modal, Form, Button, Spin, Row, Icon } from "antd";
import { history } from "./../../appRedux/store";

import {
  getProject,
  publishProject,
  rejectProject,
  studentsInvitedToProject,
  emailInviteStudent,
  getProjectAuthor
} from "../../appRedux/actions/projects";
import { getExercices } from "../../appRedux/actions/exercices";
import { getProjectThreads } from "../../appRedux/actions/threadsAction";
import RealizeProjectHeader from "../RealizeProject/RealizeProjectHeader";
import {
  MODE_CONTRIBUTE,
  MODE_ADMIN
} from "../../components/ReadProject/ProjectInfos";
import { getUrlVars } from "../../library/urlVar";
const { Content } = Layout;
class ContributeToTheProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thread: {
        visible: false,
        title: "",
        type: "",
        label: ""
      },
      hide: true,
      comment_rejected: "",
      loading: false
    };
    this.mailToClick = this.mailToClick.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });

    if (this.props.slug) {
      this.props.getProject(this.props.slug).then(() => {
        this.props.getProjectAuthor(this.props.slug);

        this.props.getExercices(this.props.slug).then(() => {});
        this.setState({ loading: false });
      });
    }

    if (this.props.project) {
      this.setState({ loading: true });
      this.props.studentsInvitedToProject(this.props.project.id).then(() => {
        this.setState({ loading: false });
      });
    }
  }

  
  mailToClick(project) {   
    window.location.href = `mailto:${project.owner.email}`;
  }


  acceptProject = slug => {
    let emails = this.props.project_students_invited;

    this.props.publishProject(slug, true).then(() => {
      emails.map(email => {
        this.props.emailInviteStudent(slug, email);
        return email;
      });
      NotificationManager.success(
        <IntlMessages id="notification.projectMessage.publish" />,
        <IntlMessages id="notification.success" />
      );
      history.push("/user?view=publication");
    });
  };

  writeRejectReason = () => {
    this.setState({
      hide: false
    });
  };

  cancelReject = () => {
    this.setState({
      hide: true
    });
  };

  change = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  sendReject = (e, project) => {
    e.preventDefault();
    this.props.form
      .validateFields((err, values) => {
        if (!err)
          this.props
            .rejectProject(project.slug, false, this.state.comment_rejected)
            .then(() => {
              NotificationManager.success(
                <IntlMessages id="notification.projectMessage.reject" />,
                <IntlMessages id="notification.success" />
              );
              history.push("/user");
              this.setState({ hide: true });
            })
            .catch(() => {});
      })
      .catch(() => {});
  };

  render() {
    let project = { ...this.props.project };
    let { threads } = this.props;
    const { getFieldDecorator } = this.props.form;
    let { location } = this.props.history;
    let mode =
      getUrlVars()["mode"] ||
      (location && location.state && location.state.mode);
    let project_author = this.props.project_author;

    return (
      <Card className="gx-card">
        <Layout>
          <Content>
            {/* this.props.user && this.props.user.is_admin && !project.online */ mode ===
              MODE_ADMIN && (
              <Row type="flex" justify="end" span={24}>
                <Button
                  onClick={() => this.acceptProject(project.slug)}
                  style={{
                    color: "white",
                    backgroundColor: "#52c41a",
                    borderColor: "#52c41a"
                  }}
                >
                  <IntlMessages id="miuwi.project.accept" />
                </Button>
                <Button
                  style={{
                    color: "#FFF",
                    backgroundColor: "#f5222d",
                    float: "right",
                    borderColor: "#f5222d"
                  }}
                  onClick={() => this.writeRejectReason()}
                >
                  <IntlMessages id="miuwi.project.reject" />
                </Button>
              </Row>
            )}

            <RealizeProjectHeader threads={threads} mode={MODE_CONTRIBUTE} />

            {this.state.loading && <Spin size="large" />}
            {mode !== MODE_ADMIN && (
              <div
                style={{
                  textAlign: "center",
                  fontWeight: "100",
                  fontSize: "15px"
                }}
              >
                <p style={{ whiteSpace: "pre-line" }}>
                  <IntlMessages id="miuwi.thread.assistant.bubble1" />
                  <label style={{ color: "#EF7911" }}>
                    {project && project.owner && project.owner.pseudo}
                  </label>
                  <IntlMessages id="miuwi.thread.assistant.bubble2" />
                </p>
                <Icon
                  type="message"
                  theme="twoTone"
                  twoToneColor="#E40E20"
                  style={{ fontSize: "35px", marginBottom: "15px" }}
                />
                <hr />
              </div>
            )}

            {!this.state.loading && (
              <div style={{ marginTop: "5%" }}>
                <ContributeExercises project={project} readonly={false} />
              </div>
            )}

            {/* footer buttons */}
            <Row
              type="flex"
              justify="space-between"
              span={24}
              style={{ marginTop: "25px" }}
            >
              <Link
                to={
                  project_author && project_author.is_archived
                    ? "/user/archives?view=assistant"
                    : "/user?view=assistant"
                }
              >
                <Button>
                  <IntlMessages id="miuwi.project.saveAndCancel" />
                </Button>
              </Link>
              <Button
                style={{ borderColor: "#ef7911", color:"#ef7911" }}
                onClick={() => this.mailToClick(project)}
              >
                <IntlMessages id="miuwi.project.mailToExpert" />
               
              </Button>
            </Row>

            <Modal
              visible={!this.state.hide}
              onCancel={() => this.cancelReject()}
              footer={false}
            >
              <Form layout="vertical">
                <FormItem>
                  <IntlMessages id="miuwi.project.rejectReason" />
                </FormItem>
                <FormItem>
                  {getFieldDecorator("comment_rejected", {
                    rules: [
                      {
                        required: true,
                        message: <IntlMessages id="miuwi.errorInput.title" />
                      }
                    ]
                  })(
                    <TextArea
                      maxLength={300}
                      rows={4}
                      name="comment_rejected"
                      onChange={e => this.change(e)}
                    ></TextArea>
                  )}
                </FormItem>
                <FormItem>
                  <Button
                    htmlType="submit"
                    style={{ float: "right" }}
                    type="primary"
                    onClick={e => this.sendReject(e, project)}
                  >
                    <IntlMessages id="miuwi.project.sendRejectMessage" />
                  </Button>
                </FormItem>
              </Form>
            </Modal>
          </Content>
        </Layout>
      </Card>
    );
  }
}

const ContributeForm = Form.create()(ContributeToTheProject);

const mapStateToProps = state => {
  return {
    project: state.projects.project,
    exercices: state.exercices.exercices,
    threads: state.threads.threads,
    user: state.user.user,
    project_students_invited: state.projects.project_students_invited,
    project_author: state.projects.project_author
  };
};

export default connect(
  mapStateToProps,
  {
    getProject,
    getExercices,
    getProjectThreads,
    publishProject,
    rejectProject,
    studentsInvitedToProject,
    emailInviteStudent,
    getProjectAuthor
  }
)(ContributeForm);
