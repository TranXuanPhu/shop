const userModel = require('../../../models/user/userModel.js');
const addressModel = require('../../../models/user/addressModel.js');

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
    const userAfterUpdate = await userModel
      .findById(req.user._id)
      .populate({ path: 'addresses' })
      .select('-_id -refreshToken -cart -wishListId');
    if (!userAfterUpdate) return res.status(404).send('Không tìm thấy user.');
    console.log(userAfterUpdate);
    return res.status(201).json({ loggedUser: userAfterUpdate });
  } catch (error) {
    console.log('newAddressInUser:', error);
    return res.status(404).send('có lỗi');
  }
  next();
};
