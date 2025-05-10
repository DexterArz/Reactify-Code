import { Router } from "express";
import { editFile, getFileById, uploadFile } from "../controllers/file.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";


const router = Router()

router.route('/upload').post(verifyJWT,uploadFile)
router.route('/edit/:id').put(verifyJWT,editFile)
router.route('/:id').get(verifyJWT,getFileById)


export default router