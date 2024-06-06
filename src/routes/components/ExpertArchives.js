import React, { Component } from "react";
import { Link } from "react-router-dom";
import { List, Icon, Spin,Modal } from "antd";
import { connect } from "react-redux";
import Linkify from "react-linkify";

import {
  FileSyncOutlined,
} from "@ant-design/icons";
import IntlMessages from "../../util/IntlMessages";
import { NotificationManager } from "react-notifications";
import { getSeoProject } from "../../library/transformToUrl";
import { MODE_READONLY } from "../../components/ReadProject/ProjectInfos";
import { getExpertArchivedProjects, archiveProject } from "../../appRedux/actions/projects";

class ExpertArchives extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      modal: false,
      project: null,
      archive: null
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.getExpertArchivedProjects().then(() => {
      this.setState({
        loading: false
      });
    });
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
      modal: false
    });
  };

  confirmArchiveProject() {
    this.props
      .archiveProject(this.state.project, this.state.archive)
      .then(() => {
        this.props.getExpertArchivedProjects();
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
    let projects = this.props.expert_archives;
    let language = this.props.settings.locale.languageId;

    return (
      <div>
        <Modal
          visible={this.state.modal}
          title={<IntlMessages id="spliik.confirm" />}
          onCancel={this.handleCancel}
          // okText={<IntlMessages id="miuwi.project.archive" />}
          onOk={() => this.confirmArchiveProject()}
        >
          <IntlMessages id="miuwi.project.expert.unarchive" />
        </Modal>
        {this.state.loading && <Spin size="large" />}
        {!this.state.loading && (
          <>
            <p
              style={{ textAlign: "center" }}
              hidden={projects && projects.length}
            >
              <IntlMessages id="miuwi.project.expert.archives.info" />
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
                            src={item.media1.path}
                            alt={item.title}
                          />
                        )}
                        {!item.media1 && (
                          <img
                            className="gx-rounded-lg"
                            style={{ height: "100px", width: "100px" }}
                            src={require("assets/images/Logo_SPLIIK-single-bw.png")}
                            alt={item.title}
                          />
                        )}
                      </div>
                    }
                    title={
                      <div>
                        <span style={{ fontWeight: "500" }}>{item.title}</span>
                        <div style={{ float: "right", marginRight: "10px" }}>
                        <FileSyncOutlined 
                            onClick={() => this.archiveProject(item, false)}
                            style={{
                              marginRight: "15px",
                              fontSize: "20px",
                              color: "#8A709B"
                            }}
                          />
                          <Link
                            to={{
                              pathname: getSeoProject(item),
                              state: { mode: MODE_READONLY, slug: item.slug }
                            }}
                          >
                            <Icon
                              type="eye"
                              theme="twoTone"
                              /*  onClick={() => this.readProject(item.slug)} */
                              style={{ fontSize: "18px" }}
                            />
                          </Link>
                        </div>
                      </div>
                    }
                    description={
                      <div>
                        <Linkify
                          componentDecorator={(
                            decoratedHref,
                            decoratedText,
                            key
                          ) => (
                            <a target="blank" href={decoratedHref} key={key}>
                              {decoratedText}
                            </a>
                          )}
                        >
                          <p style={{ fontWeight: "100" }}>
                            {item.resume.length > 150
                              ? item.resume.slice(
                                  0,
                                  item.resume.indexOf(" ", 150)
                                ) + "..."
                              : item.resume}
                          </p>
                        </Linkify>
                        <p style={{ fontWeight: "100" }}>
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
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    expert_archives: state.projects.expert_archives,
    project: state.projects.project,
    settings: state.settings
  };
};
export default connect(
  mapStateToProps,
  { getExpertArchivedProjects, archiveProject }
)(ExpertArchives);
