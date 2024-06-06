import React, { Component } from "react";
import { Avatar } from "antd";
import { getUser } from '../../appRedux/actions/users'
import { connect } from "react-redux";
//import { getUrlApi } from "../../library/urlVar";
import { Link } from "react-router-dom";
class UserInfo extends Component {

  constructor(props) {
    super(props);
    this.state = { user: {} };
  }

  componentDidMount() {
    this.props.getUser();
  }

  render() {
    let { user } = this.props || {};
    let { __mediaProfile__ } = user || {};
    // const userMenuOptions = (
    //   <ul className="gx-user-popover">
    //     {/* <li><a href="/user">My Account</a></li>
    //     <li>Connections</li> */}
    //   </ul>
    // );

    return (
      // <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={userMenuOptions}
      //          trigger="click">

      // </Popover>
      <Link to="/user">
        {user && __mediaProfile__ && <Avatar src={__mediaProfile__.path} className="gx-avatar gx-pointer" alt="" />}
        {user && !__mediaProfile__ && <Avatar src={"/assets/icon-user-blue.png"} className="gx-avatar gx-pointer" alt="" />}
      </Link>
    )

  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
};

export default connect(mapStateToProps, { getUser })(UserInfo);
