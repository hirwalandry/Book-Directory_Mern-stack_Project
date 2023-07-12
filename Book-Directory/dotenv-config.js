const result = require("dotenv").config({
  path: __dirname + "/config/test.env",
  debug: process.env.DEBUG,
});
if (result.error) throw result.error;
