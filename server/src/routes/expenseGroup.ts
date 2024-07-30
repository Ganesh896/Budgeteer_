import express from "express";
import { authenticate } from "../middleware/auth";

import { addGroup, deleteGroupInvites, getGroup, getGroupInvites, getGroupUsers, inviteUser, updateGroupInvites } from "../controller/expenseGroup";

const router = express();

router.post("/add", authenticate, addGroup);
router.get("/", authenticate, getGroup);

router.post("/invite", authenticate, inviteUser);
router.get("/users/:groupId", authenticate, getGroupUsers);

router.get("/invite", authenticate, getGroupInvites);
router.put("/invite", authenticate, updateGroupInvites);
router.delete("/invite", authenticate, deleteGroupInvites);

export default router;
