// client/src/components/OptionModal.jsx

import React from 'react';
import '../css/OptionModal.css';

const OptionModal = ({
  category,
  options,
  selectedOptionId,
  onSelectOption,
  onClose,
  isConvertible,
}) => {
  return (
    <div className="option-modal">
      <div className="modal-content">
        <h3>Select {category}</h3>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="options-grid">
          {options.map((option) => (
            <div
              key={option.id}
              className={`option-item ${selectedOptionId === option.id ? 'selected' : ''}`}
              onClick={() => onSelectOption(option.id)}
            >
              <img src={option.image_url} alt={option.name} />
              <p>{option.name}</p>
              <p>${option.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OptionModal;
