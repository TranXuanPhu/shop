# shop
shop bán hàng được viết bằng NodeJS, Express, MongoDB và Vuejs

+ front-end
- sử dụng framework vuejs(vue3)
- sử dụng các library vuex, vue-router,axios,formkit,fortawesome,bootstrap



+ back-end
- sử dụng framework nodejs, express
- sử dụng các library bcrypt,cookie-parser,cors,dotenv,jsonwebtoken,multer,mongoose



+ tính năng chính
- login,register, authorization bằng accessToken, refreshToken
- lấy accessToken bằng refreshToken mỗi khi accessToken hết hạn
- create sản phẩm và lưu hình ảnh sản phẩm vào database bằng multer 
- create,read,update,delete giỏ hàng và được lưu vào database của account
- create,read,update,delete địa chỉ của account
- create đơn hàng từ các sản phẩm trong giỏi hàng
- quản lý các đơn hàng
- chọn sản phẩm theo loại
