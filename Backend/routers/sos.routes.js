import express from 'express';
import { sendSOSAlert } from '../controllers/sos.controller.js';

const router = express.Router();

// Define the POST route to send SOS
router.post('/send', sendSOSAlert);

export default router;
