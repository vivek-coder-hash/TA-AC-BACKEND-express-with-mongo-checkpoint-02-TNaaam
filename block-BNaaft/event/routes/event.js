var express = require('express');
var router = express.Router();
var Event = require('../models/events');
var Remark = require('../models/remarks');
/* GET users listing. */

router.get('/', function (req, res, next) {
  Event.find({}, (err, events) => {
    if (err) return next(err);
    var allCategories = [];
    events.filter((event) => {
      var some = event.event_category.split(',');
      for (var i = 0; i < some.length; i++) {
        if (!allCategories.includes(some[i])) {
          allCategories.push(some[i]);
        }
      }
    });

    var allLocations = [];
    events.filter((event) => {
      if (!allLocations.includes(event.location)) {
        allLocations.push(event.location);
      }
    });
    res.render('eventsPage', {
      events: events,
      allCategories: allCategories,
      allLocations: allLocations,
    });
  });
});
router.get('/new', function (req, res) {
  res.render('eventsForm');
});
// router.get('/:id', function (req, res, next) {
//   var id = req.params.id;
//   Blog.findById(id, (err, blog) => {
//     if (err) return next(err);
//     res.render('singleUser', { blog: blog });
//   });
// });
router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  Event.findById(id)
    .populate('remarks')
    .exec((err, event) => {
      if (err) return next(err);
      res.render('singleUser', { event: event });
    });
});
router.get('/:id/edit', function (req, res, next) {
  var id = req.params.id;
  Event.findById(id, (err, event) => {
    if (err) return next(err);
    res.render('eventNewForm', { event: event });
  });
});
router.get('/:id/delete', function (req, res, next) {
  var id = req.params.id;
  Event.findByIdAndDelete(id, (err, event) => {
    if (err) return next(err);
    Remark.deleteMany({ eventId: event.id }, (err, info) => {
      res.redirect('/event/');
    });
  });
});

router.post('/', (req, res, next) => {
  Event.create(req.body, (err, createArticle) => {
    if (err) return next(err);
    res.redirect('/event');
  });
});
router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  Event.findByIdAndUpdate(id, req.body, (err, updateEvent) => {
    if (err) return next(err);
    res.redirect('/event/' + id);
  });
});
router.post('/:id/remarks', (req, res, next) => {
  var id = req.params.id;
  req.body.eventId = id;
  Remark.create(req.body, (err, remark) => {
    console.log(err, remark);
    if (err) return next(err);
    Event.findByIdAndUpdate(
      id,
      { $push: { remarks: remark._id } },
      (err, updatedEvent) => {
        if (err) return next(err);
        res.redirect('/event/' + id);
      }
    );
  });
});
router.get('/:id/likes', (req, res, next) => {
  var id = req.params.id;
  Event.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, event) => {
    console.log(err, event);
    if (err) return next(err);
    res.redirect('/event/' + id);
  });
});
router.get('/:id/dislikes', (req, res, next) => {
  var id = req.params.id;
  Event.findByIdAndUpdate(id, { $inc: { likes: -1 } }, (err, event) => {
    console.log(err, event);
    if (err) return next(err);
    res.redirect('/event/' + id);
  });
});
module.exports = router;