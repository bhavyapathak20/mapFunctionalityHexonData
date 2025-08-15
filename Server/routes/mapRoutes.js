import express from 'express';
import { addLocation, getUserLocationsController } from '../controllers/locationController.js';
import { authenticateJWT } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', authenticateJWT, addLocation);
router.get('/user', authenticateJWT, getUserLocationsController);

export default router;
