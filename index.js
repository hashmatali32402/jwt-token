const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/Auth');
const cors = require('cors');

const app = express();
const port = 3000;
const bodyParser = require('body-parser');

// db connection start
const url = "mongodb://0.0.0.0:27017/test_db";
mongoose.connect(url)
  .then(() => console.log('connected'))
  .catch(err => console.log(err));
// db connection end

app.use(bodyParser.json());
app.use(cors());
app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
