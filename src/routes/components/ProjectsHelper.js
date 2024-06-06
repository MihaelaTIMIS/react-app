import React, { Component } from "react";
import { Link } from "react-router-dom";
import Linkify from 'react-linkify';

import {
  getProjectsHelper,
  getHelperArchivedProjects,
  helperArchivesProject
} from "../../appRedux/actions/projects";
import { connect } from "react-redux";
import IntlMessages from "../../util/IntlMessages";
import { List, Icon, Modal } from "antd";
import { NotificationManager } from "react-notifications";
import { InboxOutlined } from "@ant-design/icons";
class ProjectsHelper extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      project_to_archive: null,
      archive: null
    };
  }

  componentDidMount() {
    if (this.props.archive_page) this.props.getHelperArchivedProjects();
    else this.props.getProjectsHelper();
  }

  archiveProject(project, archive) {
    this.setState({
      modal: true,
      project_to_archive: project,
      archive: archive
    });
  }

  handleCancel = () => {
    this.setState({
      modal: false
    });
  };

  confirmArchiveProject() {
    let { slug } = this.state.project_to_archive;

    this.props.helperArchivesProject(slug, this.state.archive).then(() => {
      this.props.getProjectsHelper();
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
    let projects_helper = this.props.archive_page
      ? this.props.helper_archives
      : this.props.projects_helper;
    let language = this.props.settings.locale.languageId;
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

        <p
          style={{ textAlign: "center" }}
          hidden={projects_helper && projects_helper.length}
        >
          {this.props.archive_page && (
            <IntlMessages id="miuwi.project.helper.archives.info" />
          )}
          {!this.props.archive_page && (
            <IntlMessages id="miuwi.project.helper.info" />
          )}
        </p>

        <List
          itemLayout="horizontal"
          dataSource={projects_helper}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
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
                    </span>
                    <div style={{ float: "right", marginRight: "10px" }}>
                      {!item.is_archived && (
                        <InboxOutlined
                          onClick={() => this.archiveProject(item, true)}
                          style={{
                            marginRight: "15px",
                            fontSize: "22px",
                            color: "#8A709B"
                          }}
                        />
                      )}

                      <Link to={`/project/helper/?id=${item.slug}`}>
                        <Icon
                          type="message"
                          theme="twoTone"
                          twoToneColor="#9B84AB"
                          style={{ fontSize: "18px" }}
                        />
                      </Link>
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
                        {item.project.resume.length > 150
                          ? item.project.resume.slice(
                            0,
                            item.project.resume.indexOf(" ", 150)
                          ) + "..."
                          : item.project.resume}
                      </p>
                    </Linkify>
                    <p>
                      <IntlMessages id="miuwi.project.category" />
                      :&nbsp;
                      {item.project.category &&
                        item.project.category["label_" + language]}
                      {item.project.subcategory && (
                        <span>
                          {" "}
                          &gt; {item.project.subcategory["label_" + language]}
                        </span>
                      )}
                    </p>
                    <p style={{ fontWeight: "100" }}>
                      <IntlMessages id="miuwi.user.student" />:{" "}
                      {item.student.firstname
                        ? item.student.firstname
                        : item.student.pseudo}
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
    projects_helper: state.projects.projects_helper,
    project_helper: state.projects.project_helper,
    helper_archives: state.projects.helper_archives,
    settings: state.settings
  };
};
export default connect(
  mapStateToProps,
  { getProjectsHelper, getHelperArchivedProjects, helperArchivesProject }
)(ProjectsHelper);
