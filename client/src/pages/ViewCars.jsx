// client/src/pages/ViewCars.jsx
import React, { useEffect, useState } from 'react';
import { fetchAllCustomCars } from '../services/CustomCarsAPI';
import { Link } from 'react-router-dom';

const ViewCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const getCars = async () => {
      try {
        const data = await fetchAllCustomCars();
        setCars(data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
    getCars();
  }, []);

  return (
    <div className="view-cars-container">
      <h2>Your Custom Cars</h2>
      <div className="cars-grid">
        {cars.map((car) => (
          <div key={car.id} className="car-card">
            <h3>{car.name}</h3>
            <p>Price: ${car.total_price.toFixed(2)}</p>
            <p>Exterior: {car.exterior_name}</p>
            <p>Roof: {car.roof_name}</p>
            <p>Wheels: {car.wheels_name}</p>
            <p>Interior: {car.interior_name}</p>
            <Link to={`/customcars/${car.id}`}>Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCars;
