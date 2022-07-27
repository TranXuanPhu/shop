const productRouter = require('./productRouter.js');
const viewRouter = require('./viewRouter.js');
const accountRouter = require('./accountRouter.js');
function route(app) {
  app.use('/api', viewRouter);
  app.use('/api/products', productRouter);
  app.use('/api/account', accountRouter);
}

module.exports = route;
