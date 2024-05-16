const express = require("express");
// const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const passport = require("passport");
require('dotenv').config();

// Routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profiles");
const questions = require("./routes/api/questions");

// GraphQL
// const typeDefs = require("./typeDefs");
// const resolvers = require("./resolvers");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/questions", questions);
0;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

// const server = new ApolloServer({ typeDefs, resolvers });
// server.applyMiddleware({ app });

app.listen(port, () => console.log(`Server running on ${port}`));

module.exports = app;
