"use strict";
//Schema for Database
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
});
const Task = (0, mongoose_1.model)('Task', taskSchema);
exports.default = Task;
