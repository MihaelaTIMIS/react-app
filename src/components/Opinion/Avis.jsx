import React from "react";
import { connect } from "react-redux";

import StarRatingComponent from "react-star-rating-component";
import { Avatar, Layout, Row, Col } from "antd";
import { formatDate } from "../../library/formatDate";
import IntlMessages from "../../util/IntlMessages";
import { getProject } from "../../appRedux/actions/projects";
import { getUrlVars } from "../../library/urlVar";
const { Content } = Layout;
let slug;
class Avis extends React.Component {
  componentDidMount() {
    slug = getUrlVars()["id"];
    this.props.getProject(slug);
  }

  render() {
    let { opinions } = { ...this.props.project };
    return (
      <div>
        {opinions && opinions.length === 0 && (
          <p>
            <IntlMessages id="miuwi.opinion.empty" />
          </p>
        )}
        {opinions &&
          opinions.map((opinion, key) => {
            let newDate = formatDate(opinion.date_create, false);
            let owner = opinion.owner;
            let media = owner.__mediaProfile__;
            return (
              <Layout key={key}>
                <Content>
                  <Row span={24}>
                    <Col span={10} style={{ textAlign: "center" }}>
                      <Avatar
                        src={
                          media && media.id
                            ? media.path
                            : "/assets/icon-user-blue.png"
                        }
                      />
                      <br />
                      <span>{owner.pseudo}</span>
                    </Col>
                    <Col span={14}>
                      <Row>
                        <StarRatingComponent
                          name=""
                          value={opinion.notation}
                          starCount={5}
                          editing={false}
                        />
                        <label style={{ float: "right" }}>{newDate}</label>
                      </Row>
                      <Row
                        style={{ whiteSpace: "pre-line", marginBottom: "10px" }}
                      >
                        {opinion.message}
                      </Row>
                    </Col>
                  </Row>
                </Content>
              </Layout>
            );
          })}
      </div>
    );
  }
}

/* const Avis = props => {
  let opinions = props.opinions;

  console.log(props);
}; */

const mapStateToProps = state => {
  return {
    state,
    project: state.projects.project
    /*   opinions: state.opinion.opinions */
  };
};
export default connect(
  mapStateToProps,
  {
    getProject
  }
)(Avis);
