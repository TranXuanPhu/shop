const mongoose = require('mongoose');
async function connect() {
  try {
    const uri = process.env.MONGO_URI.replace(
      '<PASSWORD>',
      process.env.MONGO_URI_PASSWORD
    );
    await mongoose.connect(uri);
    console.log('connect DB successfully ......');
  } catch (error) {
    console.error('connect DB error : ', error);
  }
}

module.exports = { connect };
