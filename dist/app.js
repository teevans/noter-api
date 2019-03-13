"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const notes_routes_1 = __importDefault(require("./routes/notes.routes"));
// Setup Mongoose Connection
const dbUrl = "mongodb://localhost:27017/noter";
const mongoDB = process.env.MONGODB_URI || dbUrl;
const db = mongoose_1.default.connection;
// tslint:disable-next-line:no-console
db.on("error", console.error.bind(console, "MongoDb Error:"));
mongoose_1.default.connect(mongoDB);
mongoose_1.default.Promise = global.Promise;
const app = express_1.default();
app.use(morgan_1.default("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use("/notes", notes_routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map