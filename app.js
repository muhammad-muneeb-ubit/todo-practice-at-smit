import express from "express";
import todoModel from "./models/todoSchema.js";
import mongoose from "mongoose";
import cors from "cors"
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

const connectingString =
  "mongodb+srv://admin:admin@todoapp.fb2fk.mongodb.net/?retryWrites=true&w=majority&appName=todoapp";
mongoose
  .connect(connectingString)
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.log("error: ", err.message));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/createtodo", async (req, res) => {
  // console.log(req.body);

  try {
    const data = await todoModel.create(req.body);
    console.log(req.body);
    res.json({
      message: "Todo created successfully!",
      data,
    });
  } catch (error) {
    res.json({
      message: `error while creating todo:  ${error.message}`,
      data: null,
    });
  }
});

app.get("/alltodos", async (req, res) => {
  try {
    const allTodos = await todoModel.find();
    res.json({
      message: "All todos fetched successfully!",
      data: allTodos,
    });
  } catch (error) {
    res.json({
      message: `error while getting todo:  ${error.message}`,
      data: null,
    });
  }
});

app.patch("/update/:id", async (req, res) => {
  // console.log(req.params.id);
  try {
    let id = req.params.id;
    let newBody = req.body;
    const update = await todoModel.findByIdAndUpdate(id, newBody);
    res.json({
      message: "Todos updated successfully!",
      data: update,
    });
  } catch (error) {
    res.json({
      message: `error while updating todo:  ${error.message}`,
      data: null,
    });
  }
});

app.delete("/delete/:id", async (req, res) => {
    try {
        let id = req.params.id;
        const deleteTodo = await todoModel.findByIdAndDelete(id);
        res.json({
            message: "Todo deleted successfully!",
            data: deleteTodo,
          });
    } catch (error) {
        res.json({
            message: `error while deleting todo:  ${error.message}`,
            data: null,
          });
    }
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log("server is listening on port " + PORT);
});
