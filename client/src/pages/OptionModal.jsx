// client/src/components/OptionModal.jsx

import React from 'react';
import '../css/OptionModal.css'; // Create this CSS file for styling

const OptionModal = ({ category, options, selectedOptionId, onSelectOption, onClose, isConvertible }) => {
  const isOptionDisabled = (option) => {
    if (isConvertible && option.is_non_convertible_only) {
      return true;
    }
    if (!isConvertible && option.is_convertible_only) {
      return true;
    }
    return false;
  };

  return (
    <div className="option-modal-overlay">
      <div className="option-modal">
        <h3>Select {category}</h3>
        <ul className="options-list">
          {options.map((option) => (
            <li key={option.id} className="option-item">
              <button
                type="button"
                disabled={isOptionDisabled(option)}
                className={`option-button ${isOptionDisabled(option) ? 'disabled' : ''} ${selectedOptionId === option.id ? 'selected' : ''}`}
                onClick={() => onSelectOption(option.id)}
              >
                <img src={option.image_url} alt={option.name} className="option-image" />
                <div className="option-details">
                  <p>{option.name}</p>
                  <p>${option.price}</p>
                </div>
              </button>
              {isOptionDisabled(option) && <p className="incompatible-banner">Incompatible</p>}
            </li>
          ))}
        </ul>
        <button type="button" onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default OptionModal;
