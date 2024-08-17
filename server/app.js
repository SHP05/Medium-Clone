const express = require('express');
const app = express();
const db = require('./src/config/db');
const cors = require('cors');
const userRoute = require('./src/routes/user');
const authRoute = require('./src/routes/auth');
const postRoute = require('./src/routes/post');
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const path = require('path');

console.log(process.env.PORT);
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', authRoute);
app.use('/', userRoute);
app.use('/', postRoute);

const avatar_path = path.join(__dirname + '/Images/avatar');
const postImagePath = path.join(__dirname , '/Images/postImg');

app.get('/', (req, res) => {
  res.json('hello welcome');
});
app.use('/avatar', express.static(avatar_path));
app.use('/postimg', express.static(postImagePath));

app.listen(PORT, () =>
  console.log(`server is running on http://localhost:${PORT}`)
);
