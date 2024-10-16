// client/src/services/CustomCarsAPI.js

const API_URL = '/api/customcars';

export const fetchAllCustomCars = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching custom cars:', error);
    throw error;
  }
};

export const fetchCustomCarById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const car = await response.json();
    return car;
  } catch (error) {
    console.error('Error fetching custom car:', error);
    throw error;
  }
};

export const createCustomCar = async (carData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const newCar = await response.json();
    return newCar;
  } catch (error) {
    console.error('Error creating custom car:', error);
    throw error;
  }
};

export const updateCustomCar = async (id, carData) => {
  try {
    const response = await fetch(`/api/customcars/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Network response was not ok: ${errorData.error}`);
    }

    const updatedCar = await response.json();
    return updatedCar;
  } catch (error) {
    console.error('Error updating custom car:', error);
    throw error;
  }
};

export const deleteCustomCar = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return true;
  } catch (error) {
    console.error('Error deleting custom car:', error);
    throw error;
  }
};
