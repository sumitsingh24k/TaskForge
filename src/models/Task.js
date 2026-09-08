const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    status: { pending: { type: Boolean, default: true }, in_progress: { type: Boolean, default: false }, completed: { type: Boolean, default: false } },
    priority: { low: { type: Boolean, default: false }, medium: { type: Boolean, default: false }, high: { type: Boolean, default: false } }, 
    dueDate: { type: Date, required: true },
    user:{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    timeSpent: { createdAt: { type: Date, default: Date.now }, updatedAt: { type: Date, default: Date.now } },
  }
)

const Task=mongoose.model("Task",taskSchema);
module.exports=Task;
