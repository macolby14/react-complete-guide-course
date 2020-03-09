import React from "react";

import styles from "./Backdrop.module.css";

const Backdrop = props => {
  return props.show ? <div className={styles.Backdrop}></div> : null;
};

export default Backdrop;