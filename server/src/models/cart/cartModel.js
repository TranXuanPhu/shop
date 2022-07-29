const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
      },
      size: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be lesser than one'],
      },
    },
  ],
  totals: { type: Number, default: 0 },
});

//middleware always find carts
cartSchema.pre(/^find/, function (next) {
  if (this.options._recursed) {
    return next();
  }
  this.populate({ path: 'items.productId', options: { _recursed: true } });
  this.select('-__v');
  next();
});

const cart = mongoose.model('carts', cartSchema);

module.exports = cart;
