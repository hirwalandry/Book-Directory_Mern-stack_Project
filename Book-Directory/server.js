const result = require("dotenv").config({
  path: __dirname + "/config/default.env",
});
if (result.error) throw result.error;
const app = require("./app");

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
