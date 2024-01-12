import express from 'express';
import { createUser } from '../controllers/usercontroller.js';
import { getUser } from '../controllers/usercontroller.js';
import { UserLogin } from '../controllers/usercontroller.js';
import { usertry } from '../controllers/usercontroller.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post("/usercreate", createUser);
router.get("/viewuser/:sfsuid", getUser);
router.post("/login", UserLogin);
router.post("/authtry", verifyToken, usertry);
 
export default router;