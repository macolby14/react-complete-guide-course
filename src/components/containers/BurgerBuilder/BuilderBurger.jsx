import React from "react";
import { connect } from "react-redux";
import axios from "../../../axios-orders";

import Aux from "../../../hoc/Aux";
import Burger from "../../Burger/Burger";
import BuildControls from "../../Burger/BuildControls/BuildControls";
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../Burger/OrderSummary/OrderSummary";
import Spinner from "../../UI/Spinner/Spinner";
import WithErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler";
import * as actions from "../../../store/actions/index";

class BurgerBuilder extends React.Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.values(ingredients).reduce((sum, el) => {
      return sum + el;
    }, 0);
    return sum > 0;
  };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurhcased();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = { ...this.props.ings };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = this.props.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    let orderSummary = null;
    if (this.props.ings) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            ordered={this.purchaseHandler}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            isAuthenticated={this.props.isAuthenticated}
          />
        </React.Fragment>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
    } //end of if this.state.ingredients

    return (
      <Aux>
        {
          <Modal
            show={this.state.purchasing}
            modalClosed={this.purchaseCancelHandler}
          >
            {orderSummary}
          </Modal>
        }
        {burger}
      </Aux>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => {
      return dispatch(actions.addIngredient(ingName));
    },
    onIngredientRemoved: (ingName) => {
      return dispatch(actions.removeIngredient(ingName));
    },
    onInitIngredients: () => {
      dispatch(actions.initIngredients());
    },
    onInitPurhcased: () => {
      dispatch(actions.purchaseInit());
    },
    onSetAuthRedirectPath: (path) => {
      dispatch(actions.setAuthRedirectPath(path));
    },
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
