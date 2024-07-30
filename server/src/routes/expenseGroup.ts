import express from "express";
import { authenticate } from "../middleware/auth";

import { addGroup, getGroup, getGroupUsers, inviteUser } from "../controller/expenseGroup";

const router = express();

router.post("/add", authenticate, addGroup);
router.get("/", authenticate, getGroup);

router.post("/invite", authenticate, inviteUser);
router.get("/users/:groupId", authenticate, getGroupUsers);

export default router;
