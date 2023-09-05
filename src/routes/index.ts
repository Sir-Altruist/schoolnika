import { Router } from "express";
import UserRoutes from "./user";
import BlogRoutes from "./blog";

const router = Router();

router.use("/auth", UserRoutes);
router.use("/blog", BlogRoutes);

export default router;
