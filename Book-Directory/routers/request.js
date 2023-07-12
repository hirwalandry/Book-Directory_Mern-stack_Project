const express = require("express");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const {
  createRequest,
  getRequests,
  viewedRequests,
  grantRequest,
  deleteRequest,
  deleteRequests
} = require("../controllers/requestController");

const router = new express.Router();

router.post("/:id", auth, createRequest);
router.get("/:id", auth, getRequests);
router.patch("/:id", [auth, isAdmin], viewedRequests);
router.put("/:id", [auth, isAdmin], grantRequest);
router.delete("/:id", [auth, isAdmin], deleteRequest);
router.delete("/:id", [auth, isAdmin], deleteRequests
);

module.exports = router;
