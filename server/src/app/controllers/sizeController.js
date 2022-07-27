const fs = require('fs');
const sizeModel = require('../../models/product/sizeModel.js');

exports.createSize = async (name, quantity) => {
  try {
    const size = await sizeModel.create({ name, quantity });

    return size;
  } catch (error) {
    console.error('createSize:', error);
  }

  return null;
};
