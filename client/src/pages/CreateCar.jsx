// client/src/pages/CreateCar.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCustomCar } from '../services/CustomCarsAPI';
import { fetchOptionsByCategory } from '../services/OptionsAPI';
import OptionModal from '../components/OptionModal';
import { validateIncompatibleOptions } from '../utilities/validation';
import "../css/CreateCar.css";

const CreateCar = () => {
  const [carName, setCarName] = useState('');
  const [isConvertible, setIsConvertible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    exterior_id: null,
    roof_id: null,
    wheels_id: null,
    interior_id: null,
  });
  const [options, setOptions] = useState({
    Exterior: [],
    Roof: [],
    Wheels: [],
    Interior: [],
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [showOptionModal, setShowOptionModal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getOptions = async () => {
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
        setErrorMessage('Failed to fetch options.');
      }
    };
    getOptions();
  }, [isConvertible]);

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

    // Ensure all options are selected
    const { exterior_id, roof_id, wheels_id, interior_id } = selectedOptions;
    if (!exterior_id || !roof_id || !wheels_id || !interior_id) {
      setErrorMessage('Please select options for all categories.');
      return;
    }

    try {
      const carData = {
        name: carName,
        is_convertible: isConvertible,
        ...selectedOptions,
      };

      await createCustomCar(carData);
      alert('Car created successfully!');
      navigate('/viewallcars');
    } catch (error) {
      console.error('Error creating car:', error);
      setErrorMessage('Failed to create car.');
    }
  };

  return (
    <div className="create-car-container">
      <h2>Create a New Car</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Car Name:
          <input
            type="text"
            value={carName}
            onChange={(e) => setCarName(e.target.value)}
            required
          />
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
                  options={options[category]} // Pass options to OptionModal
                  selectedOptionId={selectedOptions[`${category.toLowerCase()}_id`]}
                  onSelectOption={(optionId) => handleOptionSelect(category, optionId)}
                  onClose={() => setShowOptionModal(null)}
                  isConvertible={isConvertible}
                />
              )}
            </div>
          ))}
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit" className="create-button">Create</button>
      </form>
    </div>
  );
};

export default CreateCar;
