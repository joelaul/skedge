const express = require("express");
const path = require("path");
const cors = require("cors");

const mongoose = require("mongoose");
const passport = require("passport");
require("dotenv").config();

const opts = require("./config/cors");
const { logger } = require("./middleware/logger");

const app = express();

// DB

mongoose.set("strictQuery", true);
const connect = async () => {
  await mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
  });
};
connect();

// CONFIG / MIDDLEWARE

app.use(passport.initialize());
require("./config/passport")(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(opts));
app.use(logger);

// ROUTES

app.get("/test", (req, res) => {
  res.status(200).send({ message: "/ route works" });
});

app.post("/", (req, res) => {
  console.log(req.body);
});

app.use("/boards", require("./routes/boards"));
app.use("/chats", require("./routes/chats"));
app.use("/matches", require("./routes/matches"));
app.use("/profiles", require("./routes/profiles"));
app.use("/schedules", require("./routes/schedules"));
app.use("/users", require("./routes/users"));

// INIT

const port = process.env.PORT || 8000;
mongoose.connection.once("open", () => {
  console.clear();
  console.log("Connected to MongoDB");
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
