const express = require('express');
const router = express.Router();
require('./route/index')(router);
require('./route/user')(router);
require('./route/teacher')(router);
require('./route/student')(router);
require('./route/login')(router);
module.exports = router;