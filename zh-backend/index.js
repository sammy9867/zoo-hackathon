const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '2mb'}));
app.use(bodyParser.urlencoded({limit: '2mb', extended: true}));

/** MongoDB connection **/
const db = require("./config/mongodb").URI;
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


/** API endpoints **/
const user = require("./api/user");
const forest = require("./api/forest");
const report = require("./api/report");

app.use("/users", user);
app.use("/forests", forest);
app.use("/reports", report);

/** Port **/
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server connected on port ${port}`);
});