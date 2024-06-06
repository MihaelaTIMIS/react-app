import React, { Component } from "react";
import { Button, Checkbox, Modal } from "antd";
import { connect } from "react-redux";
import IntlMessages from "util/IntlMessages";
import { FormattedMessage } from "react-intl";
import Checkout from "../ReadProject/CheckoutPayment";

class ProceedToPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      showPayementConfirmationModal: false
    };
  }

  handleChange = event => {
    this.setState({
      checked: event.target.checked
    });
  };

  render() {
    return (
      <>
        <Button
          type="primary"
          style={{
            position: "center",
            marginRight: "15px"
          }}
          onClick={() => {
            this.setState({ showPayementConfirmationModal: true });
          }}
        >
          <IntlMessages id="miuwi.project.paymentButton" />
        </Button>

        {/* demande de confirmation  */}
        <Modal
          title={
            <p style={{ textAlign: "center" }}>
              <IntlMessages id="spliik.confirm" />
              <br />
              <span style={{fontWeight:"100"}}>{this.props.title}</span>
            </p>
          }
          onCancel={() =>
            this.setState({ showPayementConfirmationModal: false })
          }
          visible={this.state.showPayementConfirmationModal}
          footer={null}
        >
          <div style={{ lineHeight: "15px" }}>
            <div style={{ fontSize: "15px" }}>
              <FormattedMessage id="miuwi.paymentLegalNotices">
                {privacy => (
                <Checkbox label="payment-legal" onChange={this.handleChange}>
                  <span dangerouslySetInnerHTML={{ __html: privacy }} />
                </Checkbox>
                )}
              </FormattedMessage>
            </div>
            <div
              style={{
                textAlign: "center",
                marginTop: "20px",
                marginBottom: "5px"
              }}
            >
              <Checkout
                legalNoticeAccepted={this.state.checked}
                amount={this.props.price_totalTTC}
                history={this.props.history}
                slug={this.props.slug}
                project_student={this.props.project_student}
                project_title={this.props.title}
              />
            </div>

            <p style={{ textAlign: "center", marginTop: "10px", fontWeight:"100" }}>
              <FormattedMessage id="miuwi.stripePaymentLabel">
                {privacy => (
                  <span dangerouslySetInnerHTML={{ __html: privacy }} />
                )}
              </FormattedMessage>
            </p>
            <p
              style={{
                fontWeight: "100",
                textAlign: "justify",
                marginTop: "35px"
              }}
            >
              <IntlMessages id="miuwi.confirmPaymentText" />
            </p>
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => ({
  state
});

export default connect(
  mapStateToProps,
  {}
)(ProceedToPayment);
