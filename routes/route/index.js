const common = require('../interface');
const async = require('async');
module.exports = function (router) {
  router.get('/', function (req, res) {
    res.redirect('/login.html')
  })
}
