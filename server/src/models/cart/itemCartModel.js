const mongoose = require('mongoose');
const itemCartSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity can not be lesser than one'],
    },
  },
  {
    timestamps: true,
  }
);

//middleware always find itemCarts
itemCartSchema.pre(/^find/, function (next) {
  if (this.options._recursed) {
    return next();
  }
  this.populate({ path: 'products', options: { _recursed: true } });
  this.select('-__v');
  next();
});

const itemCart = mongoose.model('itemCarts', itemCartSchema);

module.exports = itemCart;
