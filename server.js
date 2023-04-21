const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect to Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get("", (req, res) => {
  res.send("API Running");
});

// Define Routes
app.use("/api/users", require("./routes/api/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started at Port ${PORT}`));
