const mongoose = require('mongoose');
const sizeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
});
sizeSchema.pre(/^find/, function (next) {
  this.select('-__v');
  next();
});
const size = mongoose.model('sizes', sizeSchema);

module.exports = size;
