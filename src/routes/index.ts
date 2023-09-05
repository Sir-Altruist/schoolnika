import { Router } from "express";
import UserRoutes from "./user";
import BlogRoutes from "./blog";
import HealthCheck from "./healthcheck";

const router = Router();

router.use("/auth", UserRoutes);
router.use("/blog", BlogRoutes);
router.use("/healthcheck", HealthCheck);

export default router;
