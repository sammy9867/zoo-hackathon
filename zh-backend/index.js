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
// mongoose.set('debug', true);
mongoose.set('useFindAndModify', false);
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


/** API endpoints **/
const user = require("./api/user");
const organization = require("./api/organization");
const forest = require("./api/forest");
const report = require("./api/report");
const non_profit = require("./api/non-profit");

app.use("/users", user);
app.use("/organizations", organization);
app.use("/forests", forest);
app.use("/reports", report);
app.use("/non-profits", non_profit);

/** Port **/
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server connected on port ${port}`);
});