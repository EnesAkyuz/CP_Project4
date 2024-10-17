import React, { useEffect, useState } from 'react';
import { fetchAllCustomCars, deleteCustomCar } from '../services/CustomCarsAPI';
import { useNavigate } from 'react-router-dom';
import '../css/ViewCars.css';

const ViewAllCars = () => {
  const [customCars, setCustomCars] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getCustomCars = async () => {
      try {
        const cars = await fetchAllCustomCars();
        setCustomCars(cars);
      } catch (error) {
        console.error('Error fetching custom cars:', error);
        setErrorMessage('Failed to fetch custom cars.');
      }
    };
    getCustomCars();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this car?')) {
      return;
    }

    try {
      await deleteCustomCar(id);
      setCustomCars(customCars.filter((car) => car.id !== id));
      alert('Car deleted successfully!');
    } catch (error) {
      console.error('Error deleting car:', error);
      setErrorMessage('Failed to delete car.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDetails = (id) => {
    navigate(`/customcars/${id}`); // Navigate to CarDetails page
  };

  return (
    <div className="view-all-cars-container">
      <h2>All Custom Cars</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="cars-grid">
        {customCars.map((car) => (
          <div key={car.id} className="car-card">
            {/* Column 1: Title and price */}
            <div className="car-info">
              <h3>
                {car.is_convertible ? '🏎 ' : '🚙 '} {car.name}
              </h3>
              <p className="car-price">
                Total Price: <span>${car.total_price.toFixed(2)}</span>
              </p>
            </div>

            {/* Column 2: Convertible and 2x2 grid */}
            <div className="car-options-container">
              <p>Convertible: {car.is_convertible ? 'Yes' : 'No'}</p>
              <div className="car-options">
                <div className="option">
                  <img src={car.exterior_image} alt={car.exterior_name} />
                  <p>{car.exterior_name}</p>
                </div>
                <div className="option">
                  <img src={car.roof_image} alt={car.roof_name} />
                  <p>{car.roof_name}</p>
                </div>
                <div className="option">
                  <img src={car.wheels_image} alt={car.wheels_name} />
                  <p>{car.wheels_name}</p>
                </div>
                <div className="option">
                  <img src={car.interior_image} alt={car.interior_name} />
                  <p>{car.interior_name}</p>
                </div>
              </div>
            </div>

            {/* Column 3: Details, Edit, and Delete buttons */}
            <div className="car-actions">
              {/* Details button */}
              <button onClick={() => handleDetails(car.id)} className="details-button">
                Details
              </button>
              <button onClick={() => handleEdit(car.id)} className="edit-button">
                Edit
              </button>
              <button onClick={() => handleDelete(car.id)} className="delete-button">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllCars;
