const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Profile", ProfileSchema);
