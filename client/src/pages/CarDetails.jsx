import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchCustomCarById, deleteCustomCar } from '../services/CustomCarsAPI';
import '../css/ViewCars.css'; // Reuse the ViewCars CSS

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const getCar = async () => {
      try {
        const data = await fetchCustomCarById(id);
        setCar(data);
      } catch (error) {
        console.error('Error fetching car:', error);
      }
    };
    getCar();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteCustomCar(id);
      alert('Car deleted successfully!');
      navigate('/customcars');
    } catch (error) {
      console.error('Error deleting car:', error);
      alert('Failed to delete car.');
    }
  };

  if (!car) return <p>Loading...</p>;

  return (
    <div className="car-details-container">
      <div className="car-card">
        {/* Column 1: Title and price */}
        <div className="car-info">
          <h3>{car.name}</h3>
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

        {/* Column 3: Edit and delete buttons */}
        <div className="car-actions">
          <Link to={`/edit/${car.id}`} className="edit-button">
            Edit
          </Link>
          <button onClick={handleDelete} className="delete-button">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
