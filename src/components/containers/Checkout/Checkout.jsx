import React from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends React.Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0,
    },
    totalPrice: 0,
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    let price = 0;
    let newIngredients = {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0,
    };
    for (let [key, value] of query.entries()) {
      if (key === "price") {
        price = key;
      } else {
        newIngredients[key] = parseInt(value);
      }
    }
    this.setState({ ingredients: newIngredients, totalPrice: price });
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
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => {
            return (
              <ContactData
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                {...props}
              />
            );
          }}
        />
      </div>
    );
  }
}

export default Checkout;
