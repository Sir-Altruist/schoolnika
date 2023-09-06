import { Router } from "express";
import { BlogControllers } from "../controllers";
import { SchemaValidation, authentication } from "../middlewares";

const router = Router();

const { createBlogPost, fetchAllPosts, fetchSinglePost, updateBlogPost, deleteBlogPost } = BlogControllers;
const { blogMiddleware } = SchemaValidation;

// public routes
router.get("/", fetchAllPosts);
router.get("/:id", fetchSinglePost);


//private routes
router.patch("/:id", authentication, updateBlogPost);
router.delete("/:id", authentication, deleteBlogPost);
router.post("/:id", authentication, blogMiddleware, createBlogPost);



export default router;
