import express from "express";

import { adminLoginController } from "../controllers/adminController.js";
import { adminRegisterController } from "../controllers/adminController.js";

const router = express.Router();

//admin register route
router.post("/admin/register", adminRegisterController);

//admin login route
router.post("/admin/login", adminLoginController);
export default router;
