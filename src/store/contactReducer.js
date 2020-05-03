import * as actionsList from "./actions";

const initialState = {
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

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsList.INPUT_CHANGED:
      return inputChangedHandler(action.event, action.formElementID, state);
    default:
      return state;
  }
};

const inputChangedHandler = (event, inputIdentifier, state) => {
  const updatedOrderForm = { ...state.orderForm };
  const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
  updatedFormElement.value = event.target.value;
  updatedFormElement.valid = checkValidity(
    updatedFormElement.value,
    updatedFormElement.validation
  );
  updatedOrderForm[inputIdentifier] = updatedFormElement;

  let formIsValid = true;
  for (let inputIdentifier in updatedOrderForm) {
    formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
  }

  return {
    ...state,
    orderForm: updatedOrderForm,
    formIsValid: formIsValid,
  };
};

const checkValidity = (value, rules) => {
  console.log(value, rules);
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
};

export default contactReducer;
