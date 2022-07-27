const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  firstName: { type: 'string', required: true },
  lastName: { type: 'string', required: true },
  company: { type: 'string', default: '' },
  province: { type: 'string', default: '' },
  country: { type: 'string', default: '' },
  address: { type: 'string', required: true },
  phone: { type: 'string', required: true },
  default: { type: 'boolean', default: false },
});

addressSchema.pre(/^find/, function (next) {
  this.select('-__v');

  next();
});

const address = mongoose.model('addresses', addressSchema);

module.exports = address;
