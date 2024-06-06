import React, {Component} from 'react';
import {
  IbanElement,
  injectStripe,
  StripeProvider,
  Elements,
} from 'react-stripe-elements';

// You can customize your Elements to give it the look and feel of your site.
const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        letterSpacing: '0.025em',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
};
class _IbanForm extends React.Component {
  state = {
    errorMessage: '',
  };

  handleChange = ({error}) => {
    if (error) {
      this.setState({errorMessage: error.message});
    }
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    if (this.props.stripe) {
      this.props.stripe
        .createSource({
          type: 'sepa_debit',
          currency: 'eur',
          owner: {
            name: "jg",
            email: "jg.larue@me.com",
          },
          mandate: {
            notification_method: 'email',
          },
        })
        .then(this.props.handleResult);
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>
          IBAN
          <IbanElement
            supportedCountries={['SEPA']}
            onChange={this.handleChange}
            {...createOptions()}
          />
        </label>
        <div className="error" role="alert">
          {this.state.errorMessage}
        </div>
        <button>Enregistrer</button>
      </form>
    );
  }
}

const IbanForm = injectStripe(_IbanForm);

export class IbanDemo extends Component {
  render() {
    return (
      <StripeProvider apiKey={this.props.stripePublicKey}>
        <Elements>
          <IbanForm handleResult={this.props.handleResult} />
        </Elements>
      </StripeProvider>
    );
  }
}