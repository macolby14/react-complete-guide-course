import React from "react";
import axios from "../../../../axios-orders";
import { connect } from "react-redux";

import Spinner from "../../../UI/Spinner/Spinner";
import Button from "../../../UI/Button/Button";
import Input from "../../../UI/Input/Input";
import withErrorHandler from "../../../../hoc/WithErrorHandler/WithErrorHandler";

import styles from "./ContactData.module.css";
import * as actions from "../../../../store/actions/index";

class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: { required: true },
        valid: null,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: { required: true },
        valid: null,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        value: "",
        validation: { required: true, minLength: 5, maxLength: 5 },
        valid: null,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: { required: true },
        valid: null,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email Address",
        },
        value: "",
        validation: { required: true },
        valid: null,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest", selected: true },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "cheapest",
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
  };

  checkValidity(value, rules) {
    if (rules.required) {
      if (value.trim() === "") {
        return false;
      }
    }

    if (rules.minLength) {
      if (value.length < rules.minLength) {
        return false;
      }
    }

    if (rules.maxLength) {
      if (value.length > rules.maxLength) {
        return false;
      }
    }
    return true;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  orderHandler = (event) => {
    event.preventDefault(); //prevent default for form. Don't request
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ];
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId,
    };
    this.props.onOrderBurger(order, this.props.token);
  };

  render() {
    const formElementsArr = [];
    for (let key in this.state.orderForm) {
      formElementsArr.push({ id: key, config: this.state.orderForm[key] });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArr.map((formElement) => (
          <Input
            key={formElement.id}
            changed={(event) => {
              this.inputChangedHandler(event, formElement.id);
            }}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            elementValue={formElement.config.value}
            valid={formElement.config.valid}
          />
        ))}
        <Button
          btnType="Success"
          clicked={this.orderHandler}
          disabled={!this.state.formIsValid}
        >
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return <div className={styles.ContactData}>{form}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) => {
      dispatch(actions.purchaseBurger(orderData, token));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
