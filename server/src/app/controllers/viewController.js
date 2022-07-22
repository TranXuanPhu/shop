const productModel = require('../../models/productModel.js');

exports.getOverView = async (req, res, next) => {
  try {
    const allProducts = await productModel.find({});
    res.status(200).json({ products: allProducts });
  } catch (error) {
    console.error('getOverView', error);
    res.status(404).send(error);
  }
};
