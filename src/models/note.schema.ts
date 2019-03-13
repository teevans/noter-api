import { Document, Model, model, Schema } from "mongoose";
import { INote } from "../interfaces/note.interface";

export interface INoteModel extends INote, Document {}

export let NoteSchema: Schema = new Schema(
  {
    description: { type: String, required: false, default: "" },
    recycled: { type: Boolean, default: false },
    title: { type: String, required: [true, "A title is required!"] },
    isPublic: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

export const Note: Model<INoteModel> = model<INoteModel>("Note", NoteSchema);
