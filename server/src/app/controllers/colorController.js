const fs = require('fs');
const colorModel = require('../../models/product/colorModel.js');
const sizeModel = require('../../models/product/sizeModel.js');

exports.createColor = async (name, idImage, idSizes) => {
  try {
    const color = await colorModel.create({
      name,
      image: idImage,
      sizes: idSizes,
    });

    return color;
  } catch (error) {
    console.error('createColor:', error);
  }

  return null;
};

exports.updateSize = async (idColor, sizeName, quantity) => {
  try {
    const color = await colorModel.findById(idColor);
    const size = color.sizes.find((size) => size.name === sizeName);
    if (!size) return false;
    await sizeModel.findByIdAndUpdate(size._id, {
      quantity: size.quantity - quantity,
    });
    return true;
  } catch (error) {
    console.error('updateSize:', error);
  }
  return false;
};
