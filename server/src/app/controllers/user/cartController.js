const mongoose = require('mongoose');
const cartModel = require('../../../models/cart/cartModel.js');
const userModel = require('../../../models/user/userModel.js');
const productModel = require('../../../models/product/productModel.js');
const getTotalItems = async (cartId) => {
  const cart = await cartModel.findById(cartId);
  if (!cart) return 0;
  return cart.items.reduce(
    (prevItem, currentItem) => prevItem + currentItem.quantity,
    0
  );
};
const updateItem = async (cartId, productId, size, quantity) => {
  try {
    let cart = await cartModel.findById(cartId);

    let itemExists = null; //await existsItemInCart(user.cartId, productId);
    for (const item of cart.items) {
      if (item.productId?._id.toString() === productId && item.size === size) {
        item.quantity = Number(item.quantity) + Number(quantity);
        itemExists = item;
        break;
      }
    }

    // chưa có productId thì đẩy vào
    if (!itemExists) {
      cart.items.push({
        productId: mongoose.Types.ObjectId(productId),
        quantity: Number(quantity),
        size,
      });
    }
    await cart.save();
  } catch (error) {
    console.error('updateItem:', error);
  }
};

exports.addItemToCart = async (req, res, next) => {
  try {
    //kiểm tra productId đã có add vào cart chưa
    // có rồi thì lấy ra thêm quantity
    let user = await userModel.findById('62e3b2e863d4c6e315005136'); // req.user;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    const size = req.body.size;

    //kiểm tra idproduct gửi lên có tồn tại không
    const checkProduct = await productModel.findById(productId);
    if (!checkProduct)
      return res
        .status(404)
        .send('sản phẩm này đã không tồn tại, xin hãy chọn sản phẩm khác.');

    //chưa tạo cart
    if (!user.cartId) {
      //create cart
      let cart = await cartModel.create({
        items: [
          {
            productId: mongoose.Types.ObjectId(productId),
            quantity: Number(quantity),
            size,
          },
        ],
      });
      // update ở user
      user.cartId = cart._id;
      user = await user.save();
    }
    // đã có cartId thì kiểm tra productId để tạo mới hoặc thêm quantity
    //mongoose.isValidObjectId()
    else await updateItem(user.cartId, productId, size, quantity);

    user = await userModel.findById(user._id);
    const totals = await getTotalItems(user.cartId);
    return res.status(201).json({
      message: 'Thêm vào giỏ hàng thành công.',
      user: user,
      totalItemsCart: totals,
    });
  } catch (error) {
    console.log('addItemToCart:', error);
    return res.status(404).send('Không thể thêm vào giỏ hàng.');
  }

  next();
};

exports.getItems = async (req, res, next) => {
  next();
};
