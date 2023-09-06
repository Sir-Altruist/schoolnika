import { Router } from "express";
import { UserControllers } from "../controllers";
import { SchemaValidation, authentication } from "../middlewares";

const router = Router();

const { registerUser, loginUser, admin, users } = UserControllers;
const { userRegistrationMiddleware, userLoginMiddleware } = SchemaValidation;

router.post("/signup", userRegistrationMiddleware, registerUser);
router.post("/signin", userLoginMiddleware, loginUser);
router.get("/users", users);
router.get("/admin/:id", authentication, admin);


export default router;
