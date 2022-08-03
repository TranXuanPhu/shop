const productModel = require('../../models/product/productModel.js');

exports.getOverView = async (req, res, next) => {
  console.log('getOverView: get all products');
  try {
    const allProducts = await productModel.find({});
    console.log('getOverView: done!!');
    res.status(200).json({ products: allProducts });
  } catch (error) {
    console.error('getOverView', error);
    res.status(404).send(error);
  }
};
exports.getCollectionByType = async (req, res, next) => {
  try {
    const allProducts = await productModel.find({ style: req.params.style });
    console.log('getCollectionByType: done!!');
    res.status(200).json({ products: allProducts });
  } catch (error) {
    console.error('getCollectionByType', error);
    res.status(404).send(error);
  }
};
