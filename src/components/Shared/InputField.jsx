import React from 'react';
import './InputField.css';

const InputField = ({ type, placeholder, value, onChange, icon, errorMessage }) => {
  return (
    <div className="input-field">
      {icon && <span className="input-icon">{icon}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={errorMessage ? 'input-error' : ''}
      />
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};

export default InputField;
