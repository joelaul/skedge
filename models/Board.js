const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Board", BoardSchema);
