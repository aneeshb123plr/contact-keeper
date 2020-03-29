const express = require("express");
const connectDB = require("./config/db");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Add middlewares

app.use(express.json({ extended: true }));

// Set up Routes

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

// Serve static file in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
