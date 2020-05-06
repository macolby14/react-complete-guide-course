import React from "react";

import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";

import styles from "./Auth.module.css";

class Auth extends React.Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email Address",
        },
        value: "",
        validation: { required: true, isEmail: true },
        valid: null,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: { required: true, minLength: 6 },
        valid: null,
      },
    },
    formIsValid: true,
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

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=`{|}~-]+(?:\.[a-z0-9])/;
      if (!pattern.test(value)) {
        return false;
      }
    }

    if (rules.isNumeric) {
      const pattern = /^\d$/;
      if (!pattern.test(value)) {
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
    const updatedControls = { ...this.state.controls };
    const updatedFormElement = { ...updatedControls[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedControls[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }

    this.setState({ controls: updatedControls, formIsValid: formIsValid });
  };

  render() {
    const formElementsArr = [];
    for (let key in this.state.controls) {
      formElementsArr.push({ id: key, config: this.state.controls[key] });
    }

    const form = formElementsArr.map((formElement) => {
      return (
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
      );
    });

    return (
      <div className={styles.Auth}>
        <form>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
      </div>
    );
  }
}

export default Auth;
