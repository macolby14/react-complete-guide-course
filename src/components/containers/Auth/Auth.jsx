import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { updateObject, checkValidity } from "../../../shared/utility";
import styles from "./Auth.module.css";
import * as actions from "../../../store/actions/index";
import { SET_AUTH_REDIRECT_PATH } from "../../../store/actions/actionTypes";

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
    isSignup: true,
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedControls = updateObject(this.state.controls, {
      [inputIdentifier]: updateObject(this.state.controls[inputIdentifier], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[inputIdentifier].validation
        ),
      }),
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }

    this.setState({ controls: updatedControls, formIsValid: formIsValid });
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup };
    });
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to={this.props.authRedirectPath} />;
    }

    const formElementsArr = [];
    for (let key in this.state.controls) {
      formElementsArr.push({ id: key, config: this.state.controls[key] });
    }

    let form = formElementsArr.map((formElement) => {
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

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;

    if (this.props.error) {
      console.log("errorMessage", this.props.error.message);
      errorMessage = <p>{this.props.error.message}</p>;
    }

    return (
      <div className={styles.Auth}>
        {errorMessage}
        <form onSubmit={this.onSubmitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">
          SWITCH TO {this.state.isSignup ? "SIGN IN" : "SIGN UP"}
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: (path) => {
      return dispatch(SET_AUTH_REDIRECT_PATH("/"));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
