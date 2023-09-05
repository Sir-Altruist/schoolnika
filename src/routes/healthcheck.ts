import { Response, Router } from "express";

const router = Router();

router.get("/", (_, res: Response) => {
    res.sendStatus(200);
});

export default router;