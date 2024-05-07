const express = require("express");
const path = require("path");
const cors = require("cors")

const mongoose = require("mongoose");
const passport = require("passport");
require("dotenv").config();

const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");

const app = express();

// DB

mongoose.set("strictQuery", true);
const connect = async () => {
  await mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
  });
};
connect();

// MIDDLEWARE

// app.use(passport.initialize());
// require("./config/passport")(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(logger);

// ROUTES

app.get("/", (req, res) => {
  res.status(200).send({ message: "GET / is healthy" });
});

/* What does this do? How does a monorepo work?

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

*/

app.post("/", (req, res) => {
  console.log(req.body)
});

app.use("/api/chats", require("./routes/chats"));
app.use("/api/profiles", require("./routes/profiles"));
app.use("/api/schedules", require("./routes/schedules"));
app.use("/api/users", require("./routes/users"));

// INIT

const port = process.env.PORT || 8000;

mongoose.connection.once("open", () => {
  console.clear();
  console.log("Connected to MongoDB");
  app.listen(port, () =>
    console.log(`Server running on port ${port}`)
  );
});