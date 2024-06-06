import React, { Component } from "react";
import IntlMessages from "../../util/IntlMessages";
import { Row, Avatar, Spin } from "antd";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { ownerProfile } from "../../appRedux/actions/users";

class ComponentOwner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gotoProfileOwner: false,
    };
  }

  componentDidMount() {
    this.props.ownerProfile(this.props.slug);
  }

  showProfile() {
    this.setState({
      gotoProfileOwner: true,
    });
  }
  render() {
    let { owner, loader } = this.props;
    let { gotoProfileOwner } = this.state;
    return (
      <div>
        {loader && <Spin size="small" />}
        {!loader && owner && (
          <Row>
            {gotoProfileOwner && (
              <Redirect to={`/profile/?slug=${owner.slugUser}`} />
            )}
            {/* workshop owner */}
            <label
              onClick={() => this.showProfile()}
              style={{ cursor: "pointer" }}
            >
              <IntlMessages id="miuwi.user.owner" />
              &nbsp;:
              {owner.firstname && <span>&nbsp;{owner.firstname}&nbsp;</span>}
              {owner.firstname === null ||
                (owner.firstname === "" && (
                  <span>&nbsp;{owner.pseudo}&nbsp;</span>
                ))}
              {owner.__mediaProfile__ && (
                <Avatar src={owner.__mediaProfile__.path} />
              )}
              {!owner.__mediaProfile__ && (
                <Avatar style={{ backgroundColor: "#5498D5" }} icon="user" />
              )}
            </label>
            <label>
              {owner.linkedin && owner.linkedin !== "" && (
                <a
                  href={owner.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ borderRadius: "20%", marginLeft: "5px" }}
                >
                  <Avatar
                    shape="circle"
                    src={require("assets/images/linkedin.png")}
                  />
                </a>
              )}
            </label>
          </Row>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state,
    owner: state.user.profileOwner,
    loader: state.user.loaderOwner,
  };
};
export default connect(mapStateToProps, {
  ownerProfile,
})(ComponentOwner);
