const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'itemCarts',
    },
  ],
});

//middleware always find carts
cartSchema.pre(/^find/, function (next) {
  if (this.options._recursed) {
    return next();
  }
  this.populate({ path: 'itemCarts', options: { _recursed: true } });
  this.select('-__v');
  next();
});

const cart = mongoose.model('carts', cartSchema);

module.exports = cart;
