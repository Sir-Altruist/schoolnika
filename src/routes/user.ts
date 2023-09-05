import { Router } from "express";
import { UserControllers } from "../controllers";
import { SchemaValidation, authentication } from "../middlewares";

const router = Router();

const { registerUser, loginUser, admin, users } = UserControllers;
const { userMiddleware } = SchemaValidation;

router.post("/signup", userMiddleware, registerUser);
router.post("/signin", loginUser);
router.get("/users", users);
router.get("/admin/:id", authentication, admin);


export default router;
