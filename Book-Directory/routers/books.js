const express = require("express");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  approveBook,
  deleteBook,
} = require("../controllers/bookController");

const router = new express.Router();

router.post("/", [auth, isAdmin], addBook);
router.get("/", getAllBooks);
router.get("/:id", auth, getBookById);
router.put("/:id", [auth, isAdmin], updateBook);
router.patch("/:id", [auth, isAdmin], approveBook);
router.delete("/:id", [auth, isAdmin], deleteBook);
module.exports = router;
