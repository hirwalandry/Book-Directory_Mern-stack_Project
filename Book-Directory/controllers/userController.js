const asyncMiddleware = require("../middleware/asyncMiddleware");
const Users = require("../models/Users");

const createUser = asyncMiddleware(async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  req.body = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  const users = new Users(req.body);

  await users.save();
  const token = users.generateAuthTokens();
  res
    .header("Authorization", token)
    .header("access-control-expose-headers", "Authorization")
    .status(201)
    .send(users);
});

const getUsers = asyncMiddleware(async (req, res) => {
  const users = await Users.find();
  res.send(users);
});
const getUser = asyncMiddleware(async (req, res) => {
  const user = await Users.findById(req.body.user);
  res.send(user);
});

const updateUser = asyncMiddleware(async (req, res) => {
  // check if updates property is included in db
  const updates = Object.keys(req.body);
  const propertyToUpdate = ["name", "email", "password"];
  const toCheckIncludedProperties = updates.every((update) =>
    propertyToUpdate.includes(update)
  );
  if (!toCheckIncludedProperties) {
    res.status(400).send({ error: "please insert real property" });
  }

  const user = await Users.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  await user.save();
  res.send(user);
});
const deleteUser = asyncMiddleware(async (req, res) => {
  const user = await Users.findOneAndDelete({ _id: req.params.id });
  if (!user) {
    return res.status(404).send({ error: "not found" });
  }
  res.send(user);
});
module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
