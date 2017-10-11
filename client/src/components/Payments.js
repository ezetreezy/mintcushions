import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import * as actions from '../actions'


class Payments extends Component {
  render() {
    return (
      <StripeCheckout
      name="mintcushions"
      description="CC# 4242 4242 4242 4242"
      amount={500}
      token={token => this.props.grabStripeToken(token)}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
      <a href='#' className="nav-link features" style={{color: 'white'}}>Add Features</a>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
