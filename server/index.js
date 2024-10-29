const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

mongoose.connect(
  "mongodb+srv://amulgaurav907:mongodb@cluster0.z5sqcu3.mongodb.net/courses",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
