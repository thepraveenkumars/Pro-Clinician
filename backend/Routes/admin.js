import express from "express";
import {updateDoctor,deleteDoctor,getAllDoctor,getSingleDoctor, getDoctorProfile} from "../controllers/doctorController.js";
import { authenticate ,restrict} from "../auth/verifyToken.js";
import reviewRouter from './review.js';
const router = express.Router();
router.use("/:doctorId/reviews",reviewRouter);
router.get('/:id',getSingleDoctor)
router.put('/:id',authenticate,updateDoctor)
router.delete('/:id',authenticate,deleteDoctor)
router.get('/',getAllDoctor)

export default router;