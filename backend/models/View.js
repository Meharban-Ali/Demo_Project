// models/View.js
const mongoose = require('mongoose');

const viewSchema = new mongoose.Schema({
  contentId: mongoose.Schema.Types.ObjectId,
  date: { type: Date, default: Date.now },
  count: { type: Number, default: 1 }
});
module.exports = mongoose.model('View', viewSchema);