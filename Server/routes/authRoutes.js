import express from 'express';
import registerUser from '../controllers/registrationController.js';
import loginCheck from '../controllers/loginController.js';

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginCheck)

export default router;