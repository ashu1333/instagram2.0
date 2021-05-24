require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//SOCKET
const http = require("http").createServer(app);

//DATABASE CONNECTION
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(
  MONGO_URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to mongodb");
  }
);

//ROUTING
app.get("/", (req, res) => {
  res.send({
    msg: "hii running",
  });
});

//SERVER
const PORT = process.env.PORT || 8000;
http.listen(PORT, () => {
  console.log(`Port is Running at ${PORT}`);
});
