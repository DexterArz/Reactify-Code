import { Router } from "express";
import {
    signup,
    login,
    logout,
    userFiles
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";



const router = Router()

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/logout').post(logout)
router.route('/user-files').get(verifyJWT,userFiles)

export default router