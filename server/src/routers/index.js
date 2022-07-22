const productRouter = require('./productRouter.js');
const viewRouter = require('./viewRouter.js');
function route(app) {
  app.use('/api/products', productRouter);
  app.use('/api', viewRouter);
  // app.use('/account', accountRouter);
}

module.exports = route;
