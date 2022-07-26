const mongoose = require('mongoose');
const wishListSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  productsId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
    },
  ],
});

//middleware always find wishLists
wishListSchema.pre(/^find/, function (next) {
  if (this.options._recursed) {
    return next();
  }
  this.populate({ path: 'user products', options: { _recursed: true } });
  this.select('-__v');
  next();
});

const wishList = mongoose.model('wishLists', wishListSchema);

module.exports = color;
