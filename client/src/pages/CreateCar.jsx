// client/src/pages/CreateCar.jsx
import React, { useState, useEffect } from 'react';
import { fetchOptionsByCategory } from '../services/OptionsAPI';
import { createCustomCar } from '../services/CustomCarsAPI';
import OptionModal from "../pages/OptionModal.jsx";
import { validateIncompatibleOptions } from '../utilities/validation';

const CreateCar = () => {
  const [isConvertible, setIsConvertible] = useState(false);
  const [options, setOptions] = useState({
    Exterior: [],
    Roof: [],
    Wheels: [],
    Interior: [],
  });
  const [selectedOptions, setSelectedOptions] = useState({
    exterior_id: null,
    roof_id: null,
    wheels_id: null,
    interior_id: null,
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [carName, setCarName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showOptionModal, setShowOptionModal] = useState(null);

  // Fetch options when isConvertible changes
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const categories = ['Exterior', 'Roof', 'Wheels', 'Interior'];
        const optionsData = {};

        for (const category of categories) {
          const data = await fetchOptionsByCategory(category, isConvertible);
          optionsData[category] = data;
        }

        setOptions(optionsData);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, [isConvertible]);

  // Update total price when selected options change
  useEffect(() => {
    const calculateTotalPrice = () => {
      let price = 0;
      for (const category in selectedOptions) {
        const optionId = selectedOptions[category];
        if (optionId) {
          const option = Object.values(options)
            .flat()
            .find((opt) => opt.id === optionId);
          if (option) {
            price += parseFloat(option.price);
          }
        }
      }
      setTotalPrice(price);
    };

    calculateTotalPrice();
  }, [selectedOptions, options]);

  const handleOptionSelect = (category, optionId) => {
    setSelectedOptions({ ...selectedOptions, [`${category.toLowerCase()}_id`]: optionId });
    setShowOptionModal(null); // Close the modal after selection
  };

  const toggleOptionModal = (category) => {
    setShowOptionModal(showOptionModal === category ? null : category);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate incompatible options
    const validationError = await validateIncompatibleOptions(selectedOptions, isConvertible);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {
      await createCustomCar({
        name: carName,
        isConvertible,
        ...selectedOptions,
      });
      alert('Car created successfully!');
      // Optionally reset form or redirect
      setCarName('');
      setSelectedOptions({
        exterior_id: null,
        roof_id: null,
        wheels_id: null,
        interior_id: null,
      });
      setTotalPrice(0);
      setErrorMessage('');
    } catch (error) {
      console.error('Error creating car:', error);
      setErrorMessage('Failed to create car.');
    }
  };

  return (
    <div className="create-car-container">
      <h2>Customize Your Car</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Car Name:
          <input type="text" value={carName} onChange={(e) => setCarName(e.target.value)} required />
        </label>
        <label>
          Convertible:
          <input
            type="checkbox"
            checked={isConvertible}
            onChange={(e) => setIsConvertible(e.target.checked)}
          />
        </label>

        <div className="options-section">
          {['Exterior', 'Roof', 'Wheels', 'Interior'].map((category) => (
            <div key={category} className="option-category">
              <button
                type="button"
                onClick={() => toggleOptionModal(category)}
                className="category-button"
              >
                {category}
              </button>
              {showOptionModal === category && (
                <OptionModal
                  category={category}
                  options={options[category]}
                  selectedOptionId={selectedOptions[`${category.toLowerCase()}_id`]}
                  onSelectOption={(optionId) => handleOptionSelect(category, optionId)}
                  onClose={() => setShowOptionModal(null)}
                  isConvertible={isConvertible}
                />
              )}
            </div>
          ))}
        </div>

        <div className="price-counter">
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit" className="create-button">Create</button>
      </form>
    </div>
  );
};

export default CreateCar;
