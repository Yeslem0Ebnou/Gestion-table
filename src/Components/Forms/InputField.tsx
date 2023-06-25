import React, { ChangeEvent } from "react";
interface InputFieldProps {
    value?: string;
    placeholder?: string|'';
    type?: string|'text';
    onChange?:(event: ChangeEvent<HTMLInputElement>) => void;
}
const InputField: React.FC<InputFieldProps> = ({type, value, placeholder, onChange}) => {
    return <input type={type} className="form-control" value={value} placeholder={placeholder} onChange={onChange}  />;
}


export default InputField;