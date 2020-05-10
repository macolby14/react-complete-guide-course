import React from "react";

import classes from "./SideDrawer.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = (props) => {
  // ... conditionally attach css classes for animation
  const attachedClasses = [classes.SideDrawer];
  attachedClasses.push(props.open ? classes.Open : classes.Close);

  return (
    <React.Fragment>
      <div className={classes.Backdrop}>
        <Backdrop show={props.open} clicked={props.closed} />
      </div>
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default SideDrawer;
