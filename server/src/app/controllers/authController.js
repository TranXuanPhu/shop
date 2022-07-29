const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const userModel = require('../../models/user/userModel.js');
const userController = require('./user/userController.js');
const cartController = require('./user/cartController.js');

const decodeToken = async (token, secretKey) => {
  return await promisify(jwt.verify)(token, secretKey);
};

const generateAccessToken = ({ userName }) => {
  return jwt.sign({ userName }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//refresh token: token het han thi lay lai
const generateRefreshToken = ({ userName }) => {
  console.log('generating refresh token - userName:', userName);
  return jwt.sign({ userName }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });
};
const createSendToken = async (
  { fullName, userName, email, role, addresses, cartId },
  refreshToken,
  statusCode,
  req,
  res
) => {
  const accessToken = generateAccessToken({ userName });
  // const refreshToken = generateRefreshToken({ userName });
  if (!accessToken || !refreshToken) {
    res
      .status(400)
      .send('Tạo access token không thành công, vui lòng thử lại.');
    return;
  }

  // const totalItemsCart = await cartController.getTotalItems(cartId);

  res.status(statusCode).json({
    status: 'success',
    user: {
      loggedInUser: {
        fullName,
        userName,
        email,
        role,
        addresses,
        // totalItemsCart,
      },
      accessToken,
      refreshToken,
    },
  });
};
exports.register = async (req, res, next) => {
  console.log('register: ', req.body);
  try {
    const refreshToken = generateRefreshToken(req.body.userName);
    const user = await userModel.create({
      fullName: req.body.fullName,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      refreshToken,
    });

    console.log('register - user: ', user);
    res.status(201).json({ message: 'Đăng ký tài khoản thành công.' });
  } catch (error) {
    console.log('register - error: ', error);
    res.status(400).send({ message: error.message });
  }
  next();
};
exports.login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    console.log('userName', req.body);
    const userNameLower = userName.toLowerCase();
    const user = await userModel
      .findOne({
        $or: [{ email: userNameLower }, { userName: userNameLower }],
      })
      .select('+password')
      .populate({ path: 'addresses' })
      .exec();

    if (user) {
      console.log('login -', user);

      //login okie

      if (await user.correctPassword(password, user.password)) {
        //chưa có refresh token trong data thì tạo mới
        let refreshToken;
        if (!user.refreshToken) {
          refreshToken = generateRefreshToken(user);
          userController.updateRefreshToken(userName, refreshToken);
        } else refreshToken = user.refreshToken;
        console.log('user.refreshToken:', refreshToken);
        await createSendToken(user, refreshToken, 201, req, res);
      }
      //
      else res.status(401).send({ password: 'Nhập mật khẩu không chính xác.' });
    } else
      res
        .status(401)
        .send({ userName: 'Không tìm thấy tên tài khoản đã đăng ký.' });
  } catch (error) {
    console.error('exports.login: ', error);
    res.status(401).send({ message: 'Không thể xác thực, hãy thử lại.' });
  }

  next();
};

exports.isAuth = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    //console.log('access token:', token);
    try {
      const decoded = await decodeToken(token, process.env.JWT_SECRET);
      const user = await userModel.findOne({ userName: decoded.userName });
      if (!user) {
        return res
          .status(401)
          .json({ error: true, message: 'Tài khoản không tồn tại.' });
      }
      req.user = user;
      //  console.log('decoded', decoded);
    } catch (error) {
      console.log('isAuth - error:', error);
      return res
        .status(401)
        .send('Bạn không có quyền truy cập vào tính năng này!');
    }
  } else return res.status(401).send('Không tìm thấy access token!');

  next();
};
exports.refreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;
  console.log('refreshToken', refreshToken);
  if (!refreshToken) {
    return res.status(401).send('Không tìm thấy refresh token!');
  }
  try {
    const decoded = await decodeToken(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );
    console.log('decoded', decoded);
    const user = await userModel.findOne({ userName: decoded.userName });
    if (!user) {
      return res
        .status(401)
        .send('Tài khoản không tồn tại, hãy đăng nhập lại!');
    }
    //check refresh token in user database
    if (user.refreshToken !== refreshToken) {
      return res
        .status(401)
        .send('refreshToken không tồn tại, hãy đăng nhập lại!');
    }
    console.log('refreshToken: lấy accesstoken thành công!');
    // create access token
    await createSendToken(user, refreshToken, 200, req, res);
  } catch (error) {
    console.log('refreshToken - error:', error);
    return res
      .status(401)
      .send(
        'refresh token không đúng cấu trúc hoặc hết hạn, hãy đăng nhập lại!'
      );
  }

  next();
};
