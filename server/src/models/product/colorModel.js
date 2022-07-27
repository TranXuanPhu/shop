const mongoose = require('mongoose');
const colorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'images',
  },
  sizes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'sizes',
    },
  ],
});

//middleware always find colors
colorSchema.pre(/^find/, function (next) {
  if (this.options._recursed) {
    return next();
  }
  this.populate({ path: 'image sizes', options: { _recursed: true } });
  this.select('-__v');
  next();
});

const color = mongoose.model('colors', colorSchema);

module.exports = color;
