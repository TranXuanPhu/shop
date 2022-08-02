const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'itemOrders',
      },
    ],
  },
  { timestamps: true }
);

orderSchema.pre(/^find/, function (next) {
  if (this.options._recursed) {
    return next();
  }
  this.populate({
    path: 'items',
    populate: {
      path: 'productOrders.product',
      //select: 'name slug -color -images',
    },
    options: { _recursed: true },
  });

  this.populate({
    path: 'items',
    populate: {
      path: 'productOrders.color',
    },
    // select: 'image name -sizes',
    options: { _recursed: true },
  });

  this.select('-__v');
  next();
});

const order = mongoose.model('orders', orderSchema);

module.exports = order;
