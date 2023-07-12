const jwt = require("jsonwebtoken");
const Users = require("../models/Users");

const auth = async (req, res, next) => {
  if (process.env.isRequired === "false") return next();

  const token = req.header("Authorization");
  if (!token)
    return res
      .status(401)
      .send({ error: "Access denied. No token provided!!!" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.token = token;
    req.user = decoded;

    next();
  } catch (error) {
    res.status(400).send({ error: "Invalid Token!!!" });
  }
};
module.exports = auth;
