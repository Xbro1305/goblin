import React from "react";
import styles from "./Input.module.scss";

export const Input = ({
  onChange,
  value,
  placeholder,
  readonly,
  type,
  name,
}) => {
  return (
    <label className={styles.inputLabel}>
      <input
        required
        type={type || "text"}
        readOnly={readonly}
        value={value}
        name={name}
        onChange={(e) => onChange(e.target.value)}
      />
      <p>{placeholder}</p>
    </label>
  );
};
