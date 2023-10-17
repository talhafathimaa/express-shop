const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({ path: './config.env' });

const port = process.env.PORT;
const database = process.env.DATABASE;

mongoose
  .connect(database, {
    useNewUrlParser: true,
  })
  .then((connnection) => {
    console.log(connnection.connections);
    console.log('DB connected');
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
