import express from "express";

import {
  adminLoginController,
  createService,
  getAllServices,
} from "../controllers/adminController.js";
import { adminRegisterController } from "../controllers/adminController.js";
import { requireSignInAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

//admin register route
router.post("/admin/register", adminRegisterController);

//admin login route
router.post("/admin/login", adminLoginController);

router.post("/admin/createservice", requireSignInAdmin, createService);

router.get("/services", getAllServices);

export default router;
