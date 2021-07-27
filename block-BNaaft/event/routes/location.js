var express = require('express');
var router = express.Router();
var Event = require('../models/events');
var Remark = require('../models/remarks');
/* GET home page. */

// router.get('/:name', function (req, res, next) {
//   var name = req.params.name;
//   console.log('enetered');
//   Event.find({}).exec((err, events) => {
//     console.log(events);
//     var arrayLocEvents = events.filter((event) => {
//       if (event.location == name) {
//         return event;
//       }
//     });
//     console.log(arrayLocEvents);
//     res.render('location', {
//       locationEvents: arrayLocEvents,
//     });
//   });
// });

router.get('/:name', function (req, res, next) {
  var name = req.params.name;
  console.log('enetered');
  Event.find({ location: name }).exec((err, events) => {
    res.render('location', {
      locationEvents: events,
    });
  });
});
module.exports = router;