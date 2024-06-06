import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { Card, Modal, Button, Form, Row, Icon, Spin, Layout, Col } from "antd";
import { getProjectHelper } from "../../appRedux/actions/projects";
import {
  getProjectThreads,
  OVERVIEW_HELPER
} from "../../appRedux/actions/threadsAction";
import IntlMessages from "../../util/IntlMessages";
import ConversationThreading from "../CreateProject/CreateSteps/components/ConversationThreading";
import { MODE_HELPER } from "../ReadProject/ProjectInfos";
import UploadVideo from "../../routes/components/Upload/UploadVideo";
import { getUrlVars } from "../../library/urlVar";
import HelperViewAllExercises from "./HelperViewAllExercises";
import { VIDEO_TYPE_PROJECT } from "../../appRedux/actions/videos";
import RealizeProjectHeader from "../RealizeProject/RealizeProjectHeader";
import CopyProject from "../ReadProject/CopyProject";
import Invitations from "../ReadProject/Invitations";

let slug;

const { Content } = Layout;

class HelperViewProject extends Component {
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
      invalid_token: false,
      loading: false
    };
    this.mailToClick = this.mailToClick.bind(this);
  }

  componentDidMount() {
    slug = getUrlVars()["id"];
    if (slug) {
      this.setState({ loading: true });
      this.props
        .getProjectHelper(slug)
        .then(() => {
          let slug_project_student =
            this.props.project_helper &&
            this.props.project_helper.slug_project_student;
          if (slug_project_student) this.setState({ loading: false });
        })
        .catch(() => {
          this.setState({ invalid_token: true, loading: false });
        });
    }
  }

  mailToClick(student) {
    window.location.href = `mailto:${student.email}`;   
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

  showVideo = () => {
    this.setState({
      showVideo: true
    });
  };

  hideVideo = () => {
    this.setState({
      showVideo: false
    });
  };

  render() {
    let helper = this.props.project_helper;
    let project = helper && helper.project;
    let { threads, user } = this.props;

    return (
      <Card className="gx-card">
        <Layout>
          <Content>
            {this.state.invalid_token && <Redirect to={"/login"} />}
            <RealizeProjectHeader
              helper={helper}
              mode={MODE_HELPER}
              threads={threads}
            />

            {/* fil de discussion */}
            {helper && helper.student && (
              <div
                style={{
                  textAlign: "center",
                  fontWeight: "100",
                  fontSize: "15px"
                }}
              >
                <span style={{ color: "#421152", fontWeight: "400" }}>
                  {user ? (user.firstname ? user.firstname : user.pseudo) : ""},{" "}
                </span>
                <IntlMessages id="miuwi.project.helper.icon" />{" "}
                <span style={{ color: "#3065AF", fontWeight: "400" }}>
                  {helper.student.firstname
                    ? helper.student.firstname
                    : helper.student.pseudo}
                  .
                </span>
                <br />
                <p style={{ whiteSpace: "pre-line" }}>
                  <IntlMessages id="miuwi.thread.helper.bubble" />
                </p>
                <Icon
                  type="message"
                  theme="twoTone"
                  twoToneColor="#9B84AB"
                  style={{ fontSize: "35px", marginBottom: "15px" }}
                  onClick={() =>
                    this.showThreads(OVERVIEW_HELPER, project && project.title)
                  }
                />
                <hr />
              </div>
            )}

            <br />
            {this.state.loading && <Spin size="large" />}

            {/* exercices */}
            {!this.state.loading && <HelperViewAllExercises helper={helper} />}

            {/* footer buttons */}
            <Row
              type="flex"
              justify={"center"}
              span={24}
              style={{ marginTop: "25px" }}
            >
              <Link
                to={
                  helper && helper.is_archived
                    ? `/user/archives?view=support`
                    : `/user?view=support`
                }
              >
                <Button>
                  <IntlMessages id="miuwi.project.saveAndCancel" />
                </Button>
              </Link>
            </Row>

            {/* project link */}
            {project && project.online && (
              <Row style={{ paddingLeft: "3%" }}>
                <CopyProject project={project} />
              </Row>
            )}

            {/* share this workshop */}
            {user && user.id && (
              <Row type="flex"  justify="space-between" style={{ paddingLeft: "3%" }}>
                <Col>
                  <Invitations
                    invitationsMode="SHARE_WORKSHOP"
                    project={project}
                  />
                </Col>

                <Col>
                  <Button
                    style={{ color: "#3065af", borderColor: "#3065af", whiteSpace: "pre-wrap", height: "auto", lineHeight: "normal"}}
                    onClick={() => this.mailToClick(helper && helper.student)}
                  >
                    <IntlMessages id="miuwi.project.mailToStudent" />
                  </Button>
                </Col>
              </Row>
            )}

            {/* fil de discussion */}
            <Modal
              title={
                <p>
                  <IntlMessages id="miuwi.thread.overview" />{" "}
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
                  helper={helper}
                  project={project}
                />
              )}
            </Modal>

            {/* video  */}
            <Modal
              title={
                <p>
                  {" "}
                  <IntlMessages id="miuwi.videoLabel" />
                </p>
              }
              visible={this.state.showVideo}
              onCancel={() => this.hideVideo()}
              footer={false}
            >
              <UploadVideo
                upload={false}
                project={project}
                video={project && project.video1}
                type={VIDEO_TYPE_PROJECT}
              />
            </Modal>
          </Content>
        </Layout>
      </Card>
    );
  }
}

const HelperViewProjectForm = Form.create()(HelperViewProject);

const mapStateToProps = state => {
  return {
    project_helper: state.projects.project_helper,
    threads: state.threads.threads,
    user: state.user.user
  };
};

export default connect(
  mapStateToProps,
  {
    getProjectHelper,
    getProjectThreads
  }
)(HelperViewProjectForm);
