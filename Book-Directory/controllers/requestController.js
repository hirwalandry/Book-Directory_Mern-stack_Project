const Request = require("../models/Request");
const Users = require("../models/Users")
const asyncMiddleware = require("../middleware/asyncMiddleware");

const createRequest = asyncMiddleware(async (req, res) => {
  // const requests = await Request.find({}).populate("user");
  // const grantRequest = requests.filter((request) => request.grant === true);

  req.body = {
    user: {
      admin: req.params.id,
      customer: req.body.user
    },
    title: req.body.title,
  };
  // console.log(grantRequest);
  // if (grantRequest) {
  //   return res
  //     .status(400)
  //     .send(
  //       "You have already borrowed a book. Please return first book inorder to access another."
  //     );
  // } else {
  const request = new Request(req.body);
  await request.save();
  res.status(201).send({
    request,
    Message: "Request a book is successfully.",
    error: false,
  });
  // }
  // problem here not printing console
});

const getRequests = asyncMiddleware(async (req, res) => {
  const requests = await Request.find();
  res.send(requests);
});
const viewedRequests = asyncMiddleware(async (req, res) => {
  // let fieldToUpdate = {
  //     view: 1
  // }
  // for(const [key, values] of Object.entries(fieldToUpdate)){
  //     if (!values) {
  //         delete fieldToUpdate[key]
  //     }
  // }
  const request = await Request.findById(req.params.id);
  if (!request) {
    console.log("not exist");
    throw new Error("not exist");
  }
  request.viewed = true;
  await request.save();

  res.send(request);
});

const grantRequest = asyncMiddleware(async (req, res) => {
  const request = await Request.findById(req.params.id);
  if (!request) {
    console.log("not exist");
    throw new Error("not exist");
  }
  request.grant = true;
  await request.save();

  res.send(request);
});
const deleteRequest = asyncMiddleware(async (req, res) => {
  const request = await Request.findOneAndDelete({ _id: req.params.id });
  
  if (!request) {
    res.status(404).send({message: "request not found"})
  }

  res.send(request);
})
const deleteRequests = asyncMiddleware(async (req, res) => {
  const requests = await Request.deleteMany();

  res.send(requests);
}); 
module.exports = {
  createRequest,
  getRequests,
  viewedRequests,
  grantRequest,
  deleteRequest,
  deleteRequests,
};
