// server/routes/optionsRoutes.js

import express from 'express';
import { getOptionsByCategory, getOptionById } from '../controllers/optionsController.js';

const router = express.Router();

// Route to get an option by category and ID (placed before the category route)
router.get('/options/:category/:id', getOptionById);

// Existing route to get options by category
router.get('/options/:category', getOptionsByCategory);

export default router;