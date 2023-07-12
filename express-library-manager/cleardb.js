const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost/library';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // Connected successfully, now drop the entire database
    return mongoose.connection.db.dropDatabase();
  })
  .then(() => {
    console.log("Database cleared successfully.");
    // Close the connection after the operation is complete
    return mongoose.connection.close();
  })
  .then(() => {
    console.log("Database connection closed.");
  })
  .catch((err) => {
    console.error("Error clearing database:", err);
  });
