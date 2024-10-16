// client/src/pages/EditCar.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCustomCarById, updateCustomCar } from '../services/CustomCarsAPI';
import { fetchOptionsByCategory } from '../services/OptionsAPI';
import OptionModal from '../components/OptionModal';
import { validateIncompatibleOptions } from '../utilities/validation';

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [carData, setCarData] = useState(null);
  const [options, setOptions] = useState({
    Exterior: [],
    Roof: [],
    Wheels: [],
    Interior: [],
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [showOptionModal, setShowOptionModal] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const getCarAndOptions = async () => {
      try {
        const car = await fetchCustomCarById(id);
        setCarData(car);

        const categories = ['Exterior', 'Roof', 'Wheels', 'Interior'];
        const optionsData = {};

        for (const category of categories) {
          const data = await fetchOptionsByCategory(category, car.is_convertible);
          optionsData[category] = data;
        }

        setOptions(optionsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getCarAndOptions();
  }, [id]);

  useEffect(() => {
    if (!carData) return; // Ensure carData is not null

    const calculateTotalPrice = () => {
      let price = 0;
      const optionIds = [
        carData.exterior_id,
        carData.roof_id,
        carData.wheels_id,
        carData.interior_id,
      ];

      optionIds.forEach((optionId) => {
        const option = Object.values(options)
          .flat()
          .find((opt) => opt.id === optionId);
        if (option) {
          price += parseFloat(option.price);
        }
      });

      setTotalPrice(price);
    };

    calculateTotalPrice();
  }, [carData, options]); // Updated dependency array

  if (!carData) {
    return <p>Loading...</p>;
  }

  const handleOptionSelect = (category, optionId) => {
    setCarData({ ...carData, [`${category.toLowerCase()}_id`]: optionId });
    setShowOptionModal(null); // Close the modal after selection
  };

  const toggleOptionModal = (category) => {
    setShowOptionModal(showOptionModal === category ? null : category);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate incompatible options
    const validationError = await validateIncompatibleOptions(carData, carData.is_convertible);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {
      await updateCustomCar(id, {
        ...carData,
        total_price: totalPrice, // Include total_price if necessary
      });
      alert('Car updated successfully!');
      navigate(`/customcars/${id}`);
    } catch (error) {
      console.error('Error updating car:', error);
      setErrorMessage('Failed to update car.');
    }
  };

  return (
    <div className="edit-car-container">
      <h2>Edit Your Car</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Car Name:
          <input
            type="text"
            value={carData.name}
            onChange={(e) => setCarData({ ...carData, name: e.target.value })}
            required
          />
        </label>
        <label>
          Convertible:
          <input
            type="checkbox"
            checked={carData.is_convertible}
            onChange={(e) => setCarData({ ...carData, is_convertible: e.target.checked })}
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
                  selectedOptionId={carData[`${category.toLowerCase()}_id`]}
                  onSelectOption={(optionId) => handleOptionSelect(category, optionId)}
                  onClose={() => setShowOptionModal(null)}
                  isConvertible={carData.is_convertible}
                />
              )}
            </div>
          ))}
        </div>

        <div className="price-counter">
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit" className="update-button">Update</button>
      </form>
    </div>
  );
};

export default EditCar;
