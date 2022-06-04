const express = require('express');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const authRoute = require("./routes/Auth");
const postsRoute = require("./routes/posts");
const usersRoute = require("./routes/users");
const multer = require("multer");
const path = require("path");
const cors = require("cors");


dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));


mongoose.connect(process.env.MONGO_URL)
    .then(console.log("connected to MongoDB"))
    .catch((err) => { console.log(err) });

// for storing images
const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "images");
        },
        filename: (req, file, cb) => {
          cb(null, req.body.name);
        },
      });
      
      const upload = multer({ storage: storage });
      app.post("/api/upload", upload.single("file"), (req, res) => {
        res.status(200).json("File has been uploaded");
      });




app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);
app.use("/api/users", usersRoute);

app.listen(process.env.PORT, () => {
    console.log("console is running");
})