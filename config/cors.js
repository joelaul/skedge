// cross origin resource sharing (requesting backend from outside of localhost:8000, blocked by default)

const whitelist = ["http://localhost:5173", "https://skedge.onrender.com"];

const opts = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = opts;
