const mongoose = require('mongoose');
const cartModel = require('../../../models/cart/cartModel.js');
const itemCartModel = require('../../../models/cart/itemCartModel.js');
const userModel = require('../../../models/user/userModel.js');
const userController = require('./userController.js');

const updateItemByIdProduct = async (idCart, idProduct, quantity) => {
  try {
    const items = await cartModel
      .findById(idCart)
      .populate({ path: 'itemCarts' });

    for (const item of items) {
      if (item.productId === idProduct) {
      }
    }
  } catch (error) {
    console.error('getIdItemByIdProduct', error);
    return false;
  }
};
const updateItem = async (idItem, quantity) => {
  return await itemCartModel.findByIdAndUpdate(idItem, { quantity });
};

exports.addItemToCart = async (req, res, next) => {
  try {
    //kiểm tra productId đã có add vào cart chưa
    // có rồi thì lấy ra thêm quantity
    let user = await userModel.findById('62e2cb900ae1904a29a00122'); //req.user;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    //chưa tạo cart
    if (!mongoose.isValidObjectId(user?.cartId)) {
      //create a new itemcart
      const item = await itemCartModel.create({ productId, quantity });
      console.log('create itemCartModel', item);
      const items = [item._id];
      //tạo mới cartModel, add item vào cartModel
      let cart = await cartModel.create({ items: items });

      // update ở user
      user = await userController.updateCartId(user._id, cart._id);
    }
    // đã có cartId thì kiểm tra productId để tạo mới hoặc thêm quantity
    else {
      const items = await cartModel
        .findById(req.user.cartId)
        .populate({ path: 'itemCarts' });
      const idExists = false;
      let idItem = null;
      for (const item of items) {
        if (item.productId.toString() === productId) {
          idItem = item._id;
          idExists = true;
          break;
        }
      }
      //tồn tại
      if (idExists) await updateItem(idItem, quantity);
      //không tòn tại thì tạo mới itemCartModel, thêm vào cartModel
      else {
        const item = await itemCartModel.create({ productId, quantity });
        let cart = await cartModel.findByIdAndUpdate(use.cartId, {
          $push: { items: item },
        });
      }
    }

    // let cart = await cartModel.findById(req.user.cartId);
    // let user = req.user;
    // // chưa tạo cart thì phải tạo rồi mới thêm mới được
    // if (!cart) {

    //   user = userController.updateCartId(user._id, cart._id);
    // }
    return res.status(201).send('Thêm vào giỏ hàng thành công.');
  } catch (error) {
    console.log('addItemToCart:', error);
    return res.status(404).send('Không thể thêm vào giỏ hàng.');
  }

  next();
};
exports.getItems = async (req, res, next) => {
  next();
};
