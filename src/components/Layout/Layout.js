import React from "react";

import Aux from "../../hoc/Aux";
import styles from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";

const Layout = props => {
  return (
    <Aux>
      <Toolbar />
      <main className={styles.content}>{props.children}</main>
    </Aux>
  );
};

export default Layout;
