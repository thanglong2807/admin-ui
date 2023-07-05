import React from 'react'


interface InputProps{
    label:string,
    value:string,
    onChange:()=>string,
    name:string,
    type:string,
    styleLabel:string,
    styleInput:string
}
const Input:React.FC<InputProps> = (props) => {
    const {
        label,
        value,
        onChange,
        name,
        type,
        styleLabel,
        styleInput,
    }=props
  return (
    <div>
        <label className={`${styleLabel}`} htmlFor="">{label}</label>
        <input 
        className={`${styleInput}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}

        />
    </div>
  )
}

export default Input