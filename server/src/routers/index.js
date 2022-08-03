const productRouter = require('./productRouter.js');
const viewRouter = require('./viewRouter.js');
const collectionsRouter = require('./collectionsRouter.js');
const accountRouter = require('./accountRouter.js');
const managerRouter = require('./managerRouter.js');
function route(app) {
  app.use('/api', viewRouter);
  app.use('/api/collections', collectionsRouter);
  app.use('/api/products', productRouter);
  app.use('/api/account', accountRouter);
  app.use('/api/manager', managerRouter);
}

module.exports = route;
