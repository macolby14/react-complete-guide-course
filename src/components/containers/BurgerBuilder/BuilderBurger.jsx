import React from "react";
import { connect } from "react-redux";

import Aux from "../../../hoc/Aux";
import Burger from "../../Burger/Burger";
import BuildControls from "../../Burger/BuildControls/BuildControls";
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../../Burger/OrderSummary/OrderSummary";
import axios from "../../../axios-orders";
import Spinner from "../../UI/Spinner/Spinner";
import WithErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler";
import * as actionsList from "../../../store/actions";

class BurgerBuilder extends React.Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get("https://react-my-burger-3f9fd.firebaseio.com/ingredients.json")
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push({
      pathname: "/checkout",
    });
  };

  render() {
    const disabledInfo = { ...this.props.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = this.state.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    let orderSummary = null;
    if (this.props.ingredients) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={(newIngred) => {
              this.props.addIngredient(newIngred);
              this.props.updatePurchaseState();
            }}
            ingredientRemoved={(oldIngred) => {
              this.props.removeIngredient(oldIngred);
              this.props.updatePurchaseState();
            }}
            ordered={this.purchaseHandler}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.props.purchasable}
          />
        </React.Fragment>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
    } //end of if this.state.ingredients

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
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

const mapPropsToState = (state) => {
  return {
    ingredients: state.burger.ingredients,
    price: state.burger.price,
    purchasable: state.burger.purchasable,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (newIngredType) => {
      return dispatch({
        type: actionsList.ADD_INGREDIENT,
        newIngredType: newIngredType,
      });
    },
    removeIngredient: (oldIngredType) => {
      return dispatch({
        type: actionsList.REMOVE_INGREDIENT,
        oldIngredType: oldIngredType,
      });
    },
    updatePurchaseState: () => {
      return dispatch({
        type: actionsList.UPDATE_PURCHASE_STATE,
      });
    },
  };
};

export default WithErrorHandler(
  connect(mapPropsToState, mapDispatchToProps)(BurgerBuilder),
  axios
);
