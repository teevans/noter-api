"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.NoteSchema = new mongoose_1.Schema({
    description: { type: String, required: false },
    recycled: { type: Boolean, default: false },
    title: { type: String, required: true },
}, {
    timestamps: true,
});
exports.Note = mongoose_1.model("Note", exports.NoteSchema);
//# sourceMappingURL=note.schema.js.map