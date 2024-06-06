import React, { Component } from 'react'
import IntlMessages from "util/IntlMessages";
import { Button, Form, Icon, Input, Alert } from "antd";
import {resetPassword} from '../../appRedux/actions/users';
import { connect } from 'react-redux'

import { history } from "./../../appRedux/store";

const FormItem = Form.Item;
class ResetPassword extends Component {

    constructor(props) {
        super(props)
        this.state = {
            password: '',
            password_confirm: '',
            message: null,
            err: null,
        };
         this.onChange = this.handleChange.bind(this)
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
      }


      handleSubmit = event => {
        event.preventDefault();
        const { password, password_confirm } = this.state;
        const newPassword = {
            password,
            password_confirm
        };
        if (!password || password.length === 0) {
            this.setState({
              message: <Alert
                message={<IntlMessages id="miuwi.login.error" />}
                description={<IntlMessages id="miuwi.login.passwordError" />}
                type="error"
              />
            })
            return
          } 
          if (password !== password_confirm) {
            this.setState({
                message: <Alert
                    message={<IntlMessages id="miuwi.login.error" />}
                    description={<IntlMessages id="miuwi.errorInput.password-confirm-different" />}
                    type="error"
                />
            })
            return;
        }else { this.setState({ message: "" }) }
        let url = this.props.location.pathname;
        let token = url.substr(15)
        this.props.resetPassword(token, newPassword).then(()=>{
          history.push("/login")
        })
      }
    render() {
      
        return (
            <div className="gx-login-container">
                <div className="gx-login-content">
                    <div className="gx-login-header gx-text-center">
                        <h1 className="gx-login-title"><IntlMessages id="miuwi.resetPassword" /></h1>
                        {this.state.message}
                        {this.state.err}
                        <Form className="gx-login-form gx-form-row0" onSubmit={this.handleSubmit}>
                                <FormItem>
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        name="password"
                                        type="password"
                                        value={this.state.password}
                                        placeholder="Password"
                                        onChange={this.handleChange}
                                    />
                                </FormItem>
                                <FormItem>
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        name="password_confirm"
                                        type="password"
                                        value={this.state.password_confirm}
                                        placeholder="Confirm Password"
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
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    state
  
  });

export default connect(mapStateToProps, { resetPassword })(ResetPassword)
