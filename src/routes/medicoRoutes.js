// src/routes/medicoRoutes.js
import express from 'express';
import medicoController from '../controllers/medicoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import loginController from '../controllers/loginController.js';

const router = express.Router();

router.post('/login', loginController.login);
router.get('/info', authMiddleware, medicoController.getMedicoInfo);

export default router;
