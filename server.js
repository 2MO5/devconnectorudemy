const express = require("express");
const connectDB = require("./config/db");

const app = express();

//connecting to the db

connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Runing"));

//Defining the routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));

const PORT = process.env.PORT || 5000; //No environment variable? go to 5000

app.listen(PORT, () =>
  console.log(`Server is runnning on the port number ${PORT}`)
);
