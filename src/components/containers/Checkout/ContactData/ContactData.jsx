import React from "react";
import axios from "../../../../axios-orders";
import { connect } from "react-redux";

import Spinner from "../../../UI/Spinner/Spinner";
import Button from "../../../UI/Button/Button";
import Input from "../../../UI/Input/Input";
import * as actionsList from "../../../../store/actions";

import styles from "./ContactData.module.css";

class ContactData extends React.Component {
  state = {
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault(); //prevent default for form. Don't request
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.props.orderForm) {
      formData[formElementIdentifier] = this.props.orderForm[
        formElementIdentifier
      ];
    }
    //console.log("formdata", formData);
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
      });
  };

  render() {
    const formElementsArr = [];
    for (let key in this.props.orderForm) {
      formElementsArr.push({ id: key, config: this.props.orderForm[key] });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArr.map((formElement) => (
          <Input
            key={formElement.id}
            changed={(event) => {
              this.props.inputChanged(event, formElement.id);
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
          disabled={!this.props.formIsValid}
        >
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return <div className={styles.ContactData}>{form}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orderForm: state.contact.orderForm,
    formIsValid: state.contact.formIsValid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    inputChanged: (event, formElementID) => {
      return dispatch({
        type: actionsList.INPUT_CHANGED,
        event: event,
        formElementID: formElementID,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
