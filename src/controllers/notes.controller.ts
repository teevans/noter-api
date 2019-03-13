import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator/check";
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

export const createValidators = [
  check("title", "A title is required for your note!")
    .exists()
    .isString()
    .isLength({ min: 1 })
];

/**
 * Create Note
 *
 * @param req {Request} Express Request Object
 * @param res  {Response} Express Response Object
 * @param next {NextFunction} Next Function to continue
 */
export const create = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { description, title } = req.body;

  const newNote = new Note({
    description,
    title
  });

  Note.create(newNote)
    .then((note: INoteModel) => {
      res.status(201).json(note);
    })
    .catch(next);
};

export const getByIdValidators = [
  check("id")
    .exists()
    .isMongoId()
];

/**
 * Get Note By Id
 *
 * @param req {Request} Express Request Object
 * @param res  {Response} Express Response Object
 * @param next {NextFunction} Next Function to continue
 */
export const getById = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const id: string = req.params.id;

  Note.findById(id)
    .then((note: INoteModel) => {
      if (!note) {
        res.sendStatus(404);
        return;
      }

      res.json(note);
    })
    .catch((error) => {
      next();
    });
};

export const updateValidators = [
  check("id", "The ID must be passed to update a note.")
    .exists()
    .isMongoId(),
  check("title", "A title is required for your note!")
    .exists()
    .isString()
    .isLength({ min: 1 })
];
/**
 * Update Note
 *
 * @param req {Request} Express Request Object
 * @param res  {Response} Express Response Object
 * @param next {NextFunction} Next Function to continue
 */
export const update = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const id: string = req.params.id;
  const body = req.body;

  Note.findByIdAndUpdate(
    id,
    {
      description: body.description,
      recycled: body.recycled,
      title: body.title
    },
    { new: true }
  )
    .then((note: INoteModel) => {

      if (!note) {
        res.sendStatus(404);
        return;
      }

      res.json(note);
    })
    .catch(next);
};

export const recycleValidators = [
  check("id")
    .exists()
    .isMongoId()
];
/**
 * Recycle's Note
 *
 * @param req {Request} Express Request Object
 * @param res  {Response} Express Response Object
 * @param next {NextFunction} Next Function to continue
 */
export const recycle = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const id: string = req.params.id;

  Note.findByIdAndUpdate(
    id,
    {
      recycled: true
    },
    { new: true }
  )
    .then((note: INoteModel) => {
      if (!note) {
        res.sendStatus(404);
        return;
      }
      res.json(note);
    })
    .catch(next);
};

export const restoreValidators = [
  check("id")
    .exists()
    .isMongoId()
];
/**
 * Recycle's Note
 *
 * @param req {Request} Express Request Object
 * @param res  {Response} Express Response Object
 * @param next {NextFunction} Next Function to continue
 */
export const restore = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const id: string = req.params.id;

  Note.findByIdAndUpdate(
    id,
    {
      recycled: false
    },
    { new: true }
  )
    .then((note: INoteModel) => {
      if (!note) {
        res.sendStatus(404);
        return;
      }

      res.json(note);
    })
    .catch(next);
};

export const deleteValidators = [
  check("id")
    .exists()
    .isMongoId()
];
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

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const id: string = req.params.id;

  Note.findByIdAndDelete(id)
    .then((note: INoteModel) => {
      if (!note) {
        res.sendStatus(404);
        return;
      }
      res.json(note);
    })
    .catch(next);
};
