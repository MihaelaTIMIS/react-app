import React, { Component } from "react";
import { Link } from "react-router-dom";
import Linkify from 'react-linkify';
import {
  getProjectsStudent,
  getProjectStudent,
  studentArchivesProject,
  getStudentArchivedProjects,
  studentWorkshopDuplicate,
  studentWorkshopDownload
} from "../../appRedux/actions/projects";
/* import { NotificationManager } from "react-notifications"; */
import { connect } from "react-redux";
import IntlMessages from "../../util/IntlMessages";
import { List, Icon, Tag, Modal } from "antd";
import { NotificationManager } from "react-notifications";
import { InboxOutlined, SisternodeOutlined, PrinterTwoTone } from "@ant-design/icons";

import { formatDate } from "../../library/formatDate";

class ProjectsStudent extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      modalCopy: false,
      project_to_archive: null,
      project: null,
      archive: null
    };
  }

  componentDidMount() {
    if (this.props.archive_page) this.props.getStudentArchivedProjects();
    else this.props.getProjectsStudent();
  }

  readProject(item) {
    this.props.getProjectStudent(item.slug).then(() => { });
  }

  copyProject(project) {
    this.setState({
      project: project,
      modalCopy: true
    });
  }

  confirmCopyProject() {
    this.props.studentWorkshopDuplicate(this.state.project.slug).then(() => {
      this.props.getProjectsStudent();
      window.scrollTo(0, 0);
    });
    this.setState({
      modalCopy: false
    });
  }

  archiveProject(project, archive) {
    this.setState({
      modal: true,
      project_to_archive: project,
      archive: archive
    });
  }

  downloadProject=(project)=>{
    this.props.studentWorkshopDownload(project.slug).then((res)=>{
      if(res.status === 200)
      NotificationManager.success(
        <IntlMessages id="notification.projectDownloaded" />,
        <IntlMessages id="notification.success" />
      );
    })
  }

  handleCancel = () => {
    this.setState({
      modal: false,
      modalCopy: false
    });
  };

  confirmArchiveProject() {
    let { slug } = this.state.project_to_archive;
    this.props.studentArchivesProject(slug, this.state.archive).then(() => {
      this.props.getProjectsStudent();
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

  render() {
    let projects_student = this.props.archive_page
      ? this.props.student_archives
      : this.props.projects_student;
    let language = this.props.settings.locale.languageId;
    let project_to_duplicate = this.state.project && this.state.project.project;
    return (
      <>
        <Modal
          visible={this.state.modal}
          title={<IntlMessages id="spliik.confirm" />}
          onCancel={this.handleCancel}
          okText={<IntlMessages id="miuwi.project.archive" />}
          onOk={() => this.confirmArchiveProject()}
        >
          <IntlMessages id="miuwi.project.student.archive" />
        </Modal>
        <Modal
          visible={this.state.modalCopy}
          title={<IntlMessages id="miuwi.student.copyWorkshop.label" />}
          onCancel={this.handleCancel}
          okText={<IntlMessages id="miuwi.student.copyWorkshop.label" />}
          onOk={() => this.confirmCopyProject()}
        >
          <div>
            <p style={{ fontWeight: "100", whiteSpace: "pre-line" }}>
              <IntlMessages id="miuwi.student.copyWorkshop.text" />
            </p>
            <p>
              <IntlMessages id="miuwi.student.copyWorkshop.confirm" />
              <br />
              <span style={{ fontWeight: "100" }}>
                <i>{project_to_duplicate ? project_to_duplicate.title : ""}</i>
              </span>
            </p>
          </div>
        </Modal>

        <p
          style={{ textAlign: "center" }}
          hidden={projects_student && projects_student.length}
        >
          {this.props.archive_page ? (
            <IntlMessages id="miuwi.project.student.archives.info" />
          ) : (
              <IntlMessages id="miuwi.project.student.info" />
            )}
        </p>
        <List
          itemLayout="horizontal"
          dataSource={projects_student}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                /* workshop image */
                avatar={
                  <div className="gx-featured-thumb">
                    {item.project.media1 && item.project.media1.id && (
                      <img
                        className="gx-rounded-lg"
                        src={item.project.media1.path}
                        alt={item.project.title}
                      />
                    )}
                    {!item.project.media1 && (
                      <img
                        className="gx-rounded-lg"
                        style={{ height: "100px", width: "100px" }}
                        src={require("assets/images/Logo_SPLIIK-single-bw.png")}
                        alt={item.project.title}
                      />
                    )}
                  </div>
                }
                title={
                  <div>
                    <span style={{ fontWeight: "500" }}>
                      {item.project.title}
                      <br />
                      <span style={{ fontWeight: "100" }}>
                        Débuté le {formatDate(item.start_date, true)} et{" "}
                      </span>
                    </span>
                    &nbsp;
                    {/* workshop tags */}
                    {!item.is_archived && (
                      <Tag
                        color={
                          item.finish_date
                            ? "green"
                            : item.is_archived
                              ? "purple"
                              : "volcano"
                        }
                      >
                        {item.finish_date ? (
                          <IntlMessages id="miuwi.project.student.statusFinished" />
                        ) : (
                            <IntlMessages id="miuwi.project.student.statusInProgress" />
                          )}
                      </Tag>
                    )}
                    {/* workshop buttons */}
                    <div style={{ float: "right", marginRight: "10px" }}>
                      {!item.is_archived && (
                        <InboxOutlined
                          onClick={() => this.archiveProject(item, true)}
                          style={{
                            marginRight: "15px",
                            fontSize: "20px",
                            color: "#9b84ab"
                          }}
                        />
                      )}

                      <PrinterTwoTone
                        onClick={() => this.downloadProject(item)}
                        style={{
                          marginRight: "15px",
                          fontSize: "20px"
                        }} />

                      <SisternodeOutlined
                        onClick={() => this.copyProject(item)}
                        style={{
                          marginRight: "15px",
                          fontSize: "18px",
                          color: "#9b84ab"
                        }}
                      />

                      <Link
                        onClick={() => this.readProject(item)}
                        to={`/project/student/?id=${item.slug}`}
                      >
                        {item.finish_date && (
                          <Icon
                            type="eye"
                            theme="twoTone"
                            style={{ fontSize: "18px" }}
                          />
                        )}
                        {!item.finish_date && (
                          <Icon
                            type="edit"
                            theme="twoTone"
                            color="#421152"
                            style={{ fontSize: "18px" }}
                          />
                        )}
                      </Link>
                    </div>
                  </div>
                }
                /* workshop resume + category */
                description={
                  <div>
                    <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                      <a target="blank" href={decoratedHref} key={key}>
                        {decoratedText}
                      </a>
                    )}>
                      <p style={{ fontWeight: "100" }}>
                        {item.project.resume.length > 150
                          ? item.project.resume.slice(
                            0,
                            item.project.resume.indexOf(" ", 150)
                          ) + "..."
                          : item.project.resume}
                      </p>
                    </Linkify>
                    <p style={{ fontWeight: "100" }}>
                      <IntlMessages id="miuwi.project.category" /> :&nbsp;
                      {item.project.category &&
                        item.project.category["label_" + language]}
                      {item.project.subcategory && (
                        <span>
                          {" "}
                          &gt; {item.project.subcategory["label_" + language]}
                        </span>
                      )}
                    </p>
                  </div>
                }
              ></List.Item.Meta>
            </List.Item>
          )}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects_student: state.projects.projects_student,
    project_student: state.projects.project_student,
    student_archives: state.projects.student_archives,
    settings: state.settings
  };
};
export default connect(
  mapStateToProps,
  {
    getProjectsStudent,
    getProjectStudent,
    studentArchivesProject,
    getStudentArchivedProjects,
    studentWorkshopDuplicate,
    studentWorkshopDownload
  }
)(ProjectsStudent);
