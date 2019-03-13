import { NextFunction, Request, Response } from "express";
import { INoteModel, Note } from "../models/note.schema";

/**
 * Get All Notes
 *
 * @param req {Request} Express Request Object
 * @param res  {Response} Express Response Object
 * @param next {NextFunction} Next Function to continue
 */
export const getAll = (req: Request, res: Response, next: NextFunction) => {
  Note.find()
    .then((notes: INoteModel[]) => {
      res.json(notes);
    })
    .catch(next);
};

/**
 * Create Note
 *
 * @param req {Request} Express Request Object
 * @param res  {Response} Express Response Object
 * @param next {NextFunction} Next Function to continue
 */
export const create = (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;

  Note.create({
    description: body.description,
    title: body.title
  })
    .then((note: INoteModel) => {
      res.json(note);
    })
    .catch(next);
};

/**
 * Get Note By Id
 *
 * @param req {Request} Express Request Object
 * @param res  {Response} Express Response Object
 * @param next {NextFunction} Next Function to continue
 */
export const getById = (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id;

  Note.findById(id)
    .then((note: INoteModel) => {
      res.json(note);
    })
    .catch(next);
};

/**
 * Update Note
 *
 * @param req {Request} Express Request Object
 * @param res  {Response} Express Response Object
 * @param next {NextFunction} Next Function to continue
 */
export const update = (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id;

  const body = req.body;

  Note.findByIdAndUpdate(id, {
    description: body.description,
    recycled: body.recycled,
    title: body.title
  })
    .then((note: INoteModel) => {
      res.json(note);
    })
    .catch(next);
};

/**
 * Recycle's Note
 *
 * @param req {Request} Express Request Object
 * @param res  {Response} Express Response Object
 * @param next {NextFunction} Next Function to continue
 */
export const recycle = (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id;

  Note.findByIdAndUpdate(id, {
    recycled: true
  })
    .then((note: INoteModel) => {
      res.json(note);
    })
    .catch(next);
};

/**
 * Delete Note Permanently
 *
 * @param req {Request} Express Request Object
 * @param res  {Response} Express Response Object
 * @param next {NextFunction} Next Function to continue
 */
export const deletePermanently = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.params.id;

  Note.findByIdAndDelete(id)
    .then((note: INoteModel) => {
      res.json(note);
    })
    .catch(next);
};
