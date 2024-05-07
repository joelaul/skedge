const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  id: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model("Chat", ChatSchema);