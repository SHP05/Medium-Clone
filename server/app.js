const expres = require("express");
const app = expres();
const db = require("./src/config/db");
const cors = require("cors");
const userRoute = require("./src/routes/user");
const authRoute = require("./src/routes/auth");
const postRoute = require("./src/routes/post");
const PORT = process.env.PORT || 3001;
const bodyparser = require("body-parser");

console.log(process.env.PORT);
app.use(cors());
app.use(expres.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use("/", authRoute);
app.use("/", userRoute);
app.use("/", postRoute);
// app.use(expres.Router());

app.get("/", (req, res) => {
  res.json("hello welcomw");
});

app.listen(PORT, () =>
  console.log(`server is running on http://localhost:${PORT}`)
);
