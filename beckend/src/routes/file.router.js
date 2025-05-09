import { Router } from "express";
import { editFile, uploadFile } from "../controllers/file.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";




const router = Router()

router.route('/upload').post(verifyJWT,uploadFile)
router.route('/edit/:id').put(verifyJWT,editFile)


export default router