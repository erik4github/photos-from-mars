const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const urlencodedParser = bodyParser.urlencoded({
  extended: false
});

router.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: './public'
  });
});

router.post('/nasa-request', urlencodedParser, function (req, res) {
  const rover = req.body.rover;
  const sol = req.body.sol;

  // NASA API Key
  const apiKey = '';

  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?API_KEY=${apiKey}&sol=${sol}`;

  const httpsConverter = (key, value) => {
    if (key === 'img_src') {
      value = value.replace(/^http:\/\//i, 'https://');
    }
    return value;
  };

  request.get(url, ((err, response, body) => {
    let bodyJSON;
    if (!err) {
      bodyJSON = JSON.parse(body, httpsConverter);
      return res.json(bodyJSON);
    } else {
      return console.log(err, response);
    }
  }));
});

module.exports = router;