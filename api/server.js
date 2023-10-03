const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const generateRandomUserImageURL = require('./util/getRandomImage');

const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());


// Allow requests from the domains
const corsOptions = {
  origin: ['https://phylanx.pythonanywhere.com', 'http://localhost:3000'], 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));

if (!process.env.DB_URL) {
  console.error('DB_URL environment variable is not set.');
}

(async () => {
  try {
    // connects to mongo via environment variable
    await mongoose.connect(process.env.DB_URL);
    console.log('Connection open from server.js');

    const Restaurant = require('./models/restDbModel');

    //fetch restaurants with optional queries of rating, price and limit
    app.get('/restaurants', async (req, res) => {
      try {
        const rating = parseFloat(req.query.rating, 10) || 1; //default min rating: 1
        const priceLevel = parseInt(req.query.price, 10) || 4; // default price: 4
        const limit = parseInt(req.query.limit, 10) || 8; //default limit: 8
        let searchTerm = req.query.term || ''; // default empty

        console.log('the server is searching for the term:', searchTerm)

        // Check if rating is valid
        if (!isNaN(rating, limit, priceLevel)) {
          // use query in query string to find restaurant
          const restaurants = await Restaurant.aggregate([
            {
              $match: {
                rating: { $gte: rating },
                price_level: { $lte: priceLevel },
                name: { $regex: new RegExp(searchTerm, 'i') },
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

    /* app.get('/restaurants', async (req, res) => {
      try {
        const rating = parseFloat(req.query.rating, 10) || 1; // Default min rating: 1
        const priceLevel = parseInt(req.query.price, 10) || 4; // Default price: 4
        const limit = parseInt(req.query.limit, 10) || 8; // Default limit: 8
        let searchTerm = req.query.term || ''; // Default empty
          console.log('the server is searhcing for the term:', searchTerm)
        // Check if rating is valid
        if (!isNaN(rating, limit, priceLevel)) {
          // Initialize a list to store the search results
          let restaurants = [];
    
          // Start searching with the full search term
          while (restaurants.length < limit && searchTerm.length > 0) {
            const regex = new RegExp(`^${searchTerm}`, 'i');
    
            // Use query in query string to find restaurants
            const results = await Restaurant.aggregate([
              {
                $match: {
                  rating: { $gte: rating },
                  price_level: { $lte: priceLevel },
                  name: { $regex: regex },
                },
              },
              {
                $sample: { size: limit - restaurants.length }, // Adjust the sample size based on remaining results needed
              },
            ]);
    
            // Add the results to the list
            restaurants = restaurants.concat(results);
    
            // If there are still not enough results, shorten the search term by one character
            searchTerm = searchTerm.slice(0, -1);
          }
    
          res.json(restaurants);
        } else {
          res.status(400).json({ message: 'Invalid query parameters' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }); */
    







    // app.get('/restaurants', async (req, res) => {
    //   try {
    //     const rating = parseFloat(req.query.rating, 10) || 1; //default min rating: 1
    //     const priceLevel = parseInt(req.query.price, 10) || 4; // default price: 4
    //     const limit = parseInt(req.query.limit, 10) || 8;
    //     const searchTerm = req.query.term || ''; // Get the search term from the query parameters

    //     // Check if rating is valid
    //     if (!isNaN(rating, limit, priceLevel)) {
    //       let restaurants = [];

    //       console.log('fetching restaurants in progress')

    //       // Start with the full search term and progressively shorten it
    //       for (let i = searchTerm.length; i >= 1; i--) {
    //         console.log('loop')

    //         const substring = searchTerm.slice(0, i); // Get the substring of the search term
    //         console.log('the substring we search for is:', substring)

    //         restaurants = await Restaurant.aggregate([
    //           {
    //             $match: {
    //               rating: { $gte: rating },
    //               price_level: { $lte: priceLevel },
    //               name: { $regex: new RegExp(${substring}, 'i') },
    //               // name: { $regex: new RegExp(`${searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\w*\\b`, 'g') },
    //             },
    //           },
    //           {
    //             $sample: { size: limit },
    //           },
    //         ]);

    //         // If there are exact match results, break out of the loop
    //         if (restaurants.length >= limit) {
    //           break;
    //         }
    //       }

    //       // If no exact matches, do partial search
    //       if (restaurants.length <= limit) {
    //         const addedRestaurants = await Restaurant.aggregate([
    //           {
    //             $match: {
    //               rating: { $gte: rating },
    //               price_level: { $lte: priceLevel },
    //               name: { $regex: new RegExp(`${searchTerm}`, 'i') }, // Case-insensitive regex search
    //             },
    //           },
    //           {
    //             $sample: { size: limit - restaurants.length },
    //           },
    //         ]);
    //         restaurants.push(...addedRestaurants)
    //       }

    //       res.json(restaurants);
    //     } else {
    //       res.status(400).json({ message: 'Invalid query parameters' });
    //     }
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ message: 'Internal Server Error' });
    //   }
    // });


    // fetch recommended restaurants by their reference
    app.get('/restaurants/recommendations', async (req, res) => {
      try {

        const restaurantReferences = req.body.restaurantReferences
        const restaurants = await Restaurant.find({ reference: { $in: restaurantReferences } });

        if (!restaurants) {
          return res.status(404).json({ message: 'Restaurants not found' });
        }
        console.log('found the recommended restaurants, the references are:', restaurantReferences)
        res.json(restaurants);
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

        const reviews = restaurant.reviews;
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

    app.delete('/api/restaurants/:id/review/:reviewid', async (req, res) => {
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
