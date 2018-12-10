const express = require('express');
const router = express.Router();
require('./route/index')(router);
require('./route/user')(router);
module.exports = router;