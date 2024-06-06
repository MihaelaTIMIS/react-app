import React from "react";
import Linkify from 'react-linkify';
import { List, Button } from "antd";
import { connect } from "react-redux";

import Widget from "components/Widget";
import IntlMessages from "../../../util/IntlMessages";
import { getSeoProject } from "../../../library/transformToUrl";

import { history } from "./../../../appRedux/store";

class About extends React.Component {
  readProject(item) {
    history.push(getSeoProject(item), { slug: item.slug });
  }

  render() {
    let projects = this.props.projects;
    let language = this.props.languageId;
    let projectsOnline = [];
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].online === true) {
        projectsOnline.push(projects[i]);
      }
    }
    return (
      <Widget
        title={<IntlMessages id="miuwi.sidebar.projects" />}
        styleName="gx-card-tabs gx-card-tabs-right gx-card-profile"
      >
        <div>
          <List
            itemLayout="horizontal"
            dataSource={projectsOnline}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <div
                      className="gx-featured-thumb"
                      onClick={() => this.readProject(item)}
                    >
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
                    <span style={{ fontWeight: "500" }}>{item.title}</span>
                  }
                  description={
                    <div style={{ fontWeight: "100" }}>
                      <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                        <a target="blank" href={decoratedHref} key={key}>
                          {decoratedText}
                        </a>
                      )}>
                        <p>
                          {item.resume.length > 150
                            ? item.resume.slice(
                              0,
                              item.resume.indexOf(" ", 150)
                            ) + "..."
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

                {
                  <Button onClick={() => this.readProject(item)}>
                    <IntlMessages id="miuwi.project.seeProject" />
                  </Button>
                }
              </List.Item>
            )}
          />
        </div>
      </Widget>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};
export default connect(mapStateToProps)(About);
