import express from "express";
import { authenticate } from "../middleware/auth";

import { addGroup, addGroupUser, deleteGroupInvites, getGroup, getGroupExpenses, getGroupInvites, getGroupUsers, inviteUser } from "../controller/expenseGroup";
import { validateReqQuery } from "../middleware/validator";
import { querySchema } from "../schema/common";

const router = express();

// add group
router.post("/add", authenticate, addGroup);

// get group
router.get("/", authenticate, getGroup);

// add group user
router.post("/user", authenticate, addGroupUser);

// get group user
router.get("/users/:groupId", authenticate, getGroupUsers);

// add to invite
router.post("/invite", authenticate, inviteUser);

// get group expenses
router.get("/expenses/:groupId", validateReqQuery(querySchema), authenticate, getGroupExpenses);

// get invites
router.get("/invite", authenticate, getGroupInvites);

// delete invites
router.delete("/invite/:groupId", authenticate, deleteGroupInvites);

export default router;
