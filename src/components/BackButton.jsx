import { useNavigate } from 'react-router-dom';
import './BackButton.css';
import { CheckIcon } from '~/icons/CheckIcon';

export const BackButton = ({ to = -1, onClick }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(to);
    }
  };

  return (
    <button type="button" onClick={handleClick} className="back_button">
      <CheckIcon className="back_button__icon" />
      Back
    </button>
  );
};
