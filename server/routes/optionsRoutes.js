// server/routes/optionsRoutes.js
import express from 'express';
import { getOptionsByCategory } from '../controllers/optionsController.js';

const router = express.Router();

// Route to get options by category
router.get('/options/:category', getOptionsByCategory);

export default router;
