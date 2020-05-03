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
import * as actionTypes from "../../../store/actions";

class BurgerBuilder extends React.Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };

  //Moved to state in reducer for now (have not learned async redux)
  // componentDidMount() {
  //   axios
  //     .get("https://react-my-burger-3f9fd.firebaseio.com/ingredients.json")
  //     .then((response) => {
  //       this.setState({ ingredients: response.data });
  //     })
  //     .catch((error) => {
  //       this.setState({ error: true });
  //     });
  // }
  // }

  updatePurchaseState = (ingredients) => {
    const sum = Object.values(ingredients).reduce((sum, el) => {
      return sum + el;
    }, 0);
    return sum > 0;
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = { ...this.props.ings };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = this.state.error ? (
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
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => {
      return dispatch({
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName,
      });
    },
    onIngredientRemoved: (ingName) => {
      return dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
      });
    },
  };
};

export default connect(
  mapPropsToState,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
