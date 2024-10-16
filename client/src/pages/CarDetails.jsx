// client/src/pages/CarDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchCustomCarById, deleteCustomCar } from '../services/CustomCarsAPI';

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
      <h2>{car.name}</h2>
      <p><strong>Price:</strong> ${car.total_price.toFixed(2)}</p>
      <p><strong>Convertible:</strong> {car.is_convertible ? 'Yes' : 'No'}</p>
      <p><strong>Exterior:</strong> {car.exterior_name}</p>
      <p><strong>Roof:</strong> {car.roof_name}</p>
      <p><strong>Wheels:</strong> {car.wheels_name}</p>
      <p><strong>Interior:</strong> {car.interior_name}</p>
      <Link to={`/edit/${car.id}`}>Edit</Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default CarDetails;
