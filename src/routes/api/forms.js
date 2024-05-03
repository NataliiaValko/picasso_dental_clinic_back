import express from 'express';
import ctrl from '../../controllers/forms/index.js';
import { uploadAndProcessFile } from '../../middlewares/index.js';

const router = express.Router();

router.post('/appointment', ctrl.sendAppointment);

router.post('/call', ctrl.sendCall);

router.post('/consultation', uploadAndProcessFile, ctrl.sendConsultation);

export default router;
