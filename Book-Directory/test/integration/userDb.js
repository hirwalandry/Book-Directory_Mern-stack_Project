const Users = require("../../models/Users");
const Books = require("../../models/Books");
const Request = require("../../models/Request");
const mongoose = require("mongoose");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  firstName: "nshuti",
  lastName: "landry",
  email: "hirwalandry77@gmail.com",
  password: "nshuti1234",
  isAdmin: true,
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  firstName: "hirwa",
  lastName: "landry",
  email: "hirwanshuti40@gmail.com",
  password: "hirwa1234",
  isAdmin: true,
};

const bookOne = {
  _id: new mongoose.Types.ObjectId(),
  title: "Be Billionaire",
  author: "Nshuti Landry",
  user: userOneId,
};

const bookTwo = {
  _id: new mongoose.Types.ObjectId(),
  title: "Make Money",
  author: "Hirwa Licey",
  user: userOneId,
};

const requestOne = {
  _id: new mongoose.Types.ObjectId(),
  user: userOneId,
  title: bookOne._id,
};
const requestTwo = {
  _id: new mongoose.Types.ObjectId(),
  user: userTwoId,
  title: bookTwo._id,
};

const databaseServer = async () => {
  await Users.deleteMany();
  await Books.deleteMany();
  await Request.deleteMany();

  await new Users(userOne).save();
  await new Books(bookOne).save();
  await new Books(bookTwo).save();
  await new Request(requestOne).save();
  await new Request(requestTwo).save();
};

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  bookOne,
  bookTwo,
  requestOne,
  requestTwo,
  databaseServer,
};
