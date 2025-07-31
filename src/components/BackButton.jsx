import { useNavigate } from 'react-router-dom';
import './BackButton.css';
import { CheckIcon } from '~/icons/CheckIcon';


export const BackButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button type="button" onClick={handleClick} className="back_button">
      <CheckIcon className="back_button__icon" />
      Back
    </button>
  );
};

