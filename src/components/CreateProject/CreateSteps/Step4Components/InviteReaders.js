import React from "react";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import { ReactMultiEmailCustom } from "react-multi-email-custom";
import { Icon, Layout, Tag, Form, Button, Modal, Row, Col } from "antd";
import IntlMessages from "../../../../util/IntlMessages";
import { UserDeleteOutlined } from "@ant-design/icons";

import { inviteReaders, expertRemovesReader, getWorkshopReaders } from "../../../../appRedux/actions/projects";
class InviteReaders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // author1_email: "",
      // author2_email: "",
      // author3_email: "",
      hideBtn: true,
      emails: [],
      modalDeleteAuthor: false,
      assistant_index: null,
      delete_function: null,
      email_to_delete: null,
      // assistants: null
    };
    this.onChange = this.handleChange.bind(this);
    this.onSubmit = this.handleSubmit.bind(this);
    this.getLabel = this.getLabel.bind(this);
  }

  componentDidMount() {
    this.props.getWorkshopReaders(this.props.project.id)
    // .then((res) => {
    //   this.setState({ assistants: res })
    // })
  }

  getLabel = (email, index, removeEmail) => {
    return (
      <div data-tag key={index}>
        {email}
        <span data-tag-handle onClick={() => removeEmail(index)}>
          ×
        </span>
      </div>
    );
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      hideBtn: false
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    // const { author1_email, author2_email, author3_email } = this.state;
    this.props
      .inviteReaders(this.props.project.slug, this.state.emails)
      .then(() => {
        NotificationManager.success(
          <IntlMessages id="notification.projectInviteAuthors" />,
          <IntlMessages id="notification.success" />
        );
        this.props.getWorkshopReaders(this.props.project.id)
        this.setState({ hideBtn: true, emails: null });
      });
  };

  showDeleteAssistantModal = (assistant_id) => {
    this.setState({
      modalDeleteAuthor: true,
      assistant_index: assistant_id
    })
  }

  removeAssistant = () => {
    this.props.expertRemovesReader(this.state.assistant_index)
      .then(() => {
        this.props.getWorkshopReaders(this.props.project.id)
        this.setState({ modalDeleteAuthor: false })
      })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { emails } = this.state;
    let assistants = this.props.project_authors
    return (
      <Layout>
        <h3>
          <IntlMessages id="miuwi.project.diffusion.inviteTitle" />
        </h3>
        <p>
          <IntlMessages id="miuwi.project.diffusion.inviteText" /> <br />
          <IntlMessages id="miuwi.project.diffusionBis.shareText2" />
        </p>
        <Form onSubmit={this.handleSubmit}>

          {getFieldDecorator("emails", {})(
            <ReactMultiEmailCustom
              emails={emails}
              onChange={_emails => {
                this.setState({ emails: _emails });
              }}

              getLabel={(email, index, removeEmail) => {
                return (
                  <Tag key={index}>
                    {email}
                    <Icon type="close" onClick={() => removeEmail(index)} />
                  </Tag>
                );
              }}
            />
          )}

          <Button
            htmlType="submit"
            style={{ marginTop: "10px", float: "right", borderColor: "#e40e20", color: "#e40e20" }}
          >
            <IntlMessages id="miuwi.project.diffusion.inviteSubmitBtn" />
          </Button>
          <h3>Vos assistants:</h3>
          <div>
            {assistants && assistants.map((a, index) => {
              return <Row key={index} type="flex" justify="space-between">
                <Col>
                  {a.author_email}
                </Col>
                <Col>
                  <UserDeleteOutlined onClick={() => this.showDeleteAssistantModal(a.id)} />
                </Col>

              </Row>
            })}
          </div>

        </Form>

        {/* THREADS  */}
        <Modal
          title={<IntlMessages id="spliik.confirm" />}
          visible={this.state.modalDeleteAuthor}
          onCancel={() => this.setState({ modalDeleteAuthor: false })}
          width="60%"
          onOk={() => this.removeAssistant()}
        >
          <p style={{ whiteSpace: "pre-line" }}>
            Vous êtes sur de voulor supprimer cet collaborateur de votre liste ?
              </p>

        </Modal>
        {/*   <h3>
            <IntlMessages id="miuwi.project.diffusion.inviteTitle" />
          </h3>
          <p>
            <IntlMessages id="miuwi.project.diffusion.inviteText" />
          </p>
          <div style={{ padding: "15px", paddingBottom: "0" }}>
            <Form.Item>
              <label style={{ float: "left" }}>
                {" "}
                <IntlMessages id="miuwi.project.diffusion.lecteurLabel" />{" "}
                1&nbsp;&nbsp;
              </label>
              <Input
                name="author1_email"
                style={{ width: 200 }}
                value={
                  this.state.author1_email
                    ? this.state.author1_email
                    : this.props.project
                    ? this.props.project.author1_email
                    : ""
                }
                onChange={this.handleChange}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item>
              <label style={{ float: "left" }}>
                <IntlMessages id="miuwi.project.diffusion.lecteurLabel" />{" "}
                2&nbsp;
              </label>
              &nbsp;
              <Input
                name="author2_email"
                style={{ width: 200 }}
                value={
                  this.state.author2_email
                    ? this.state.author2_email
                    : this.props.project
                    ? this.props.project.author2_email
                    : ""
                }
                onChange={this.handleChange}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item>
              <label style={{ float: "left" }}>
                <IntlMessages id="miuwi.project.diffusion.lecteurLabel" />{" "}
                3&nbsp;
              </label>
              &nbsp;
              <Input
                name="author3_email"
                style={{ width: 200 }}
                value={
                  this.state.author3_email
                    ? this.state.author3_email
                    : this.props.project
                    ? this.props.project.author3_email
                    : ""
                }
                onChange={this.handleChange}
                placeholder="Email"
              />
            </Form.Item>
          </div>
          <div>
            <Button htmlType="submit" type="primary">
              <IntlMessages id="miuwi.project.diffusion.inviteSubmitBtn" />
            </Button>
          </div> */}
      </Layout>

    );
  }
}

const mapStateToProps = state => {
  return {
    state,
    project: state.projects.project,
    project_authors: state.projects.project_authors
  };
};

const WrappedForm = Form.create({ name: "invite-assistants" })(InviteReaders);

export default connect(
  mapStateToProps,
  { inviteReaders, expertRemovesReader, getWorkshopReaders }
)(WrappedForm);
