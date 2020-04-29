import React from "react";

import styles from "./Input.module.css";

const Input = (props) => {
  let inputElement = null;

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          onChange={props.changed}
          className={styles.InputElement}
          {...props.elementConfig}
          value={props.elementValue}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          onChange={props.changed}
          className={styles.InputElement}
          {...props.elementConfig}
          value={props.elementValue}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          onChange={props.changed}
          className={styles.InputElement}
          value={props.elementValue}
        >
          {props.elementConfig.options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          onChange={props.changed}
          className={styles.InpuElement}
          {...props.elementConfig}
          value={props.elementValue}
        />
      );
  }

  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
