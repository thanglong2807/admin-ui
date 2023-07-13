import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./style.css";
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
  const id = uuidv4();
  return (
    <div className="fm_i">
      <label className={`${styleLabel}`} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className={`${styleInput} input`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
