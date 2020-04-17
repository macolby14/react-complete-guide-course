import React from "react";

import CheckoutSummary from "../../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends React.Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0,
    },
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let [key, value] of query.entries()) {
      ingredients[key] = parseInt(value);
    }
    this.setState({ ingredients: ingredients });
    console.log(ingredients);
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHander = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHander}
        />
      </div>
    );
  }
}

export default Checkout;
