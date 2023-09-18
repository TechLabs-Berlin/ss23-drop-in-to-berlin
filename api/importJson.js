const fs = require('fs');
const mongoose = require('mongoose');
const Restaurant = require('./restDbModel'); // Import your Mongoose model

fs.readFile('../dib/src/data/new_data.json', 'utf8', async (err, data) => {
  if (err) {
    console.error('Error reading JSON file:', err);
    return;
  }

  const jsonData = JSON.parse(data);

  try {

    for (const restaurantData of jsonData.restaurants) {
      // Create a new Restaurant document for each restaurant
      const restaurant = new Restaurant(restaurantData);
      await restaurant.save();
    }
    console.log('Data inserted into MongoDB successfully.');
  } catch (error) {
    console.error('Error inserting data into MongoDB:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
});
