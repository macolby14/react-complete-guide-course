import React from "react";

import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const NavigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="TestLink" active={false}>
        BurgerBuilder
      </NavigationItem>
      <NavigationItem link="TestLink" active={false}>
        Checkout
      </NavigationItem>
    </ul>
  );
};

export default NavigationItems;
