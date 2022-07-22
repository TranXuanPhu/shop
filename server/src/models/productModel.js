const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      slug: 'name',
      unique: true,
    },
    vendor: {
      type: String,
      default: 'Khác',
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    style: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    colors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'colors',
      },
    ],
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'images',
      },
    ],
  },
  {
    timestamps: true,
  }
);

//middleware always find colors
productSchema.pre(/^find/, function (next) {
  if (this.options._recursed) {
    return next();
  }
  this.populate({
    path: 'colors',
    populate: {
      path: 'image sizes',
    },
    options: { _recursed: true },
  });
  this.populate({
    path: 'images',
  });

  this.select('-__v');
  next();
});

const product = mongoose.model('products', productSchema);
module.exports = product;
