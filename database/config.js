const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGODB_CNN);
    // console.log(con.connection);
    console.log('DB Online!');
  } catch (error) {
    console.log(error);
    throw new Error('Error initiating DB');
  }
};

module.exports = {
  dbConnection,
};
