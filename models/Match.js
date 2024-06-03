const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Match", MatchSchema);
