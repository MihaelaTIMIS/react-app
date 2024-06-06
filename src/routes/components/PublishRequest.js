import React, { Component } from "react";
import Linkify from 'react-linkify';
import { getSubmittedProjects } from "../../appRedux/actions/projects";
import { connect } from "react-redux";
import IntlMessages from "../../util/IntlMessages";
import { List, Icon, Tag, Spin } from "antd";
import { MODE_ADMIN } from "../../components/ReadProject/ProjectInfos";

import { history } from "./../../appRedux/store";

class PublishRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    this.props.getSubmittedProjects().then(() => {
      this.setState({
        loading: false
      });
    });
  }

  readProject(slug) {
    history.push("/project/contribute/?id=" + slug, {
      mode: MODE_ADMIN
    });
  }

  render() {
    let projects = this.props.submitted_projects;
    let language = this.props.settings.locale.languageId;

    return (
      <div>
        {this.state.loading && <Spin size="large" />}
        {!this.state.loading && (
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
                      <label style={{ color: "#F04E14" }}>
                        &nbsp;
                        <Tag color={"purple"}>
                          <IntlMessages id="miuwi.project.status.pending" />
                        </Tag>
                      </label>
                      <div style={{ float: "right", marginRight: "10px" }}>
                        <Icon
                          type="eye"
                          theme="twoTone"
                          onClick={() => this.readProject(item.slug)}
                          style={{ fontSize: "18px" }}
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
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    submitted_projects: state.projects.submitted_projects,
    project: state.projects.project,
    settings: state.settings
  };
};
export default connect(
  mapStateToProps,
  { getSubmittedProjects }
)(PublishRequest);
