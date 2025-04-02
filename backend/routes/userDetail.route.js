import express from 'express';
import { createUserDetail, getUserDetail } from '../controller/userDetail.controller.js';

const router = express.Router();

router.get("/" ,getUserDetail);
router.post ("/" ,createUserDetail );

export default router;