export const clientUrl =
  process.env.NODE_ENV == "production"
    ? "https://skedge.onrender.com"
    : "http://localhost:5173";
export const serverUrl =
  process.env.NODE_ENV == "production"
    ? "https://skedge-api.onrender.com"
    : "http://localhost:8000";
