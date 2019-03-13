import express from "express";
const router = express.Router();

import * as NotesController from "../controllers/notes.controller";

router.get("/", NotesController.getAll);
router.get("/:id", NotesController.getById);
router.post("/", NotesController.create);
router.put("/:id", NotesController.update);
router.post("/:id/recycle", NotesController.recycle);
router.delete("/:id", NotesController.deletePermanently);

export default router;
