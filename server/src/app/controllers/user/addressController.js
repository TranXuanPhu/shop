const addressModel = require('../../../models/user/addressModel.js');
const userModel = require('../../../models/user/userModel.js');

exports.getIdAddressDefault = async (idUser) => {
  try {
    const user = await userModel.findById(idUser);
    if (!user) return 0;
    const addresses = await addressModel.find({ _id: { $in: user.addresses } });
    // console.log('getIdAddressDefault:', addresses);
    for (const address of addresses) {
      if (address.default) return address._id;
    }
    return 0;
  } catch (error) {
    console.log('getIdAddressDefault:', error);
  }
  return 0;
};
