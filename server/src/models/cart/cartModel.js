const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
      },

      color: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'colors',
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

cartSchema.pre('save', async function (next) {
  this.totals = this.items.reduce(
    (prevItem, currentItem) => prevItem + currentItem.quantity,
    0
  );
  next();
});
//middleware always find carts
cartSchema.pre(/^find/, function (next) {
  if (this.options._recursed) {
    return next();
  }
  this.populate({
    path: 'items.product',
    select: 'name slug price',

    options: { _recursed: true },
  });
  this.populate({
    path: 'items.color',
    select: 'name image',
    populate: {
      path: 'image',
    },
    options: { _recursed: true },
  });

  this.select('-__v');
  next();
});

const cart = mongoose.model('carts', cartSchema);

module.exports = cart;
