import express from "express";
const router = express.Router();

import * as UsersController from "../controllers/users.controller";

router.get("/", UsersController.getAll);
router.get("/:id", UsersController.getByIdValidators, UsersController.getById);
router.post("/", UsersController.createValidators, UsersController.create);
router.put("/:id", UsersController.updateValidators, UsersController.update);
router.delete("/:id", UsersController.deleteValidators, UsersController.deletePermanently);
router.post("/signin", UsersController.signInValidators, UsersController.signIn);

export default router;
