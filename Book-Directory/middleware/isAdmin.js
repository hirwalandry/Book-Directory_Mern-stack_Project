const isAdmin = (req, res, next) => {
  if (process.env.isRequired === "false") return next();

  if (!req.user.isAdmin)
    return res.status(403).send("Access denied. Your forbidden!!!");

  next();
};
module.exports = isAdmin;
