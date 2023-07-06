import React from "react";

interface ButtonProps {
  title: string;
  onClick?: () => void;
  style?: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { title, onClick } = props;

  return (
    <button onClick={onClick} className={`${props.style}`}>
      {title}
    </button>
  );
};

export default Button;
