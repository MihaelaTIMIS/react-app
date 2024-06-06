import React from "react";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { FormattedMessage } from "react-intl";

import { history } from "./../../appRedux/store";

import { Button } from 'antd';

// https://stripe.dev/react-stripe-elements/#card

import {
  getProjectStudent,
  studentStartsProject
} from "../../appRedux/actions/projects";

class Checkout extends React.Component {
  onToken = (token, addresses) => {
    let { slug } = this.props;
    if (slug) {
      if (!this.props.project_student) {
        this.props.studentStartsProject(slug, token).then(() => {
          history.push("/confirmation-payment/?slug=" + slug);
        });
      }
    }
  };

  render() {
    let local = "en-UK";
    switch (this.props.user.languageUser) {
      case "english":
        local = "en";
        break;
      case "french":
        local = "fr";
        break;
      case "spanish":
        local = "es";
        break;
      default:
        local = "en";
        break;
    }

    return (
      <FormattedMessage id="miuwi.confirmPaymentButton">
        {button => (
          <StripeCheckout
            disabled={!this.props.legalNoticeAccepted}
            amount={this.props.amount * 100}
            label={button}
            currency="EUR"
            panelLabel="{{amount}}"
            locale={local}
            email={this.props.user.email}
            stripeKey={process.env.REACT_APP_STRIPE_API_KEY}
            description={this.props.project_title}
            token={this.onToken}
            style={{ marginRight: "10px" }}
          >
            <Button type="primary" style={{marginBottom:"5px"}} disabled={!this.props.legalNoticeAccepted} >{button}</Button>
          </StripeCheckout>
        )}
      </FormattedMessage>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    project_student: state.projects.project_student
  };
};
export default connect(
  mapStateToProps,
  {
    getProjectStudent,
    studentStartsProject
  }
)(Checkout);
