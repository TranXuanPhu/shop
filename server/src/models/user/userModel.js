const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  fullName: { type: 'string', required: true },
  userName: { type: 'string', required: true, unique: true },
  email: { type: 'string', required: true, unique: true, lowercase: true },
  password: { type: 'string', required: true, minlength: 8, select: false },
  role: { type: String, required: true, default: 'user' },
  refreshToken: { type: 'string', required: true },
  addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'addresses' }],
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'carts',
  },
  wishListId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'wishLists',
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },

  passwordChangedAt: { type: Date },
});

//function middleware pre
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.pre(/^find/, function (next) {
  // if (this.options._recursed) {
  //   return next();
  // }
  this.find({ active: { $ne: false } })
    // .populate({ path: 'addresses' }, { addresses: { $exists: true } })
    .select('-__v');

  next();
});

//methods
userSchema.methods.correctPassword = async (password, passwordHash) => {
  return await bcrypt.compare(password, passwordHash);
};

const user = mongoose.model('users', userSchema);

module.exports = user;
