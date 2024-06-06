import "./style.css";
import React from "react";
import { connect } from "react-redux";
import { LinkedinFilled } from "@ant-design/icons";
import IntlMessages from "../../../util/IntlMessages";
import { Form, Icon, Input, Button, Modal, Avatar } from "antd";
import { MEDIA_TYPE_USER } from "../../../appRedux/actions/media";
import UploadPicture from "../../../routes/components/Upload/UploadPicture";
import { history } from "./../../../appRedux/store";
import { logout } from "../../../appRedux/actions/Auth";

import {
  updateUser,
  getUser,
  updateUserProfile
} from "../../../appRedux/actions/users";
import { Link } from "react-router-dom";

const { TextArea } = Input;

class ProfileHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      showInfo: true,
      user: {
        lastname: "",
        firstname: "",
        pseudo: "",
        __mediaProfile__: null
      },
      lastname: "",
      firstname: "",
      pseudo: "",
      headline: "",
      modalVisible: false
    };

    this.onChange = this.change.bind(this);
    this.onSubmitEdit = this.handleSubmitEdit.bind(this);
  }

  change = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  cleanStorage() {
    this.props.logout().then(() => {
      history.push("/welcome");
    });
  }

  switchViews() {
    this.setState(prevState => ({
      showForm: !prevState.showForm,
      showInfo: !prevState.showInfo
    }));
  }

  handleSubmitEdit = event => {
    event.preventDefault();
    const firstname = this.state.firstname
      ? this.state.firstname
      : this.props.user.firstname;
    const lastname = this.state.lastname
      ? this.state.lastname
      : this.props.user.lastname;
    const pseudo = this.state.pseudo
      ? this.state.pseudo
      : this.props.user.pseudo;
    const linkedin = this.state.linkedin || this.props.user.linkedin;
    const headline = this.state.headline
      ? this.state.headline
      : this.props.user.headline;
    const user = {
      firstname,
      lastname,
      pseudo,
      linkedin,
      headline
    };
    this.props.updateUserProfile(user).then(() => {
      history.push("/user");
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  cancelDelete = e => {
    this.setState({
      visible: false
    });
  };

  componentDidMount() {
    this.props.getUser();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    let user = this.props.user;
    let firstname = user && user.firstname;
    let lastname = user && user.lastname;
    let headline = user && user.headline;
    return (
      <div
        className="gx-profile-banner"
        style={{ backgroundColor: this.props.archive_page ? "#421152" : "" }}
      >
        <div className="gx-profile-container">
          <div className="gx-profile-banner-top">
            {
              <div className="gx-profile-banner-top-left">
                <div className="gx-profile-banner-avatar">
                  {user && (
                    <UploadPicture
                      user={user && user.id}
                      type={MEDIA_TYPE_USER}
                      media={
                        user.__mediaProfile__ ? user.__mediaProfile__ : null
                      }
                      labelBtn={<IntlMessages id="miuwi.form.addAvatar" />}
                    />
                  )}
                </div>
                <div className="gx-profile-banner-avatar-info">
                  {/* pseudo */}
                  <h2 className="gx-mb-2 gx-mb-sm-3 gx-fs-xxl gx-font-weight-light">
                    {user && user.pseudo}
                    {user && user.linkedin && (
                      <a
                        href={user.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ borderRadius: "20%" }}
                      >
                        <Avatar
                          shape="circle"
                          style={{ marginBottom: "10px", marginLeft: "10px" }}
                          src={require("assets/images/linkedin.png")}
                        />
                      </a>
                    )}
                  </h2>
                  {/* name */}
                  {firstname && (
                    <p>
                      {" "}
                      {firstname.charAt(0).toUpperCase() + firstname.slice(1)}
                      &nbsp;{lastname && lastname.toUpperCase()}{" "}
                    </p>
                  )}

                  {/* headline */}
                  {headline !== "" && (
                    <p style={{ whiteSpace: "pre-line" }}>{headline}</p>
                  )}

                  {/* edit profile */}
                  <Button onClick={() => this.showModal()}>
                    <IntlMessages id="miuwi.project.editProject" />
                  </Button>
                  <Link
                    to="/#"
                    onClick={() => this.cleanStorage()}
                    style={{
                      fontWeight: "100",
                      color: "white",
                      fontSize: "11px"
                    }}
                  >
                    <IntlMessages id="miuwi.sideBar.logout" />
                  </Link>
                </div>
              </div>
            }

            <Modal
              title={<IntlMessages id="miuwi.project.editProject" />}
              visible={this.state.visible}
              onCancel={this.cancelDelete}
              footer={[null, null]}
            >
              <div>
                <Form
                  onSubmit={this.onSubmitEdit}
                  encType="multipart/form-data"
                >
                  <Form.Item>
                    {getFieldDecorator("pseudo", {
                      initialValue: user ? user.pseudo : "",
                      rules: [
                        {
                          required: true,
                          message: (
                            <IntlMessages id="miuwi.opinionLabel.stars" />
                          )
                        }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="user"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        name="pseudo"
                        placeholder="pseudo"
                        onChange={this.change}
                      />
                    )}
                  </Form.Item>

                  <Form.Item>
                    {getFieldDecorator("firstname", {
                      initialValue: user ? user.firstname : "",
                      rules: [
                        {
                          required: true,
                          message: (
                            <IntlMessages id="miuwi.opinionLabel.stars" />
                          )
                        }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="user"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        name="firstname"
                        placeholder="firstname"
                        onChange={this.change}
                      />
                    )}
                  </Form.Item>

                  <Form.Item>
                    {getFieldDecorator("lastname", {
                      initialValue: user ? user.lastname : "",
                      rules: [
                        {
                          required: true,
                          message: (
                            <IntlMessages id="miuwi.opinionLabel.stars" />
                          )
                        }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="user"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        name="lastname"
                        placeholder="lastname"
                        onChange={this.change}
                      />
                    )}
                  </Form.Item>

                  <Form.Item>
                    {getFieldDecorator("linkedin", {
                      initialValue: user ? user.linkedin : "",
                      rules: [
                        {
                          required: true,
                          message: (
                            <IntlMessages id="miuwi.opinionLabel.stars" />
                          )
                        }
                      ]
                    })(
                      <Input
                        prefix={
                          <LinkedinFilled
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        style={{ width: 500 }}
                        name="linkedin"
                        placeholder="lien LinkedIn"
                        onChange={this.change}
                      />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator("headline", {
                      initialValue: user ? user.headline : "",
                      rules: [
                        {
                          required: true,
                          message: <IntlMessages id="miuwi.errorInput.title" />
                        }
                      ]
                    })(
                      <TextArea
                        maxLength={300}
                        rows={4}
                        name="headline"
                        placeholder="description créative"
                        onChange={this.change}
                        style={{ width: "500px" }}
                      ></TextArea>
                    )}
                  </Form.Item>
                  <Button type="primary" htmlType="submit">
                    <IntlMessages id="miuwi.project.saveAndCancel" />
                  </Button>
                </Form>
              </div>
            </Modal>

            {/* <div className="gx-profile-banner-top-right">
              <ul className="gx-follower-list">
                <li>
                  <span className="gx-follower-title gx-fs-lg gx-font-weight-medium">2k+</span>
                  <span className="gx-fs-sm">Followers</span></li>
                <li>
                  <span className="gx-follower-title gx-fs-lg gx-font-weight-medium">847</span>
                  <span className="gx-fs-sm">Following</span></li>
                <li>
                  <span className="gx-follower-title gx-fs-lg gx-font-weight-medium">327</span>
                  <span className="gx-fs-sm">Friends</span>
                </li>
              </ul>
            </div> */}
          </div>
          <div className="gx-profile-banner-bottom">
            <div className="gx-tab-list">
              {/* <ul className="gx-navbar-nav">
              <li>
                <span className="gx-link">Timeline</span>
              </li>
              <li>
                <span className="gx-link">About</span>
              </li>
              <li>
                <span className="gx-link">Photos</span>
              </li>
              <li>
                <span className="gx-link">Friends <span className="gx-fs-xs">287</span></span>
              </li>
              <li>
                <span className="gx-link">More</span>
              </li>
            </ul> */}
            </div>
            <span className="gx-link gx-profile-setting">
              {/* <i className="icon icon-setting gx-fs-lg gx-mr-2 gx-mr-sm-3 gx-d-inline-flex gx-vertical-align-middle" /> */}
              {/* <span className="gx-d-inline-flex gx-vertical-align-middle gx-ml-1 gx-ml-sm-0" onClick={() => this.switchViews()}>Setting</span> */}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
const WrappedForm = Form.create()(ProfileHeader);

const mapStateToProps = state => {
  return {
    state,
    user: state.user.user,
    locale: state.settings.locale
  };
};

export default connect(mapStateToProps, {
  updateUser,
  getUser,
  logout,
  updateUserProfile
})(WrappedForm);
