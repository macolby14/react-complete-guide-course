import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

import styles from "./CheckoutSummary.module.css";

const CheckoutSummary = (props) => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>We hope it tastes good!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button clicked btnType="Danger">
        CANCEL
      </Button>
      <Button clicked btnType="Success">
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
