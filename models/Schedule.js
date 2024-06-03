const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Schedule", ScheduleSchema);
