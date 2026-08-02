import express from "express";
import { createItem } from "./routing-functions/createItem";
import { readItems } from "./routing-functions/readItems";
import { updateItem } from "./routing-functions/updateItem";
import { deleteItem } from "./routing-functions/deleteItem";

const app = express();
const port = 3003;

//initializes the express server

app.use(express.json());

app.post("/items", createItem);
app.get("/items", readItems);
app.patch("/items/:id", updateItem);
app.delete("/items/:id", deleteItem);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
