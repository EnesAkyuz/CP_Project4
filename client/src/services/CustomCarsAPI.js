// client/src/services/CustomCarsAPI.js

export const fetchAllCustomCars = async () => {
  try {
    const response = await fetch('/api/customcars');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const cars = await response.json();
    return cars;
  } catch (error) {
    console.error('Error fetching custom cars:', error);
    throw error;
  }
};

export const fetchCustomCarById = async (id) => {
  try {
    const response = await fetch(`/api/customcars/${id}`);
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
    const response = await fetch('/api/customcars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Network response was not ok: ${errorData.error}`);
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
    const response = await fetch(`/api/customcars/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Network response was not ok: ${errorData.error}`);
    }
    return;
  } catch (error) {
    console.error('Error deleting custom car:', error);
    throw error;
  }
};
