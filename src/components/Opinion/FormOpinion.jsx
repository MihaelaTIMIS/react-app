import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Rate, Input } from "antd";
import { addOpinion } from "../../appRedux/actions/opinion";
import { getProject } from "../../appRedux/actions/projects";
import IntlMessages from "util/IntlMessages";
import { NotificationManager } from "react-notifications";

const { TextArea } = Input;
const FormItem = Form.Item;

class FormOpinion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notation: "",
      message: ""
    };
    this.onChange = this.handleChange.bind(this);
    this.onChange = this.handleChangeRate.bind(this);
  }

  handleChangeRate = event => {
    this.setState({ notation: event });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  resetForm = () => {
    this.setState({
      notation: "",
      message: ""
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { notation, message } = this.state;
    const slug = this.props.slug;
    const opinion = { notation, message };
    this.props.form.validateFields((err, values) => {
      this.props.addOpinion(opinion, slug).then(() => {
        this.props.form.setFieldsValue({ message: "", notation: "" });
        NotificationManager.success(
          <IntlMessages id="miuwi.opinion.success" />,
          <IntlMessages id="notification.success" />
        );
      });
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { notation } = this.state;
    return (
      <div>
        <h1>
          <IntlMessages id="miuwi.opinionLabel" />
        </h1>
        <Form
          onSubmit={this.handleSubmit}
          className="gx-login-form gx-form-row0"
        >
          <FormItem>
            {getFieldDecorator("notation", {
              rules: [
                {
                  required: true,
                  message: <IntlMessages id="miuwi.opinionLabel.stars" />
                }
              ]
            })(
              <Rate initialValue={notation} onChange={this.handleChangeRate} />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("message", {
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
                name="message"
                onChange={this.handleChange}
              ></TextArea>
            )}
          </FormItem>
          <FormItem className="gx-text-center">
            <Button type="primary" htmlType="submit">
              <IntlMessages id="miuwi.opinionLabel" />
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    opinion: state.opinions,
    project: state.projects.project
  };
};

const WrappedOpinionForm = Form.create()(FormOpinion);
export default connect(mapStateToProps, { addOpinion, getProject })(
  WrappedOpinionForm
);
