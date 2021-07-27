var express = require('express');
const Event = require('../models/events');
var Remark = require('../models/remarks');
var router = express.Router();
/* GET home page. */
router.get('/:id/edit', function (req, res, next) {
  var id = req.params.id;
  Remark.findById(id, (err, remark) => {
    if (err) return next(err);
    res.render('remarkNewForm', { remark: remark });
  });
});
router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  Remark.findByIdAndUpdate(id, req.body, (err, updatedRemark) => {
    if (err) return next(err);
    res.redirect('/event/' + updatedRemark.eventId);
  });
});
router.get('/:id/delete', function (req, res, next) {
  var id = req.params.id;
  Remark.findByIdAndRemove(id, (err, remark) => {
    if (err) return next(err);
    Event.findByIdAndUpdate(
      remark.eventId,
      {
        $pull: { remarks: remark._id },
      },
      (err, event) => {
        if (err) return next(err);
        res.redirect('/event/' + remark.eventId);
      }
    );
  });
});
router.get('/:id/likes', (req, res, next) => {
  var id = req.params.id;
  Remark.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, remark) => {
    if (err) return next(err);
    res.redirect('/event/' + remark.eventId);
  });
});
router.get('/:id/dislikes', (req, res, next) => {
  var id = req.params.id;
  Remark.findByIdAndUpdate(id, { $inc: { dislikes: 1 } }, (err, remark) => {
    if (err) return next(err);
    res.redirect('/event/' + remark.eventId);
  });
});
module.exports = router;