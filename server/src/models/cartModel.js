const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
    },
  ],
});

//middleware always find carts
cartSchema.pre(/^find/, function (next) {
  if (this.options._recursed) {
    return next();
  }
  this.populate({ path: 'user products', options: { _recursed: true } });
  this.select('-__v');
  next();
});

const cart = mongoose.model('carts', cartSchema);

module.exports = color;
