import React from "react";
import { connect } from "react-redux";
import JoinProject from "./Step4Components/JoinProject";
import { Layout, Row, Col, Divider, Button } from "antd";
import { getProject } from "../../../appRedux/actions/projects";
import { MODE_EXPERT } from "../../ReadProject/ProjectInfos";
import InviteReaders from "./Step4Components/InviteReaders";
import IntlMessages from "../../../util/IntlMessages";
import { getUrlVars } from "../../../library/urlVar";
import RealizeProjectHeader from "../../RealizeProject/RealizeProjectHeader";
const { Content } = Layout;
let slug;

export const seeOverview = "/project/read/?id=";
class Step4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    slug = getUrlVars()["id"];
    this.props.getProject(slug);
    if (this.props.project) this.setState({ loading: false });
  }

  inviteCustomers = () => {
    this.props.nextAction(3, true);
  };

  render() {
    return (
      <div className="steps-content">
        <Layout>
          <Content>
            <RealizeProjectHeader mode={MODE_EXPERT} whenEditProject={true} />
            <Row span={24} style={{ paddingTop: "30px" }}>
              <Col xs={24} md={10}>
                <InviteReaders />
              </Col>
              <Divider type="vertical" style={{ height: "300px" }} />
              <Col xs={24} md={10}>
                <h3>
                  <IntlMessages id="miuwi.project.diffusion.nextSteps" />
                </h3>
                <p>
                  <IntlMessages id="miuwi.project.diffusion.seeProject" />
                </p>
                <div>
                  <Button type="primary">
                    <a
                      style={{ width: "100px", height: "50px" }}
                      href={`${seeOverview}${this.props.project &&
                        this.props.project.slug}?mode=MODE_EXPERT`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IntlMessages id="miuwi.project.diffusion.previewBtn" />
                    </a>
                  </Button>
                </div>

                <p>
                  <IntlMessages id="miuwi.project.diffusion.inviteCustomersLabel" />
                </p>
                <div>
                  <Button
                    style={{ background: "#65328b", color: "#ffffff" }}
                    onClick={this.inviteCustomers}
                  >
                    <IntlMessages id="miuwi.project.diffusion.inviteCustomersButton" />
                  </Button>
                </div>
              </Col>
            </Row>
            <Row span={24}>
              <Col span={24}>
                <JoinProject />
              </Col>
            </Row>
          </Content>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state,
    project: state.projects.project,
    nextToPublish: state.projects.goToPublishProject
  };
};

export default connect(
  mapStateToProps,
  { getProject }
)(Step4);
