import React, { Component } from "react";
import Linkify from 'react-linkify';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { List, Button, Icon, Modal, Tag, Row, Col } from "antd";
import { NotificationManager } from "react-notifications";
import {
  EyeOutlined,
  CommentOutlined,
  DollarCircleOutlined,
  FundViewOutlined,
  InboxOutlined,
  CopyOutlined
} from "@ant-design/icons";
import {
  getProjectsOwner,
  archiveProject,
  initCreateProject,
  workshopDuplicate
} from "../../appRedux/actions/projects";
import IntlMessages from "../../util/IntlMessages";
import { screenNext } from "../../appRedux/actions/screen";
import { MODE_EXPERT } from "../../components/ReadProject/ProjectInfos";
import { getSeoProject } from "../../library/transformToUrl";

class ProjectsUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalCopy: false,
      project: null,
      archive: null
    };
  }

  componentDidMount() {
    this.props.getProjectsOwner();
  }

  archiveProject(project, archive) {
    this.setState({
      modal: true,
      project: project,
      archive: archive
    });
  }

  handleCancel = () => {
    this.setState({
      modal: false,
      modalCopy: false
    });
  };

  copyProject(project) {
    this.setState({
      project: project,
      modalCopy: true
    });
  }
  confirmCopyProject() {
    this.props
      .workshopDuplicate(this.state.project.slug)
      .then(() => this.props.getProjectsOwner());
    this.setState({
      modalCopy: false
    });
  }
  confirmArchiveProject() {
    this.props
      .archiveProject(this.state.project, this.state.archive)
      .then(() => {
        this.props.getProjectsOwner();
        this.setState({
          modal: false,
          project: null,
          archive: null
        });
        NotificationManager.success(
          <IntlMessages id="notification.projectArchived" />,
          <IntlMessages id="notification.success" />
        );
      });
  }

  createProject = () => {
    this.props.initCreateProject();
    this.props.screenNext(0);
  };

  render() {
    let projects = this.props.projects;

    let language = this.props.settings.locale.languageId;
    return (
      <div>
        <p style={{ textAlign: "center" }}>
          <Link to="/project/create">
            <Button type="primary" onClick={this.createProject}>
              <IntlMessages id="miuwi.sidebar.createProject" />
            </Button>
          </Link>
        </p>
        <Modal
          visible={this.state.modal}
          title={<IntlMessages id="spliik.confirm" />}
          onCancel={this.handleCancel}
          okText={<IntlMessages id="miuwi.project.archive" />}
          onOk={() => this.confirmArchiveProject()}
        >
          <IntlMessages id="miuwi.project.expert.archive" />
        </Modal>
        <Modal
          visible={this.state.modalCopy}
          title={<IntlMessages id="miuwi.expert.copyWorkshop.title" />}
          onCancel={this.handleCancel}
          okText={<IntlMessages id="miuwi.expert.copyWorkshop.label" />}
          onOk={() => this.confirmCopyProject()}
        >
          <div>
            <p style={{ fontWeight: "100", whiteSpace: "pre-line" }}>
              <IntlMessages id="miuwi.expert.copyWorkshop.text" />
            </p>
            <p>
              <IntlMessages id="miuwi.expert.copyWorkshop.confirm" />
              <br />
              <span style={{ fontWeight: "100" }}>
                <i>{this.state.project ? this.state.project.title : ""}</i>
              </span>{" "}
              ?
            </p>
          </div>
        </Modal>

        <List
          itemLayout="horizontal"
          dataSource={projects}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <div className="gx-featured-thumb">
                    {item.media1 && item.media1.id && (
                      <img
                        className="gx-rounded-lg"
                        style={{ width: "100px" }}
                        src={item.media1.path}
                        alt={item.title}
                      />
                    )}
                    {!item.media1 && (
                      <img
                        className="gx-rounded-lg"
                        style={{ width: "100px" }}
                        src={require("assets/images/Logo_SPLIIK-single-bw.png")}
                        alt={item.title}
                      />
                    )}
                  </div>
                }
                title={
                  <div>
                    <span style={{ fontWeight: "500" }}>{item.title}</span>
                    <label style={{ color: "#F04E14" }}>
                      &nbsp;
                      <Tag
                        color={
                          item.online
                            ? "green"
                            : item.comment_rejected
                            ? "red"
                            : !item.online && !item.submitted_project
                            ? "volcano"
                            : "purple"
                        }
                      >
                        {item.online && (
                          <IntlMessages id="miuwi.project.status.online" />
                        )}
                        {item.comment_rejected && (
                          <IntlMessages id="miuwi.project.status.rejected" />
                        )}
                        {!item.online &&
                          item.submitted_project &&
                          !item.comment_rejected && (
                            <IntlMessages id="miuwi.project.status.pending" />
                          )}
                        {!item.online &&
                          !item.submitted_project &&
                          !item.comment_rejected && (
                            <IntlMessages id="miuwi.project.status.draft" />
                          )}
                      </Tag>
                    </label>
                    <div style={{ float: "right", marginRight: "10px" }}>
                      <InboxOutlined
                        onClick={() => this.archiveProject(item, true)}
                        style={{
                          marginRight: "15px",
                          fontSize: "20px",
                          color: "#8A709B"
                        }}
                      />
                      <CopyOutlined
                        onClick={() => this.copyProject(item)}
                        style={{
                          marginRight: "7px",
                          fontSize: "18px",
                          color: "#FDCC57"
                        }}
                      />

                      <Link
                        to={{ pathname: `/project/associate/?id=${item.slug}` }}
                      >
                        <Icon
                          type="link"
                          alt="Associer"
                          title="Associer"
                          style={{
                            color: "#f759ab",
                            marginRight: "7px",
                            fontSize: "18px"
                          }}
                        />
                      </Link>

                      {!item.submitted_project && !item.online && (
                        <Link
                          to={{ pathname: `/project/update/?id=${item.slug}` }}
                        >
                          <Icon
                            type="edit"
                            alt="Modifier"
                            title="Modifier"
                            theme="twoTone"
                            twoToneColor="#ff7a45"
                            style={{ fontSize: "18px", marginRight: "15px" }}
                          />
                        </Link>
                      )}
                      {
                        <Link
                          to={{
                            pathname: getSeoProject(item),
                            state: { mode: MODE_EXPERT, slug: item.slug }
                          }}
                        >
                          <Icon
                            type="eye"
                            alt="Visualiser"
                            title="Visualiser"
                            theme="twoTone"
                            style={{ fontSize: "18px" }}
                          />
                        </Link>
                      }
                    </div>
                  </div>
                }
                description={
                  <div>
                    <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                        <a target="blank" href={decoratedHref} key={key}>
                          {decoratedText}
                        </a>
                      )}>
                    <p style={{ fontWeight: "100" }}>
                      {item.resume.length > 150
                        ? item.resume.slice(0, item.resume.indexOf(" ", 150)) +
                          "..."
                        : item.resume}
                    </p>
                    </Linkify>
                    <p style={{ fontWeight: "100" }}>
                      <IntlMessages id="miuwi.project.category" /> :&nbsp;
                      {item.category && item.category["label_" + language]}
                      {item.subcategory && (
                        <span>
                          {" "}
                          &gt; {item.subcategory["label_" + language]}
                        </span>
                      )}
                    </p>
                    <Row
                      type="flex"
                      justify="space-between"
                      style={{ fontWeight: "100" }}
                    >
                      <Col>
                        <EyeOutlined /> {item.visites}
                        {item.visites == null && "0"}
                        <IntlMessages id="miuwi.project.infos.visit" />
                        {item.visites > 1 && "s"}
                      </Col>
                      <Col>
                        <FundViewOutlined />{" "}
                        {item.projectsStudent && item.projectsStudent.length}
                        <IntlMessages id="miuwi.project.infos.subscription" />
                        {item.projectsStudent &&
                          item.projectsStudent.length > 1 &&
                          "s"}
                      </Col>
                      <Col>
                        <CommentOutlined />{" "}
                        {item.discussions && item.discussions.length}
                        <IntlMessages id="miuwi.project.infos.message" />
                        {item &&
                          item.discussions &&
                          item.discussions.length > 1 &&
                          "s"}
                      </Col>
                      <Col>
                        <DollarCircleOutlined />{" "}
                        {item.is_free ? (
                          <label style={{ textTransform: "lowercase" }}>
                            {<IntlMessages id="miuwi.project.tarif.free" />}
                          </label>
                        ) : (
                          <label>
                            {item.projectsStudent &&
                              item.projectsStudent.length * item.price}
                            €
                            <IntlMessages id="miuwi.project.infos.earnings" />
                          </label>
                        )}
                      </Col>
                    </Row>
                  </div>
                }
              ></List.Item.Meta>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects.projects,
    project: state.projects.project,
    settings: state.settings
  };
};
export default connect(
  mapStateToProps,
  {
    getProjectsOwner,
    initCreateProject,
    archiveProject,
    screenNext,
    workshopDuplicate
  }
)(ProjectsUser);
