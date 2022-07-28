const mongoose = require('mongoose');
const userModel = require('../../../models/user/userModel.js');
const addressModel = require('../../../models/user/addressModel.js');
const addressController = require('./addressController.js');

const getUserAfterUpdate = async (idUser) => {
  return await userModel
    .findById(idUser)
    // .populate({ path: 'addresses' })
    .select('-_id -refreshToken -cartId -wishListId');
};

exports.updateRefreshToken = async (userName, refreshToken) => {
  try {
    const user = await userModel.findOneAndUpdate(
      { userName },
      { refreshToken }
    );
    return refreshToken;
  } catch (error) {
    console.error('updateRefreshToken:', error);
  }
  return nul;
};

exports.newAddressInUser = async (req, res, next) => {
  console.log('newAddressInUser:', req.body);
  try {
    // chưa có địa chỉ thì tạo mới là default
    // gửi dữ liệu lên chọn làm default thì phải find, set lại
    const _idAddressDefault = await addressController.getIdAddressDefault(
      req.user._id
    );
    console.log('_idAddressDefault:', _idAddressDefault);
    if (_idAddressDefault === 0) req.body.default = true;
    // đã có đc default, kt gưi lên có chọn default ko, = true thì update lại
    else if (req.body.default)
      await addressModel.findByIdAndUpdate(_idAddressDefault, {
        default: false,
      });

    const address = await addressModel.create(req.body);
    let addresses = req.user.addresses || [];

    addresses.push(address._id);
    await userModel.updateOne(
      { userName: req.user.userName },
      {
        $set: {
          addresses,
        },
      }
      //{ upsert: true } không tìm thấy sẽ create user
    );
    const userAfterUpdate = await getUserAfterUpdate(req.user._id);
    if (!userAfterUpdate) return res.status(404).send('Không tìm thấy user.');
    console.log(userAfterUpdate);
    return res.status(201).json({ loggedUser: userAfterUpdate });
  } catch (error) {
    console.log('newAddressInUser:', error);
    return res.status(404).send('có lỗi');
  }
  next();
};
exports.updateAddress = async (req, res, next) => {
  console.log('updateAddress:', req.body);
  try {
    console.log('_idAddress', req.body._id);

    if (req.body.default) {
      const _idAddressDefault = await addressController.getIdAddressDefault(
        req.user._id
      );
      console.log('_idAddressDefault', _idAddressDefault);
      if (req.body._id != _idAddressDefault && _idAddressDefault != 0) {
        await addressModel.findByIdAndUpdate(_idAddressDefault, {
          default: false,
        });
      }
    }
    //update
    const _idAddress = mongoose.Types.ObjectId(req.body._id);
    const dataUpdate = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      company: req.body.company,
      address: req.body.address,
      province: req.body.province,
      country: req.body.country,
      phone: req.body.phone,
      default: req.body.default,
    };
    await addressModel.findByIdAndUpdate(_idAddress, dataUpdate);

    const userAfterUpdate = await getUserAfterUpdate(req.user._id);
    if (!userAfterUpdate) return res.status(404).send('Không tìm thấy user.');
    // console.log(userAfterUpdate);
    return res.status(201).json({ loggedUser: userAfterUpdate });
  } catch (error) {
    console.log('updateAddress:', error);
    return res.status(404).send('có lỗi');
  }
  next();
};
exports.deleteAddress = async (req, res, next) => {
  try {
    console.log('deleteAddress id:', req.body);
    if (!mongoose.isValidObjectId(req.body._id))
      return res.status(404).send('id address không phải là objectId');

    await addressModel.findByIdAndRemove(req.body._id);
    const userAfterUpdate = await getUserAfterUpdate(req.user._id);
    return res.status(200).json({ loggedUser: userAfterUpdate });
  } catch (error) {
    console.log('deleteAddress:', error);
    return res.status(404).send('Không tìm thấy id addresses hoặc có lỗi.');
  }
  next();
};

exports.updateCartId = async (idUser, idCart) => {
  return await userModel.findByIdAndUpdate(idUser, { cartId: idCart });
};
