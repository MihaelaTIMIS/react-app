import React, { Component } from "react";
import Linkify from 'react-linkify';
import {
  getProjectsAuthor,
  getAssistantArchivedProjects,
  assistantArchivesProject
} from "../../appRedux/actions/projects";
import { connect } from "react-redux";
import IntlMessages from "../../util/IntlMessages";
import { List, Icon, Modal } from "antd";
import { NotificationManager } from "react-notifications";
import { InboxOutlined } from "@ant-design/icons";

import { history } from "./../../appRedux/store";

class ProjectsAuthor extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      project_to_archive: null,
      archive: null
    };
  }

  componentDidMount() {
    if (this.props.archive_page) {
      this.props.getAssistantArchivedProjects();
    } else {
      this.props.getProjectsAuthor();
    }
  }

  handleCancel = () => {
    this.setState({
      modal: false
    });
  };

  archiveProject(project, archive) {
    this.setState({
      modal: true,
      project_to_archive: project,
      archive: archive
    });
  }

  confirmArchiveProject() {
    let { id } = this.state.project_to_archive;
    this.props.assistantArchivesProject(id, this.state.archive).then(() => {
      this.props.getProjectsAuthor();
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

  goToContributeProject(slug) {
    history.push("/project/contribute/?id=" + slug);
  }

  render() {
    let projects = this.props.archive_page
      ? this.props.assistant_archives
      : this.props.projects_author;
    let language = this.props.settings.locale.languageId;
    return (
      <div>
        <Modal
          visible={this.state.modal}
          title={<IntlMessages id="spliik.confirm" />}
          onCancel={this.handleCancel}
          okText={<IntlMessages id="miuwi.project.archive" />}
          onOk={() => this.confirmArchiveProject()}
        >
          <IntlMessages id="miuwi.project.student.archive" />
        </Modal>

        <p style={{ textAlign: "center" }} hidden={projects && projects.length}>
          {this.props.archive_page && (
            <IntlMessages id="miuwi.project.assistant.archives.info" />
          )}
          {!this.props.archive_page && (
            <IntlMessages id="miuwi.project.assistant.info" />
          )}
        </p>

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
                        src={item.media1 && item.media1.path}
                        alt="..."
                      />
                    )}
                    {!item.media1 && (
                      <img
                        className="gx-rounded-lg"
                        style={{ width: "100px" }}
                        src={require("assets/images/Logo_SPLIIK-single-bw.png")}
                        alt="..."
                      />
                    )}
                  </div>
                }
                title={
                  <div>
                    <span style={{ fontWeight: "500" }}>{item.title}</span>
                    <div style={{ float: "right", marginRight: "10px" }}>
                      {item.project_authors.map(project_author => {
                        if (
                          project_author.id_project === item.id &&
                          !project_author.is_archived
                        )
                          return (
                            <InboxOutlined
                              onClick={() => this.archiveProject(item, true)}
                              style={{
                                marginRight: "15px",
                                fontSize: "22px",
                                color: "#8A709B"
                              }}
                            />
                          );
                        else return null;
                      })}

                      <Icon
                        type="message"
                        theme="twoTone"
                        twoToneColor="#E40E20"
                        style={{ fontSize: "18px" }}
                        onClick={() => this.goToContributeProject(item.slug)}
                      />
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
                    <p>
                      {item.resume.length > 150
                        ? item.resume.slice(0, item.resume.indexOf(" ", 150)) +
                          "..."
                        : item.resume}
                    </p>
                    </Linkify>
                    <p>
                      <IntlMessages id="miuwi.project.category" />
                      :&nbsp;
                      {item.category && item.category["label_" + language]}
                      {item.subcategory && (
                        <span>
                          {" "}
                          &gt; {item.subcategory["label_" + language]}
                        </span>
                      )}
                    </p>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects_author: state.projects.projects_author,
    assistant_archives: state.projects.assistant_archives,
    settings: state.settings
  };
};
export default connect(
  mapStateToProps,
  { getProjectsAuthor, getAssistantArchivedProjects, assistantArchivesProject }
)(ProjectsAuthor);
