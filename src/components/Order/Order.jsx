import React from "react";

import styles from "./Order.module.css";

const Order = () => {
  return (
    <div className={styles.Order}>
      <p>Ingredients: Salad (1)</p>
      <p>
        Price: <strong>$5.45</strong>
      </p>
    </div>
  );
};
