const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const itemOrderSchema = new mongoose.Schema(
  {
    index: { type: Number },
    productOrders: [
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
        price: {
          type: Number,
          required: true,
          default: 0,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, 'Quantity can not be lesser than one'],
        },
      },
    ],
    shippingMoney: {
      type: Number,
      default: 0,
    },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    note: { type: String },
    // trạng thái thanh toán
    paymentStatus: {
      type: String,
      enum: [
        'pending',
        'authorized',
        'overdue',
        'expiring',
        'expired',
        'paid',
        'refunded',
        'partially-refunded',
        'partially-paid',
        'voided',
        'unpaid',
      ],
      default: 'pending', //chưa thanh toán
    },
    shippingStatus: {
      type: String,
      enum: ['pending', 'Shipped '],
      default: 'pending',
    },

    completed: { type: Boolean, default: false },
    totalMoney: { type: Number, default: 0 },
  },
  { timestamps: true }
);
itemOrderSchema.plugin(AutoIncrement, { inc_field: 'index' });

itemOrderSchema.pre('save', async function (next) {
  this.totalMoney = this.productOrders.reduce(
    (prevItem, currentItem) =>
      prevItem + currentItem.price * currentItem.quantity,
    0
  );
  next();
});
itemOrderSchema.pre(/^find/, function (next) {
  this.select('-__v');
  next();
});

itemOrderSchema.pre(/^find/, function (next) {
  if (this.options._recursed) {
    return next();
  }
  this.populate({
    path: 'productOrders.product',
    select: 'name slug',

    options: { _recursed: true },
  });
  this.populate({
    path: 'productOrders.color',
    populate: {
      path: 'image',
    },
    options: { _recursed: true },
  });
  next();
});
const itemOrder = mongoose.model('itemOrders', itemOrderSchema);

module.exports = itemOrder;
