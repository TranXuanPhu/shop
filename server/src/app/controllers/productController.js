const fs = require('fs');
const productModel = require('../../models/productModel.js');
const imageController = require('./imageController.js');
const sizeController = require('./sizeController.js');
const colorController = require('./colorController.js');

//create size
//trả về array id trong sizes
const createSizes = async (req) => {
  //create size
  const idSizes = [];
  const nameSizes = req.body.sizes.split(',');
  for (const sizeTmp of nameSizes) {
    const size = await sizeController.createSize(sizeTmp, req.body.quantity);
    if (!size) {
      console.log('createProduct ERROR: create size');
      return null;
    }
    idSizes.push(size._id);
  }

  return idSizes;
};

exports.createProduct = async (req, res, next) => {
  //create images
  //trả về array id trong images
  const idImages = await imageController.createImages(req);
  console.log('createProduct: idImages', idImages);

  //trả về array id trong size
  const idSizes = await createSizes(req);
  console.log('createProduct: idSizes', idSizes);

  //create colors
  const idColors = [];
  const nameColors = req.body.colors.split(',');
  let idxImage = 0;
  for (const nameColor of nameColors) {
    const color = await colorController.createColor(
      nameColor,
      idImages[idxImage],
      idSizes
    );
    if (!color) {
      console.log('createProduct ERROR: create color');
      return null;
    }
    idColors.push(color._id);
    idxImage++;
  }
  console.log('createProduct: idColors', idColors);

  //create products
  //số lượng id image còn lại được đưa vào field images của products
  const images = [];
  if (idColors.length < idImages.length) {
    for (let i = idColors.length; i < idImages.length; i++) {
      images.push(idImages[i]);
    }
  }
  const { name, description, vendor, price, type, style } = req.body;
  productModel
    .create({
      name: name.toUpperCase(),
      description,
      vendor,
      price,
      type,
      style,
      colors: idColors,
      images,
    })
    .then((product) => {
      console.log(product);
      res.status(201).json({ message: 'success', product });
    })
    .catch((err) => {
      console.error('ERROR -------------- exports.createProduct: ', err);
      res.status(400).json({ message: 'fail' });
    });
};

exports.getProducts = async (req, res, next) => {
  try {
    console.log('getProducts');
    const products = await productModel.find({});
    res.json({ products });
  } catch (error) {
    console.error('getProducts', error);
    res.status(400).json({ error });
  }
};

exports.getProductBySlug = async (req, res, next) => {
  try {
    const product = await productModel.findOne({ slug: req.params.slug });
    res.status(200).json({ product });
  } catch (error) {
    console.log('getProductBySlug:', error);
  }
};
