import React from "react";
import axios from "../../../../axios-orders";

import Spinner from "../../../UI/Spinner/Spinner";
import Button from "../../../UI/Button/Button";
import Input from "../../../UI/Input/Input";

import styles from "./ContactData.module.css";

class ContactData extends React.Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    // BEFORE react-router-dom
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Mark Colby",
        address: {
          street: "Teststreet",
          zipCode: "96734",
          country: "USA",
        },
        email: "test@test.com",
      },
      deliveryMethod: "fastest",
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
    let form = (
      <form action="">
        <h4>Enter your Contact Data</h4>
        <Input
          inputtype="input"
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <Input
          inputtype="input"
          type="email"
          name="email"
          placeholder="Your Mail"
        />
        <Input
          inputtype="input"
          type="text"
          name="street"
          placeholder="Your Street"
        />
        <Input
          inputtype="input"
          type="text"
          name="postal"
          placeholder="Your Postal"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
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

export default ContactData;
