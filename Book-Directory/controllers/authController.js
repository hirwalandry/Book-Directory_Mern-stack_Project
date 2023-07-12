const asyncMiddleware = require("../middleware/asyncMiddleware");
const Users = require("../models/Users");
const bcrypt = require("bcryptjs");

const loginUser = asyncMiddleware(async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthTokens();
  res.send(token);
});

module.exports = {
  loginUser,
};
