import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronIcon } from '~/icons/ChevronIcon';
import './BackButton.css';

export const BackButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button type="button" onClick={handleClick} className="back_button">
      <ChevronIcon className="back_button__icon" />
      Back
    </button>
  );
};
