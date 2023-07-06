import React from "react";

interface InputProps {
  label?: string;
  value: string;
  onChange: any;
  name: string;
  type: string;
  styleLabel?: string;
  styleInput?: string;
}
const Input: React.FC<InputProps> = (props) => {
  const { label, value, onChange, name, type, styleLabel, styleInput } = props;
  return (
    <React.Fragment>
      <label className={`${styleLabel}`} htmlFor="">
        {label}
      </label>
      <input
        className={`${styleInput}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </React.Fragment>
  );
};

export default Input;
