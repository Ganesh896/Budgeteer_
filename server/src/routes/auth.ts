import express from "express";
import { authenticate } from "../middleware/auth";
import { verifyToken } from "../controller/atuh";

const router = express();

router.get("/verifyToken", authenticate as express.RequestHandler, verifyToken);

export default router;
