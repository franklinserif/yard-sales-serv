const express = require('express');
const cors = require('cors');
const config = require('./config/config');

const app = express();

const whiteList = ['http://localhost:8080'];

const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No authorized'));
    }
  },
};

app.use(cors(options));

app.get('/', (req, res) => {
  res.send('working');
});

app.listen(config.serverPort, () => {});
