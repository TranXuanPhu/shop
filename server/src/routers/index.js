const productRouter = require('./productRouter.js');
const viewRouter = require('./viewRouter.js');
const authRouter = require('./authRouter.js');
function route(app) {
  app.use('/api', viewRouter);
  app.use('/api/products', productRouter);
  app.use('/api/account', authRouter);
}

module.exports = route;
