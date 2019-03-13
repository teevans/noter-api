"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const note_schema_1 = require("../models/note.schema");
/**
 * Get All Notes
 *
 * @param req {Request} Express Request Object
 * @param res  {Response} Express Response Object
 * @param next {NextFunction} Next Function to continue
 */
exports.getAll = (req, res, next) => {
    note_schema_1.Note.find().then((notes) => {
        res.json(notes);
    }).catch(next);
};
/**
 * Create Note
 *
 * @param req {Request} Express Request Object
 * @param res  {Response} Express Response Object
 * @param next {NextFunction} Next Function to continue
 */
exports.create = (req, res, next) => {
    const body = req.body;
    note_schema_1.Note.create({
        description: body.description,
        title: body.title
    }).then((note) => {
        res.json(note);
    }).catch(next);
};
/**
 * Get Note By Id
 *
 * @param req {Request} Express Request Object
 * @param res  {Response} Express Response Object
 * @param next {NextFunction} Next Function to continue
 */
exports.getById = (req, res, next) => {
    const id = req.params.id;
    note_schema_1.Note.findById(id).then((note) => {
        res.json(note);
    }).catch(next);
};
/**
 * Update Note
 *
 * @param req {Request} Express Request Object
 * @param res  {Response} Express Response Object
 * @param next {NextFunction} Next Function to continue
 */
exports.update = (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    note_schema_1.Note.findByIdAndUpdate(id, {
        description: body.description,
        recycled: body.recycled,
        title: body.title,
    }).then((note) => {
        res.json(note);
    }).catch(next);
};
/**
 * Recycle's Note
 *
 * @param req {Request} Express Request Object
 * @param res  {Response} Express Response Object
 * @param next {NextFunction} Next Function to continue
 */
exports.recycle = (req, res, next) => {
    const id = req.params.id;
    note_schema_1.Note.findByIdAndUpdate(id, {
        recycled: true,
    }).then((note) => {
        res.json(note);
    }).catch(next);
};
/**
 * Delete Note Permanently
 *
 * @param req {Request} Express Request Object
 * @param res  {Response} Express Response Object
 * @param next {NextFunction} Next Function to continue
 */
exports.deletePermanently = (req, res, next) => {
    const id = req.params.id;
    note_schema_1.Note.findByIdAndDelete(id).then((note) => {
        res.json(note);
    }).catch(next);
};
//# sourceMappingURL=notes.controller.js.map