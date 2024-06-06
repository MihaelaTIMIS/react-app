import "./login.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Form, Icon, Input, Alert, Spin } from "antd";

import IntlMessages from "util/IntlMessages";
import { getSeoProject } from "../../library/transformToUrl";

import { userSignIn } from "../../appRedux/actions/Auth";
import { passwordForgot } from "../../appRedux/actions/users";
import { getProject } from "../../appRedux/actions/projects";
import { studentStartsProject } from "../../appRedux/actions/projects";
import { FormattedMessage } from "react-intl";

import { history } from "./../../appRedux/store";

const FormItem = Form.Item;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      message: null,
      err: null,
      showPassword: false,
      showLogin: true,
      loading: false
    };
    this.onChange = this.handleChange.bind(this);
    this.onSubmit = this.handleSubmit.bind(this);
    this.onSubmit = this.handleSubmitEmail.bind(this);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    const newUser = {
      email,
      password
    };
    this.setState({ loading: false });
    if (!email || email.length === 0) {
      // <IntlMessages id="miuwi.login.error" />
      this.setState({
        message: (
          <Alert
            message={""}
            description={<IntlMessages id="miuwi.login.emailError" />}
            type="error"
          />
        )
      });
      return;
    }
    if (!password || password.length === 0) {
      // <IntlMessages id="miuwi.login.error" />
      this.setState({
        message: (
          <Alert
            message={""}
            description={<IntlMessages id="miuwi.login.passwordError" />}
            type="error"
          />
        )
      });
      return;
    } else {
      this.setState({ message: "" });
    }

    this.setState({ loading: true });
    this.props
      .userSignIn(newUser)
      .then(res => {
        if (res) {
          try {
            if (
              this.props &&
              this.props.location &&
              this.props.location.state
            ) {
              let path = this.props.location.state.from.pathname;
              let search = this.props.location.state.from.search;
              /* console.log("test");
              console.log(this.props); */
              let slug = this.props.location.state.from.state.slug;

              //student starts workshop
              if (path && path.includes("student")) {
                /*   let slug = search.substring(search.indexOf("=") + 1); */
                this.props
                  .getProject(slug)
                  .then(project => {
                    if (project.is_free)
                      this.props
                        .studentStartsProject(slug)
                        .then(student => {
                          if (student.slug) {
                            history.push(path + "?id=" + student.slug);
                          } else {
                            history.push("/user");
                          }
                        })
                        .catch(e => {
                          history.push("/user");
                        });
                    else {
                      history.push({
                        pathname: getSeoProject(project),

                        state: { slug: project.slug }
                      });
                    }
                  })
                  .catch(() => {
                    history.push("/user");
                  });
              }
              //si on a été redirigé vers la page login depuis une autre page (pas la page de l'étudiant)
              else {
                history.push(path + search);
              }
            }
            //si on n'a pas été redirigé vers la page login, mais on accede tout simplement
            else {
              history.push("/user");
            }
          } catch (e) {
            this.setState({ loading: false });
            history.push("/user");
            console.log(e);
          }
        }
      })
      .catch(err => {
        this.setState({ loading: false });
        this.setState({
          err: (
            <Alert
              message={<IntlMessages id="miuwi.login.error" />}
              description={<IntlMessages id="miuwi.login.emailPassword" />}
              type="error"
            />
          )
        });
      });
  };

  handleSubmitEmail = event => {
    event.preventDefault();
    const { email } = this.state;
    const newEmail = {
      email
    };
    if (!email || email.length === 0) {
      this.setState({
        message: (
          <Alert
            message={<IntlMessages id="miuwi.login.error" />}
            description={<IntlMessages id="miuwi.login.emailError" />}
            type="error"
          />
        )
      });
      return;
    } else {
      this.setState({ message: "" });
    }

    this.props
      .passwordForgot(newEmail)
      .then(() => {
        this.setState({
          showLogin: true,
          showPassword: false,
          message: (
            <Alert
              description={<IntlMessages id="miuwi.resetPassword.success" />}
              type="success"
              showIcon
            />
          )
        });
      })
      .catch(() => {
        this.setState({
          message: (
            <Alert
              message={<IntlMessages id="miuwi.login.error" />}
              description={<IntlMessages id="miuwi.notExist" />}
              type="error"
            />
          )
        });
        return;
      });
  };
  forgotPassword = () => {
    this.setState({
      showPassword: true,
      showLogin: false,
      message: null
    });
  };

  render() {
    return (
      <div /* className="gx-login-container" */>
        <div
          style={{
            textAlign: "center",
            whiteSpace: "pre-line",
            fontSize: "17px",
            marginBottom: "15px",
            color: "#262626"
          }}
        >
          <IntlMessages id="miuwi.login.welcome" />
        </div>
        <div className="gx-login-content">
          {this.state.showLogin && (
            <div className="gx-login-header gx-text-center">
              <h1 className="gx-login-title">
                <IntlMessages id="miuwi.sidebar.login" />
              </h1>
              {this.state.message}
              {this.state.err}
              <Form
                className="gx-login-form gx-form-row0"
                onSubmit={this.handleSubmit}
              >
                <FormItem>
                  <Input
                    prefix={
                      <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </FormItem>
                <FormItem>
                  <FormattedMessage id="appModule.password">
                    {placeholder => (
                      <Input
                        prefix={
                          <Icon
                            type="lock"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        name="password"
                        type="password"
                        value={this.state.password}
                        placeholder={placeholder}
                        onChange={this.handleChange}
                      />
                    )}
                  </FormattedMessage>
                </FormItem>
                <FormItem className="gx-text-center">
                  {this.state.loading && <Spin />}
                  {!this.state.loading && (
                    <Button type="primary" htmlType="submit">
                      <IntlMessages id="miuwi.loginButton" />
                    </Button>
                  )}
                </FormItem>
                <FormItem>
                  {/* <Checkbox><IntlMessages id="miuwi.login.remember" /></Checkbox> */}
                  {/* <Link className="gx-login-form-forgot" to="/custom-views/user-auth/forgot-password"><IntlMessages id="miuwi.login.forgotPassword" /></Link> */}
                  {/* <Link className="gx-login-form-forgot" to="/login" onClick={()=>this.forgotPassword()}><IntlMessages id="miuwi.login.forgotPassword" /></Link> */}
                  <p
                    style={{
                      textAlign: "center",
                      color: "#FB6119",
                      cursor: "pointer"
                    }}
                    onClick={() => this.forgotPassword()}
                  >
                    <IntlMessages id="miuwi.login.forgotPassword" />
                  </p>
                </FormItem>
                <p style={{ textAlign: "center" }}>
                  <IntlMessages id="miuwi.noaccount" />
                  <br />
                  <Link className="gx-login-form-forgot" to="/signup">
                    <IntlMessages id="miuwi.registering" />
                  </Link>
                </p>
              </Form>
            </div>
          )}
          {this.state.showPassword && (
            <div className="gx-login-header gx-text-center">
              <h1 className="gx-login-title">
                <IntlMessages id="miuwi.login.emailError" />
              </h1>
              {this.state.message}
              {this.state.err}
              <Form
                className="gx-login-form gx-form-row0"
                onSubmit={this.handleSubmitEmail}
              >
                <FormItem>
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </FormItem>
                <FormItem className="gx-text-center">
                  <Button type="primary" htmlType="submit">
                    <IntlMessages id="miuwi.resetButton" />
                  </Button>
                </FormItem>
              </Form>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state,
  project_student: state.projects.project_student,
  project: state.projects.project
});
export default connect(mapStateToProps, {
  userSignIn,
  getProject,
  passwordForgot,
  studentStartsProject
})(Login);
