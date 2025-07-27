export const LogoutButton = ({
  type = 'button',
  className = 'sidebar__account_logout',
  onClick,
  children,
  ...rest
}) => {
  return (
    <button type={type} className={className} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};
