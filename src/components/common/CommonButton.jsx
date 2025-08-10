import './CommonButton.css';

export const CommonButton = ({
  children,
  onClick,
  className = '',
  type = 'button',
  onBlur,
  disabled = false,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`common_button ${className}`}
      onClick={onClick}
      onBlur={onBlur}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};
