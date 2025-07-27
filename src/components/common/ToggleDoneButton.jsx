import { CheckIcon } from '~/icons/CheckIcon';

export const ToggleDoneButton = ({
  done,
  onClick,
  onFocus,
  onBlur,
  disabled = false,
  wrapperClass = '',
  completeClass = '',
  checkClass = '',
  incompleteClass = '',
  ...rest
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      className={wrapperClass}
      {...rest}
    >
      {done ? (
        <div className={completeClass} aria-label="Completed">
          <CheckIcon className={checkClass} />
        </div>
      ) : (
        <div className={incompleteClass} aria-label="incomplete"></div>
      )}
    </button>
  );
};
