import express from "express";
import {authorize} from "../middlewares/authorization";
const router = express.Router();

import * as NotesController from "../controllers/notes.controller";

router.get("/", authorize, NotesController.getAll);
router.get("/:id", NotesController.getByIdValidators, NotesController.getById);
router.post("/", NotesController.createValidators, NotesController.create);
router.put("/:id", NotesController.updateValidators, NotesController.update);
router.post("/:id/recycle", NotesController.recycleValidators, NotesController.recycle);
router.post("/:id/restore", NotesController.restoreValidators, NotesController.restore);
router.delete("/:id", NotesController.deleteValidators, NotesController.deletePermanently);

export default router;
