const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Books = require("./Books");
const Request = require("./Request");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
userSchema.virtual("book", {
  ref: "Books",
  localField: "_id",
  foreignField: "user",
});
userSchema.virtual("request", {
  ref: "Request",
  localField: "_id",
  foreignField: "user",
});
// limit user object properties to be displayed
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.isAdmin;
  delete userObject.__v;

  return userObject;
};

//  to asign token to use
userSchema.methods.generateAuthTokens = function () {
  const token = jwt.sign(
    { _id: this._id.toString(), name: this.name, isAdmin: this.isAdmin },
    process.env.JWT_SECRET_KEY
  );
  return token;
};

// to see if username is exist and bycrpt password
// userSchema.statics.findByCredentials = async (email, password) => {
//   const user = await Users.findOne({ email });
//   if (!user) {
//     res.status(400).send("email or password is incorect!!");
//   }
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     res.status(400).send("email or password is incorect!!");
//   }

//   return user;
// };

//to hash password before use
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});
// update even the ref sof parent property in child schema
userSchema.pre(
  "findOneAndUpdate",
  { document: false, query: true },
  async function (next) {
    const updateResultInBook = await Books.updateMany({
      user: this.getFilter()["_id"],
    });
    const updateResultInRequest = await Request.updateMany({
      user: this.getFilter()["_id"],
    });
    next();
  }
);

// delete even the ref sof parent property in child schema
userSchema.pre(
  "findOneAndDelete",
  { document: false, query: true },
  async function (next) {
    const deleteResultInBook = await Books.deleteMany({
      user: this.getFilter()["_id"],
    });
    const deleteResultInRequest = await Request.deleteMany({
      user: this.getFilter()["_id"],
    });
    next();
  }
);
const Users = model("Users", userSchema);

module.exports = Users;
