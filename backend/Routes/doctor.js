import express from "express";
import {updateDoctor,deleteDoctor,getAllDoctor,getSingleDoctor, getDoctorProfile} from "../controllers/doctorController.js";
import { authenticate ,restrict} from "../auth/verifyToken.js";
import reviewRouter from './review.js';
const router = express.Router();
router.use("/:doctorId/reviews",reviewRouter);
router.get('/:id',authenticate,getSingleDoctor)
router.put('/:id',authenticate,restrict(["doctor"]),updateDoctor)
router.delete('/',authenticate,restrict(["admin"]),deleteDoctor)
router.get('/',getAllDoctor)
router.get('/profile/me',authenticate,restrict(["doctor"]),getDoctorProfile)
export default router;