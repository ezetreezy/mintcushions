import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import * as actions from '../actions'


class Payments extends Component {
  render() {
    return (
      <StripeCheckout
      name="bootlicious"
      description="CC# 4242 4242 4242 4242"
      amount={500}
      token={token => this.props.grabStripeToken(token)}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
      <button className="btn btn-secondary payment-btn">Add Features <span className="fa fa-credit-card" aria-hidden="true"></span></button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
