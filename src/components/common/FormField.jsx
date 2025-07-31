import React from 'react';
import './FormField.css';

export const FormField = ({
  id,
  label,
  className = '',
  labelClass = '',
  autoComplete = '',
  children,
}) => {
  return (
    <fieldset className={className}>
      <label htmlFor={id} className={labelClass} autoComplete={autoComplete}>
        {label}
      </label>
      {children}
    </fieldset>
  );
};
