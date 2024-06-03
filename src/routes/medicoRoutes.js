import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import loginController from '../controllers/loginController.js';

const router = express.Router();

router.post('/login', authMiddleware, loginController.login);

export default router;
