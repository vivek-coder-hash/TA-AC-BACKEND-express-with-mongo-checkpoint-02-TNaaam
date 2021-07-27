var express = require('express');
var router = express.Router();
var Event = require('../models/events');
var Remark = require('../models/remarks');
/* GET home page. */

// router.get('/ascend', function (req, res, next) {
//   Event.find({}).exec((err, events) => {
//     events.sort(function (a, b) {
//       return (
//         a.start_date.split('-').map(Number).join('') -
//         b.start_date.split('-').map(Number).join('')
//       );
//     });
//     res.render('ascend', {
//       ascendEvents: events,
//     });
//   });
// });
router.get('/ascend', function (req, res, next) {
  Event.find({})
    .sort({ start_date: 1 })
    .exec((err, events) => {
      res.render('ascend', {
        ascendEvents: events,
      });
    });
});
// router.get('/descend', function (req, res, next) {
//   Event.find({}).exec((err, events) => {
//     events.sort(function (a, b) {
//       return (
//         b.start_date.split('-').map(Number).join('') -
//         a.start_date.split('-').map(Number).join('')
//       );
//     });
//     res.render('descend', {
//       descendEvents: events,
//     });
//   });
// });
router.get('/descend', function (req, res, next) {
  Event.find({})
    .sort({ start_date: -1 })
    .exec((err, events) => {
      res.render('descend', {
        descendEvents: events,
      });
    });
});
module.exports = router;