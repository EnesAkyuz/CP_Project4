// server/routes/customCarsRoutes.js
import express from 'express';
import {
  getAllCustomCars,
  getCustomCarById,
  createCustomCar,
  updateCustomCar,
  deleteCustomCar,
} from '../controllers/customCarsController.js';

const router = express.Router();

// Routes for custom cars
router.get('/customcars', getAllCustomCars);
router.get('/customcars/:id', getCustomCarById);
router.post('/customcars', createCustomCar);
router.put('/customcars/:id', updateCustomCar);
router.delete('/customcars/:id', deleteCustomCar); // Ensure this route exists

export default router;
