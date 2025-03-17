import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  description:{
    type: String,
  }
});

const todoModel = mongoose.model("todo", schema);

export default todoModel;