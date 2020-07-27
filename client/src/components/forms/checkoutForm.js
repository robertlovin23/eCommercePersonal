import React from 'react';
import {ElementsConsumer, CardElement} from '@stripe/react-stripe-js';
import {Button,Typography} from '@material-ui/core'
import {connect} from 'react-redux'
import {deleteCart, fetchCart, addPayment,deleteItem} from '../../actions'
import CardSection from '../layout/card'

class CheckoutForm extends React.Component {

  componentDidMount(){
      this.props.fetchCart();
  }

  handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    const {stripe, elements, client_secret, auth} = this.props
    console.log(client_secret,stripe)

    if (!stripe || !elements || !client_secret) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: "Robert Lovin",
        },
      }
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {

        alert("Payment Succeeded")
        this.props.addPayment();
        this.props.deleteCart(this.props.cart.customerId);
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  render() {
    console.log(this.props)
    return (
      <form onSubmit={this.handleSubmit}>
        <CardSection />
        <Button disabled={!this.props.stripe} variant="contained" color="primary" type="submit">Confirm order</Button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
    return{
        cart: state.cart,
        payment: state.payment
    }
}

export default connect(mapStateToProps,{
    deleteCart,
    fetchCart,
    addPayment,
    deleteItem
})(CheckoutForm)