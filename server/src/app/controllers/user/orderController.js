const mongoose = require('mongoose');
const ordersModel = require('../../../models/orders/ordersModel.js');
const itemOrderModel = require('../../../models/orders/itemOrderModel.js');
const productModel = require('../../../models/product/productModel.js');
const colorModel = require('../../../models/product/colorModel.js');
const userModel = require('../../../models/user/userModel.js');
const cartModel = require('../../../models/cart/cartModel.js');

const colorController = require('../colorController.js');

const cartController = require('./cartController.js');

const createItemOrder = async (req, res) => {
  try {
    let user = req.user; //await userModel.findById('62e8d879d6c198a182a89188');
    console.log('createItemOrder', user);

    const shippingMoney = req.body.shippingMoney;
    const fullName = req.body.fullName;
    const phone = req.body.phone;
    const address = req.body.address;
    const note = req.body.note;
    const productOrders = [];

    const cart = await cartModel.findById(user.cartId);
    if (!cart) {
      res.status(404).send('không tìm thấy giỏ hàng, hãy chọn sản phẩm.');
      return null;
    }

    for (const item of cart.items) {
      const color = await colorModel
        .findById(item.color._id)
        .select('sizes -image');

      // số lượng tồn khô >= số lượng order
      const size = color.sizes.find(
        (size) => size.name === item.size && size.quantity >= item.quantity
      );
      if (!size) {
        res.status(404).json({
          message: `size của sản phẩm ${item.product.name} đã vượt quá tồn kho, xin hãy chọn sản phẩm khác.`,
        });
        return null;
      }

      //push vào ds orders
      productOrders.push({
        product: item.product._id,
        color: item.color._id,
        size: item.size,
        quantity: item.quantity,

        //check giá có giảm mã không?, mặc định lấy giá của sản phẩm
        price: item.product.price,
      });
    } //for

    return await itemOrderModel.create({
      productOrders,
      shippingMoney,
      fullName,
      phone,
      address,
      note,
    });
  } catch (error) {
    console.log('createItemOrder:', error);
    res.status(404).send('có lỗi xảy ra khi tạo item order.');
    return null;
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    let user = req.user;
    const orders = await ordersModel.findById(user?.orders);
    res.status(200).json({ orders });
  } catch (error) {
    console.log('getOrder:', error);
    return res.status(404).send('Không thể lấy danh sách đơn hàng.');
  }
};
exports.getOrderById = async (req, res, next) => {
  try {
    let user = req.user;
    console.log('getOrderById', req.params);
    const order = await itemOrderModel.findById(req.params.id);
    res.status(200).json({ order });
  } catch (error) {
    console.log('getOrderById:', error);
    return res.status(404).send('Không thể lấy danh sách đơn hàng.');
  }
};
exports.createOder = async (req, res, next) => {
  try {
    let user = req.user; // await userModel.findById('62e8d879d6c198a182a89188'); //
    console.log('createOder', req.user);
    // create item order
    const itemOrder = await createItemOrder(req, res);
    if (!itemOrder) return;
    //tạo thành công => update quantity ở size
    const cart = await cartModel.findById(user.cartId);
    cart.items.forEach(async (item) => {
      await colorController.updateSize(
        item.color._id,
        item.size,
        item.quantity
      );
    });

    //chưa tạo ds orders
    let orders = await ordersModel.findById(user?.orders);
    if (!orders) {
      const orders = await ordersModel.create({ items: [itemOrder] });
      console.log('createOder - orders:', orders);
      user = await userModel.findByIdAndUpdate(
        user._id,
        { orders: orders._id },
        { new: true }
      );
    } else {
      console.log('createOder - orders', orders);
      orders.items.push(itemOrder._id);
      await orders.save();
    }

    //gửi về lại cho client
    //orders = await ordersModel.findById(user.orders);
    await cartController.emptyCart(user.cartId);
    //if (!isEmptyCart) return res.status(404).send('không thể empty giỏ hàng.');

    res.status(201).json({
      index: itemOrder.index, //mã đơn hàng
    });
  } catch (error) {
    console.log('createOder:', error);
    return res
      .status(404)
      .send('Không thể tạo đơn hàng, xin hãy kiểm tra lại.');
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const itemOrders = await itemOrderModel.find({});
    res.status(200).json({ itemOrders });
  } catch (error) {
    console.log('getAllOrders:', error);
    return res.status(404).send('Không thể lấy tát cả danh sách đơn hàng.');
  }
};
