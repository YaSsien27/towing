import express from 'express';
import { createCheckoutSession, getSessionStatus } from '../controllers/checkout.controller.js';

const router = express.Router();

router.post('/create-checkout-session', createCheckoutSession);
router.get('/checkout-session-status', getSessionStatus);  

export default router;