const express = require('express');
const routes = require('./routes');

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/", routes);
app.use(express.static('./public'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});