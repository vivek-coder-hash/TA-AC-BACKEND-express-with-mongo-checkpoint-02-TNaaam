var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var remarkSchema = new Schema(
  {
    content: { type: String, required: true },
    author: { type: String, required: true },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  },
  { timestamps: true }
);

var Remark = mongoose.model('Remark', remarkSchema);

module.exports = Remark;