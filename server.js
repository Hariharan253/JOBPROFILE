const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(cors());
//Connect DB
connectDB();

//init middleware
app.use(express.json({ extended: false }));

//Define Routes
app.use("/api/users", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/jobs", require("./routes/api/job"));
app.use("/api/customers", require("./routes/api/customer"));
app.use("/api/customers-auth", require("./routes/api/customerAuth"));

//  Serve static asset in productuion
if (process.env.NODE_ENV === "production") {
  //set the static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));
