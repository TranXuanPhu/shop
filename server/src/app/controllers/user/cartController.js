const mongoose = require('mongoose');
const cartModel = require('../../../models/cart/cartModel.js');
const userModel = require('../../../models/user/userModel.js');
const productModel = require('../../../models/product/productModel.js');
const colorModel = require('../../../models/product/colorModel.js');

//const productController = require('../productController.js')

const isInventoryProduct = async (cart, itemId, quantity) => {
  const item = cart.items.find((item) => item._id.toString() === itemId);
  if (!item) return false;
  const color = await colorModel.findById(item.color._id);
  if (!color) return false;
  const size = color.sizes.find((size) => size.name === item.size);
  if (!size) return false;
  return size.quantity >= quantity;
};
const deleteItemById = async (cart, itemId) => {
  try {
    // const index = cart.items.findIndex(item => item._id.toString() === itemId)
    const items = cart.items.filter((item) => item._id.toString() !== itemId);
    cart.items = items;
    return await cart.save();
  } catch (error) {
    console.error('updateItemById:', error);
    return null;
  }
};

const updateItem_Increment = async (
  cart,
  productId,
  colorId,
  sizeName,
  quantity
) => {
  try {
    // let cart = await cartModel.findById(cartId);
    let itemExists = null; //await existsItemInCart(user.cartId, productId);
    for (const item of cart.items) {
      if (
        item.product?._id.toString() === productId &&
        item.color?._id.toString() === colorId &&
        item.size === sizeName
      ) {
        item.quantity = Number(item.quantity) + Number(quantity);
        itemExists = item;
        break;
      }
    }

    // chưa có productId thì đẩy vào
    if (!itemExists) {
      cart.items.push({
        product: mongoose.Types.ObjectId(productId),
        color: mongoose.Types.ObjectId(colorId),
        quantity: Number(quantity),
        size: sizeName,
      });
    }
    await cart.save();
  } catch (error) {
    console.error('updateItem:', error);
  }
};
//objectId: item in array items
const updateItemById = async (cart, itemId, quantity) => {
  try {
    for (const item of cart.items) {
      if (item._id.toString() === itemId) {
        item.quantity = Number(quantity);
        break;
      }
    }

    return await cart.save();
  } catch (error) {
    console.error('updateItemById:', error);
    return null;
  }
};

exports.addItemToCart = async (req, res, next) => {
  try {
    //kiểm tra productId đã có add vào cart chưa
    // có rồi thì lấy ra thêm quantity
    let user = req.user; //await userModel.findById('62e5611673d2d8ef981e6ef7'); // req.user;
    const productId = req.body.productId;
    const sizeName = req.body.sizeName;
    const colorId = req.body.colorId;
    const quantity = req.body.quantity;

    //kiểm tra product, size,color gửi lên có tồn tại không
    const product = await productModel.findById(productId);
    if (!product)
      return res
        .status(404)
        .send('sản phẩm này đã không tồn tại, xin hãy chọn sản phẩm khác.');
    const color = await colorModel.findById(colorId);
    if (!color)
      return res.status(404).send('mẫu sản phẩm này hiện tạm ngưng sản xuất.');

    // số lượng tồn khô >= số lượng thêm
    const sizeSelected = color.sizes.find(
      (size) => size.name === sizeName && size.quantity >= quantity
    );
    if (!sizeSelected)
      return res
        .status(404)
        .send(
          'size của sản phẩm này đã vượt quá tồn kho, xin hãy chọn sản phẩm khác.'
        );

    //chưa tạo cart, hoặc đã xóa, không tìm thấy thì tạo mới, update
    let cart = await cartModel.findById(user.cartId);
    if (!cart) {
      //create cart
      cart = await cartModel.create({
        items: [
          {
            product: mongoose.Types.ObjectId(productId),
            color: mongoose.Types.ObjectId(colorId),
            quantity: Number(quantity),
            size: sizeName,
          },
        ],
      });
      // update ở user
      user.cartId = cart._id;
      user = await user.save();
    }
    // đã có cartId thì kiểm tra productId để tạo mới hoặc thêm quantity
    //mongoose.isValidObjectId()
    else
      await updateItem_Increment(cart, productId, colorId, sizeName, quantity);

    cart = await cartModel.findById(cart._id);
    return res.status(201).json({
      message: 'Thêm vào giỏ hàng thành công.',
      cart,
    });
  } catch (error) {
    console.log('addItemToCart:', error);
    return res.status(404).send('Không thể thêm vào giỏ hàng.');
  }

  next();
};

exports.getItemsInCart = async (req, res, next) => {
  try {
    let user = req.user; // await userModel.findById('62e5611673d2d8ef981e6ef7'); // req.user;
    const cart = await cartModel.findById(user?.cartId);
    if (!cart) return res.status(404).send('không tìm thấy giỏi hàng.');
    res.status(200).json({ cart });
  } catch (error) {
    console.log('getItemsInCart:', error);
    res.status(404).send('lấy giỏi hàng không thành công.');
  }
  next();
};
exports.updateItemsToCart = async (req, res, next) => {
  try {
    let user = req.user;
    const itemId = req.body.itemId;
    const quantity = req.body.quantity;
    let cart = await cartModel.findById(user?.cartId);
    if (!cart) return res.status(404).send('không tìm thấy giỏi hàng.');

    const isInventory = await isInventoryProduct(cart, itemId, quantity);
    //console.log('isInventoryProduct', isInventory);
    if (!isInventory)
      return res.status(404).send('sản phẩm đã vượt quá tồn kho.');

    //nếu client gửi lên quantity <= 0 thì xóa luôn
    if (quantity <= 0) cart = (await deleteItemById(cart, itemId)) || cart;
    else cart = (await updateItemById(cart, itemId, quantity)) || cart;
    res.status(200).json({ cart });
  } catch (error) {
    console.log('updateItemsToCart:', error);
    res.status(404).send('có lỗi xảy ra khi update item.');
  }
  next();
};
exports.deleteItemToCart = async (req, res, next) => {
  try {
    let user = req.user;
    const itemId = req.body.itemId;
    let cart = await cartModel.findById(user?.cartId);
    if (!cart) return res.status(404).send('không tìm thấy giỏi hàng.');
    cart = (await deleteItemById(cart, itemId)) || cart;
    res.status(200).json({ cart });
  } catch (error) {
    console.log('deleteItemToCart:', error);
    res.status(404).send('id item gửi lên không đúng hoặc đã xảy ra lỗi.');
  }
  next();
};
exports.emptyCart = async (cartId) => {
  try {
    let cart = await cartModel.findById(cartId);
    if (!cart) return res.status(404).send('không tìm thấy giỏi hàng.');

    cart.items = [];
    await cart.save();
    return true;
  } catch (error) {
    console.log('emptyCart:', error);
  }
  return false;
};
