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

  return (
    <div className="view-all-cars-container">
      <h2>All Custom Cars</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="cars-grid">
        {customCars.map((car) => (
          <div key={car.id} className="car-card">
            <h3>{car.name}</h3>
            <p>Convertible: {car.is_convertible ? 'Yes' : 'No'}</p>
            <p>Total Price: ${car.total_price.toFixed(2)}</p>
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
            <div className="car-actions">
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
