const common = require('../interface');
const async = require('async');
module.exports = function (router) {
  router.get('/', function (req, res) {
    common.getToken(req, function () {
      async.auto({
        res1: function (done) {
          var obj = {};
          common.test(req, obj, done);
        },
      }, function (err, result) {
        res.render('index', { title: '首页' })
      })
    })
  })
}
