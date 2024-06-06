import React from "react";
import { connect } from "react-redux";
import { Button, Modal } from "antd";
import "react-multi-email-custom/style.css";
import IntlMessages from "../../util/IntlMessages";

import { NotificationManager } from "react-notifications";
import {
  emailInvite,
  emailInviteHelper,
  getProjectStudent
} from "../../appRedux/actions/projects";
import ShareProject from "../CreateProject/CreateSteps/Step4Components/ShareProject";

class Invitations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInvitationsModal: false
    };
  }
  saveEmailRef = emailRef => {
    this.emailRef = emailRef;
  };

  shareWorkshop = (event, project) => {
    event.preventDefault();
    const { emails } = this.emailRef.state;
    emails.map(email => {
      this.props
        .emailInvite(project.slug, email)
        .then(() => {
          NotificationManager.success(
            <IntlMessages id="notification.projectInviteAuthors" />,
            <IntlMessages id="notification.success" />
          );
          this.setState({
            showInvitationsModal: false
          });
        })
        .catch(eror => {
          console.log(eror);
        });

      return email;
    });
  };

  inviteHelper = slug_project_student => {
    const { emails } = this.emailRef.state;
    emails.map(email => {
      if (email) {
        this.props
          .emailInviteHelper(slug_project_student, email)
          .then(() => {
            this.props.getProjectStudent(slug_project_student);
            NotificationManager.success(
              <IntlMessages id="notification.projectInviteAuthors" />,
              <IntlMessages id="notification.success" />
            );
            this.setState({
              showInvitationsModal: false
            });
          })
          .catch(error => {
            if (error.message.indexOf("code 409") !== -1) {
              NotificationManager.error(
                <IntlMessages id="notification.already_helper" />,
                <IntlMessages id="notification.errorMessage" />,
                5000
              );
            }
          });
      } else {
        NotificationManager.error(
          <IntlMessages id="notification.projectInviteAuthors.error" />
        );
      }

      return email;
    });
  };

  render() {
    return (
      <>
        {/* invite helper */}
        <Button
          style={{
            color: "#F04E14",
            fontWeight: "100",
            cursor: "pointer",
            textDecoration: "underline"
          }}

          className="btn-invite-helper"
          onClick={() =>
            this.setState({
              showInvitationsModal: true
            })
          }
        >
          {this.props.invitationsMode === "SHARE_WORKSHOP" && (
            <IntlMessages id="miuwi.offlineUser.discoverProject" />
          )}
          {this.props.invitationsMode === "INVITE_HELPER" && (
            <IntlMessages id="miuwi.project.student.help" />
          )}
        </Button>

        {/* invitations modal  */}
        <Modal
          title={
            <p>
              {this.props.invitationsMode === "SHARE_WORKSHOP" && (
                <IntlMessages id="miuwi.offlineUser.discoverProject" />
              )}
              {this.props.invitationsMode === "INVITE_HELPER" && (
                <IntlMessages id="miuwi.project.student.help" />
              )}
            </p>
          }
          visible={this.state.showInvitationsModal}
          onCancel={() => this.setState({ showInvitationsModal: false })}
          footer={[
            <Button
              key="cancel"
              onClick={() => this.setState({ showInvitationsModal: false })}
            >
              <IntlMessages id="miuwi.project.cancelButton" />
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={e =>
                this.props.invitationsMode === "INVITE_HELPER"
                  ? this.inviteHelper(this.props.project_student.slug)
                  : this.shareWorkshop(e, this.props.project)
              }
            >
              <IntlMessages id="miuwi.offlineUser.sendButton" />
            </Button>
          ]}
          width="60%"
        >
          <ShareProject wrappedComponentRef={this.saveEmailRef} />
        </Modal>
      </>
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
  {
    emailInvite,
    emailInviteHelper,
    getProjectStudent
  }
)(Invitations);
