const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const routers = require('./routers/index.js');

//NOTE: setting static file
app.use(express.static(path.join(__dirname, 'public')));

//NOTE: app use
app.use(cors({ credentials: true })); //Để bật cookie HTTP qua CORS
app.use(cookieParser());
//app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//NOTE: routers
routers(app);
module.exports = app;
