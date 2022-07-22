require('dotenv').config({ path: './src/config/.env.development' });
const app = require('./src/app.js');
const db = require('./src/config/mongoosedb.js');

//NOTE: connect to database
db.connect();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is listening at http://localhost:${PORT}`);
});
