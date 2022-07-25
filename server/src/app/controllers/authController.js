const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const userModel = require('../../models/userModel.js');

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
  return jwt.sign({ userName }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });
};
const createSendToken = (
  { fullName, userName, email, role },
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
  res.status(statusCode).json({
    status: 'success',

    user: {
      loggedInUser: { fullName, userName, email, role },
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
      .exec();

    if (user) {
      console.log('login -', user);

      //login okie

      if (await user.correctPassword(password, user.password)) {
        //chưa có refresh token trong data thì tạo mới
        if (!user.refreshToken) {
          const refreshToken = generateRefreshToken(user);
          userController.updateRefreshToken(userName, refreshToken);
        }
        createSendToken(user, user.refreshToken, 201, req, res);
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
