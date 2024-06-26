const express = require("express");
const connect = require("./src/utils/connect");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const AppRouter = require("./src/Routes");
const User = require("./src/Models/UserModel");

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", AppRouter);

// for signup testing only
app.delete("/delete", async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.deleteOne({ email });
    console.log(user);
    if (user.deletedCount == 0 )
      throw Error("something fucked up");

    res.json({ message: `deleted user : ${email}` });
  } catch (error) {
    res.json({ message: error.message });
  }
});

app.listen(port, async () => {
  try {
    const dbConnected = await connect.MongoDb();
    if (!dbConnected) throw new Error("Server Connection Failed (db Error)");
    console.log("Server Running on Port at " + port);
  } catch (err) {
    console.log(err);
  }
});
