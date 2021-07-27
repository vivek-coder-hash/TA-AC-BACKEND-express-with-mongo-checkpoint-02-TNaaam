var express = require('express');
var router = express.Router();
var Event = require('../models/events');
var Remark = require('../models/remarks');
/* GET home page. */

// router.get('/:username', function (req, res, next) {
//   var name = req.params.username;
//   Event.find({}).exec((err, events) => {
//     var arrayEvents = events.filter((event) => {
//       if (event.event_category.split(',').includes(name)) {
//         return event;
//       }
//     });
//     res.render('category', { events: arrayEvents });
//   });
// });
router.get('/:username', function (req, res, next) {
  var name = req.params.username;
  Event.find({ event_category: name }).exec((err, events) => {
    res.render('category', { events: events });
  });
});
module.exports = router;