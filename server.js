const express = require("express");
const connectDB = require("./config/db");
const app = express();

const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Add middlewares

app.use(express.json({ extended: true }));

// Set up Routes

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

app.get("/", (req, res) => res.json({ msg: "Welcome to Contact Keeper Api" }));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
