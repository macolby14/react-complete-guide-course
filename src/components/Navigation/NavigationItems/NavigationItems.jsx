import React from "react";

import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const NavigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" active={false}>
        BurgerBuilder
      </NavigationItem>
      <NavigationItem link="/checkout" active={false}>
        Checkout
      </NavigationItem>
    </ul>
  );
};

export default NavigationItems;
