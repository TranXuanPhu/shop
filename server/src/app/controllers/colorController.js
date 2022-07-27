const fs = require('fs');
const colorModel = require('../../models/product/colorModel.js');

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
