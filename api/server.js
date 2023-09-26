const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const generateRandomUserImageURL = require('./util/getRandomImage');

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
                price_level: { $lte: priceLevel },
              },
            },
            {
              $sample: { size: limit },
            },
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
        const restaurant = await Restaurant.findById(req.params.id);

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
      const searchTerm = req.query.term;
      try {
        const suggestions = await Restaurant.find({
          name: { $regex: searchTerm, $options: 'i' },
        }).limit(4); //case insenstitive because of i
        res.json(suggestions);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });

    // Fetch reviews of specific restaurant
    app.get('/api/restaurants/:id/reviews', async (req, res) => {
      try {
        const restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant) {
          return res.status(404).json({ message: 'Restaurant not found' });
        }

        const reviews = restaurant.reviews
        res.json(reviews);

      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });



    // Add new review to a restaurant
    app.post('/api/restaurants/:id/new-review', async (req, res) => {
      try {
        const { _id, reviewText, authorName, userRating, added_review } =
          req.body; // Assuming you send the restaurantId and newReview in the request body
        console.log('request to add a new review:', req.body);
        const restaurant = await Restaurant.findById(_id);
        console.log('found the restaurant');

        if (!restaurant) {
          return res.status(404).json({ message: 'Restaurant not found' });
        }

        const newReview = {
          author_name: authorName,
          text: reviewText,
          rating: userRating,
          added_review: added_review,
          profile_photo_url: generateRandomUserImageURL(), // Generate a random profile photo URL
        };

        // Add the new review to the reviews array
        restaurant.reviews.unshift(newReview);
        await restaurant.save();

        res.status(201).json({ message: 'Review added successfully' });
      } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    // delete review

    app.delete('/api/restaurants/:id/review/:reviewid',
      async (req, res) => {
        try {
          const deletedReview = await Restaurant.updateOne(
            { _id: req.params.id },
            { $pull: { reviews: { _id: req.params.reviewid } } }
          );

          console.log('review deleted:', deletedReview);

          if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
          }

          res.status(200).json({ message: 'Review deleted successfully' });
        } catch (error) {
          console.error('Error deleting review:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      });

    app.listen(3001, () => {
      console.log('Server is running on port 3001');
    });
  } catch (error) {
    console.error('Error connecting to the database from server.js:', error);
  }
})();
