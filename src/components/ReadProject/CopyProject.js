import React from "react";
import { connect } from "react-redux";
import { Input, Icon, Row, Col } from "antd";
import "react-multi-email-custom/style.css";
import IntlMessages from "../../util/IntlMessages";

class CopyProject extends React.Component {
  constructor() {
    super();
    this.state = {
      random: Math.floor(Math.random() * 100)
    };
  }

  copy() {
    var copyText = document.querySelector(`#link${this.state.random}`);
    copyText.select();
    document.execCommand("copy");
  }
  render() {
    return (
      <Row style={{ marginBottom: "5px", marginLeft: "5px" }}>
        <Col
          style={{ fontWeight: "100", marginTop: "10px", marginRight: "3px" }}
        >
          <IntlMessages id="miuwi.project.share" />:
        </Col>
        <Col>
          <Input
            style={{
              width: "240px",
              marginRight: "7px",
              fontWeight: "100"
            }}
            type="text"
            id={`link${this.state.random}`}
            value={
              window.location.protocol +
              "//" +
              window.location.host +
              `/p/${this.props.project && this.props.project.miniSlug}`
            }
          />

          <Icon
            type="copy"
            onClick={() => this.copy()}
            style={{ fontSize: "18px", fontWeight: "100", marginTop: "10px" }}
          />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    state
  };
};
export default connect(
  mapStateToProps,
  {}
)(CopyProject);
