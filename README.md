# shop
shop bán hàng được viết bằng NodeJS, Express, MongoDB và Vuejs

+ front-end
- sử dụng framework vuejs(vue3)
- sử dụng các library vuex, vue-router,axios,formkit,fortawesome,bootstrap



+ back-end
- sử dụng framework nodejs, express
- sử dụng các library bcrypt,cookie-parser,cors,dotenv,jsonwebtoken,mongoose



+ tính năng chính
- login,register, authorization bằng accessToken, refreshToken
- lấy accessToken bằng refreshToken mỗi khi accessToken hết hạn
- create,read,update,delete giỏ hàng và được lưu vào database của account
- create,read,update,delete địa chỉ của account
- tạo đơn hàng từ các sản phẩm trong giỏi hàng
- quản lý các đơn hàng
- chọn sản phẩm theo loại
