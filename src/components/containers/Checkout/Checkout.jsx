import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends React.Component {
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
          ingredients={this.props.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHander}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => {
            return (
              <ContactData
                ingredients={this.props.ingredients}
                price={this.props.price}
                {...props}
              />
            );
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ingredients: state.ingredients, price: state.price };
};

export default connect(mapStateToProps, null)(Checkout);
