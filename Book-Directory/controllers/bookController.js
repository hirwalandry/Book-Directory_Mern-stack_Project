const Books = require("../models/Books");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const Users = require("../models/Users");

const addBook = asyncMiddleware(async (req, res) => {
  const user = await Users.findById(req.body.user);
  if (!user) return res.status(400).send("invalid user!!");

  const books = new Books({
    title: req.body.title,
    author: req.body.author,
    user: req.body.user,
  });

  await books.save();
  res.status(201).send(books);
});

const getAllBooks = asyncMiddleware(async (req, res) => {
  const books = await Books.find().sort({ createdAt: -1 });
  res.send(books);
});

const getBookById = asyncMiddleware(async (req, res) => {
  const book = await Books.findById(req.params.id).populate("user");
  res.send(book);
});

const updateBook = asyncMiddleware(async (req, res) => {
  const user = await Users.findById(req.body.user);
  if (!user) return res.status(400).send("invalid user!!");

  // check if updates property is included in db
  const updates = Object.keys(req.body);
  const propertyToUpdate = ["title", "author", "user", "approved"];
  const toCheckIncludedProperties = updates.every((update) =>
    propertyToUpdate.includes(update)
  );
  if (!toCheckIncludedProperties) {
    res.status(400).send({ error: "please insert real property" });
  }
  // then update them
  const books = await Books.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });
  await books.save();
  res.send(books);
});

const approveBook = asyncMiddleware(async (req, res) => {
  const user = await Users.findById(req.body.user);
  if (!user) return res.status(400).send("invalid user!!");

  const book = await Books.findOneAndUpdate(
    { _id: req.params.id },
    { approved: true },
    {
      new: true,
      runValidators: true,
    }
  );
  res.send(book);
});
const deleteBook = asyncMiddleware(async (req, res) => {
  const book = await Books.findOneAndDelete({ _id: req.params.id });
  if (!book) {
    return res.status(404).send({ error: "not found" });
  }
  res.send(book);
});

module.exports = {
  addBook,
  getBookById,
  getAllBooks,
  updateBook,
  approveBook,
  deleteBook,
};
