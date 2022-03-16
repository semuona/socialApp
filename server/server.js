const express = require("express");
const app = express();

require("dotenv").config();

app.use(express.json());
app.use("/users", require("./routes/userRoutes"));
app.use("/posts", require("./routes/postRoutes"));
app.use("/posts/comments", require("./api/comments"))

const connectToDb = require("./config/db");

connectToDb();

app.use(express.static("./server/uploads"));
const port = process.env.PORT || 8080;

app.listen(port, () => console.log("servers is up and running on port:", port));
