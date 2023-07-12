const { error_404, all_errors } = require("./middleware/error");
const express = require("express");
require("./db/mongoose");
const cors = require("cors");
const authRouter = require("./routers/auth");
const usersRouter = require("./routers/users");
const bookRouter = require("./routers/books");
const requestRouter = require("./routers/request");

const app = express();

app.use(cors({ orgin: "https://www.section.io" }));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/books", bookRouter);
app.use("/requests", requestRouter);

app.use(error_404);
app.use(all_errors);

module.exports = app;
