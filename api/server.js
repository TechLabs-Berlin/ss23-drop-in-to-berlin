const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const getRandomImage = require('./util/getRandomImage');

const app = express();

app.use(express.json());
app.use(cors());


(async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/dib_data');
    console.log('Connection open from server.js');
    
    const Restaurant = require('./models/restDbModel');


    //fetch restaurants with optional queries of rating, price and limit
    app.get('/restaurants', async (req, res) => {
      try {
        const rating = parseFloat(req.query.rating, 10) || 1; //default min rating: 1
        const priceLevel = parseInt(req.query.price, 10) || 4; // default price: 4
        const limit = parseInt(req.query.limit, 10) || 8; //default limit: 8

        // Check if rating is valid
        if (!isNaN(rating, limit, priceLevel)) {
          // use query in query string to find restaurant
          const restaurants = await Restaurant.aggregate([
            {
              $match: {
                rating: { $gte: rating },
                price_level: { $lte: priceLevel }
              }
            },
            {
              $sample: { size: limit }
            }
          ]);
          res.json(restaurants);
        } else {
          res.status(400).json({ message: 'Invalid query parameters' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });

    // fetch restaurant with specific id
    app.get('/restaurants/:id', async (req, res) => {
      try {
        const restaurant = await Restaurant.findOne({ reference: req.params.id });
    
        if (!restaurant) {
          return res.status(404).json({ message: 'Restaurant not found' });
        }
    
        res.json(restaurant);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });

    // fetch suggestions from the query search term
    app.get('/suggestions', async (req, res) => {
      const searchTerm = req.query.term
      try {
        const suggestions = await Restaurant.find({name : { $regex: searchTerm, $options: 'i' }}).limit(5); //case insenstitive because of i
        res.json(suggestions) 
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });
    


// Add new review to a restaurant

app.post('/api/reviews', async (req, res) => {
  try {
    const { reference, reviewText, authorName, userRating } = req.body; // Assuming you send the restaurantId and newReview in the request body

    const restaurant = await Restaurant.findOne(reference);
    console.log('found the restaurant')

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const newReview = {
      author_name: authorName,
      text: reviewText,
      rating : userRating,
      profile_photo_url: getRandomImage(), // Generate a random profile photo URL
    };

    // Add the new review to the reviews array
    restaurant.reviews.unshift(newReview);

    // Save the updated restaurant document
    await restaurant.save();

    res.status(201).json({ message: 'Review added successfully' });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});






    app.post('/restaurant/:id/review/new', (req, res) => {
      const restaurant = new Restaurant({
        text: req.body.text,
      });

      restaurant.save();

      res.json(restaurant);
    });





    app.listen(3001, () => {
      console.log('Server is running on port 3001');
    });
  } catch (error) {
    console.error('Error connecting to the database from server.js:', error);
  }
})();
