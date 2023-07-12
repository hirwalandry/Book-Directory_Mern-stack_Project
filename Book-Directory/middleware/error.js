// maintainance
const maintainance = (req, res, next) => {
  const error = new Error("please the server is shutdown for maintainance");
  error.status = 503;
  next(error);
};

// not found file error
const error_404 = (req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error);
};
// all error that will occur as declared in app dev
const all_errors = (error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    error: {
      message: error.message,
    },
  });
};
module.exports = {
  error_404,
  all_errors,
};
