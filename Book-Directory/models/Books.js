const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const Request = require("./Request");

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
bookSchema.virtual("request", {
  ref: "Request",
  localField: "_id",
  foreignField: "title",
});
// limit book object properties to be displayed
bookSchema.methods.toJSON = function () {
  const book = this;
  const bookObject = book.toObject();

  delete bookObject.approved;
  delete bookObject.user.password;
  delete bookObject.user.__v;
  delete bookObject.user.isAdmin;
  // delete bookObject.approved;
  delete bookObject.__v;

  return bookObject;
};

//to populate the the user
bookSchema.pre("find", async function (next) {
  this.populate("user");
  next();
});

// update even the ref sof parent property in child schema

bookSchema.pre(
  "findOneAndUpdate",
  { document: false, query: true },
  async function (next) {
    const updateResultInRequest = await Request.updateMany({
      title: this.getFilter()["_id"],
    });
console.log(updateResultInRequest);
    next();
  }
);

// update even the ref sof parent property in child schema

bookSchema.pre(
  "findOneAndDelete",
  { document: false, query: true },
  async function (next) {
    const updateResultInRequest = await Request.deleteMany({
      title: this.getFilter()["_id"],
    });
    console.log(updateResultInRequest);
    next();
  }
);
const Books = model("Books", bookSchema);

module.exports = Books;
