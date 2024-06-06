import React, { Component } from "react";
import { Button, Form, Icon, Input, Alert, Checkbox, Spin } from "antd";
import { userSignUp } from "../../appRedux/actions/Auth";
import { connect } from "react-redux";
import IntlMessages from "util/IntlMessages";
import { FormattedMessage } from "react-intl";
import Recaptcha from "react-google-invisible-recaptcha";
import { Link } from "react-router-dom";
import { history } from "./../../appRedux/store";

const FormItem = Form.Item;
const recaptcha_app_key = process.env.REACT_APP_RECAPTCHA_SITEKEY;

class SignUP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password_confirm: "",
      pseudo: "",
      languageUser: this.props.state.settings.locale.languageId,
      message: null,
      loading: false
    };
    this.onChange = this.handleChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onResolved = this.onResolved.bind(this);
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { password, password_confirm } = this.state;
    if (password !== password_confirm) {
      this.setState({
        loading: false,
        message: (
          <Alert
            message={""}
            description={
              <IntlMessages id="miuwi.errorInput.password-confirm-different" />
            }
            type="error"
          />
        )
      });
      return;
    }

    this.props.form.validateFields((err, values) => {
      this.setState({ loading: false });
      if (!err) {
        this.recaptcha.execute();

        this.setState({ loading: true });
      } else {
        this.recaptcha.reset();
      }
    });
  };

  // captcha resolved
  onResolved() {
    const {
      email,
      password,
      password_confirm,
      pseudo,
      languageUser
    } = this.state;
    const newUser = { email, password, password_confirm, pseudo, languageUser };
    /*  alert("Recaptcha resolved with response: " + this.recaptcha.getResponse()); */
    this.props
      .userSignUp(newUser)
      .then((res, err) => {
        if (err) {
          this.setState({ loading: false });
          this.recaptcha.reset();
        }
        if (res) {
          if (res.status === 200 || res.status === 201) {
            if (res.data && res.data.error) {
              this.setState({
                loading: false,
                message: (
                  <Alert
                    message={""}
                    description={
                      <IntlMessages id="miuwi.errorInput.account-already-exists" />
                    }
                    type="error"
                  />
                )
              });
            } else {
              this.setState({ loading: false });
              history.push("/confirmation-inscription");
            }
          }
        } else {
          this.setState({ loading: false });
        }
      })
      .catch(() => {});
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div /* className="gx-login-container" */>
        {/* welcome */}
        <div
          style={{
            textAlign: "center",
            whiteSpace: "pre-line",
            fontSize: "20px",
            marginBottom: "5%",
            color: "#262626"
          }}
        >
          <IntlMessages id="miuwi.login.welcome" />
        </div>
        
        <div className="gx-login-content">
          <div className="gx-login-header gx-text-center">
            <h1 className="gx-login-title">
              <IntlMessages id="miuwi.sidebar.signUp" />
            </h1>
          </div>
          {this.state.message}
          <Form
            onSubmit={this.handleSubmit}
            className="gx-login-form gx-form-row0"
          >
            {/* username */}
            <FormItem>
              {getFieldDecorator("pseudo", {
                rules: [
                  {
                    required: true,
                    message: <IntlMessages id="miuwi.errorInput.pseudo" />
                  }
                ]
              })(
                <div>
                  <FormattedMessage id="miuwi.signup.username">
                    {placeholder => (
                      <Input
                        prefix={
                          <Icon
                            type="user"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        placeholder={placeholder}
                        name="pseudo"
                        onChange={this.handleChange}
                      />
                    )}
                  </FormattedMessage>
                </div>
              )}
            </FormItem>
            
            {/* email */}
            <FormItem>
              {getFieldDecorator("email", {
                rules: [
                  {
                    required: true,
                    message: <IntlMessages id="miuwi.errorInput.email" />
                  }
                ]
              })(
                <div>
                  <FormattedMessage id="miuwi.login.emailError">
                    {placeholder => (
                      <Input
                        prefix={
                          <Icon
                            type="mail"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        placeholder={placeholder}
                        name="email"
                        type="email"
                        onChange={this.handleChange}
                        autoComplete="off"
                      />
                    )}
                  </FormattedMessage>
                </div>
              )}
            </FormItem>
           
           {/* password */}
            <FormItem>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: <IntlMessages id="miuwi.errorInput.password" />
                  }
                ]
              })(
                <div>
                  <FormattedMessage id="miuwi.signup.password">
                    {placeholder => (
                      <Input
                        prefix={
                          <Icon
                            type="lock"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        type="password"
                        placeholder={placeholder}
                        name="password"
                        onChange={this.handleChange}
                        autoComplete="off"
                      />
                    )}
                  </FormattedMessage>
                </div>
              )}
            </FormItem>
            
            {/* password confirm */}
            <FormItem>
              {getFieldDecorator("password_confirm", {
                rules: [
                  {
                    required: true,
                    message: (
                      <IntlMessages id="miuwi.errorInput.password-confirm" />
                    )
                  }
                ]
              })(
                <div>
                  <FormattedMessage id="miuwi.errorInput.password-confirm">
                    {placeholder => (
                      <Input
                        prefix={
                          <Icon
                            type="lock"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        type="password"
                        placeholder={placeholder}
                        name="password_confirm"
                        onChange={this.handleChange}
                        autoComplete="off"
                      />
                    )}
                  </FormattedMessage>
                </div>
              )}
            </FormItem>

            {/* cgv confirm */}
            <FormItem style={{ textAlign: "left" }}>
              {getFieldDecorator("confirm_cgu_cgv", {
                valuePropName: "checked",
                rules: [
                  {
                    required: true,
                    message: <IntlMessages id="miuwi.cgucgy.error" />
                  }
                ]
              })(
                <div className="reset-line-height">
                  <Checkbox></Checkbox>
                  <FormattedMessage id="miuwi.legalnotices">
                    {privacy => (
                      <span dangerouslySetInnerHTML={{ __html: privacy }} />
                    )}
                  </FormattedMessage>
                </div>
              )}
            </FormItem>

            {/* register button  */}
            <FormItem className="gx-text-center">
              {this.state.loading && <Spin />}
              {!this.state.loading && (
                <Button type="primary" htmlType="submit">
                  <IntlMessages id="miuwi.sidebar.signUp" />
                </Button>
              )}
            </FormItem>
            
            {/* already account -- login link */}
            <p style={{ textAlign: "center" }}>
                  <IntlMessages id="miuwi.alreadyregistered" />
                  <br />
                  <Link className="gx-login-form-forgot" to="/login">
                    <IntlMessages id="miuwi.signup.iconnect" />
                  </Link>
                </p>

            
            <Recaptcha
              ref={ref => (this.recaptcha = ref)}
              sitekey={recaptcha_app_key}
              onResolved={this.onResolved}
            />
            
          </Form>
          {/* social icons */}
          {/* <div className="gx-flex-row">
                        <span className="gx-mb-2 gx-mr-3">or Sign up using: </span>
                        <ul className="gx-social-link">
                            <li>
                                <Icon type="google" onClick={() => {
                                    this.props.showAuthLoader();
                                    this.props.userGoogleSignIn();
                                }} />
                            </li>
                            <li>
                                <Icon type="facebook" onClick={() => {
                                    this.props.showAuthLoader();
                                    this.props.userFacebookSignIn();
                                }} />
                            </li>
                            <li>
                                <Icon type="github" onClick={() => {
                                    this.props.showAuthLoader();
                                    this.props.userGithubSignIn();
                                }} />
                            </li>
                            <li>
                                <Icon type="twitter" onClick={() => {
                                    this.props.showAuthLoader();
                                    this.props.userTwitterSignIn();
                                }} />
                            </li>
                        </ul>
                    </div> */}
        </div>
      </div>
    );
  }
}

const WrappedNormalSignUpForm = Form.create()(SignUP);

const mapStateToProps = state => ({
  state
});

export default connect(
  mapStateToProps,
  { userSignUp }
)(WrappedNormalSignUpForm);
