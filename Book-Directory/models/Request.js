const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const model = mongoose.model;

const requestSchema = new Schema(
  {
    user: {
      admin: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Users",
      },
      customer: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Users",
      },
    },
    title: {
      type: Schema.Types.ObjectId,
      ref: "Books",
      required: true,
    },
    viewed: {
      type: Boolean,
      default: false,
    },
    grant: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
requestSchema.methods.toJSON = function () {
  const request = this;
  const requestObject = request.toObject();

  delete requestObject.viewed;
  delete requestObject.grant;
  delete requestObject.__v;

  return requestObject;
};
// requestSchema.pre('save', function(next){
//     Request.find({bookId: this.bookId}, function(err, docs){
//         if(!docs.length){
//             next()
//         }else{
//             console.log('exist')
//             next(new Error('exist'))
//         }
//     })

// })

// to populate the name of the requester and book she/he request
requestSchema.pre("find", async function (next) {
  this.populate("user").populate("title");
  next();
});
const Request = model("Request", requestSchema);

module.exports = Request;
