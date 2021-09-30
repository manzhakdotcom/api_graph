const mongoose = require('mongoose');

const db = {
  connect: (DB_HOST) => {
    mongoose.connect(DB_HOST);
    mongoose.connection.on('error', (err) => {
      console.error(err);
      console.log(
        `MongoDB connection error. Please make sure MongoDB is running.`.red
          .underline
      );
      process.exit();
    });
    mongoose.connection.once('open', () =>
      console.log(`MongoDB Connected: ${DB_HOST}.`.cyan.underline)
    );
  },
  close: () => {
    mongoose.connection.close();
  },
};

module.exports = db;
