/* const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/dib_data');
    console.log('Connection open from server.js');
  } catch (error) {
    console.error('Error connecting to the database from server.js:', error);
  }
}




const Restaurant = require('./models/restDbModel');

app.get('/start-restaurants', async (req, res) => {
  try {
    const rating = parseFloat(req.query.rating, 10); // Parse the value to a integer
    const limit = parseInt(req.query.limit, 10);

    // Check if rating is valid
    if (!isNaN(rating)) {
      // use query in query to find restaurant
      const restaurants = await Restaurant.find({
        rating: { $gte: rating },
      }).limit(limit);
      res.json(restaurants);
    } else {
      res.status(400).json({ message: 'Invalid rating parameter' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/restaurant/:id/review/new', (req, res) => {
  const restaurant = new Restaurant({
    text: req.body.text,
  });

  restaurant.save();

  res.json(restaurant);
});

app.delete('//restaurant/:id/review/delete/:id', async (req, res) => {
  const result = await restaurant.findByIdAndDelete(req.params.id);

  res.json({ result });
});

app.get('/restaurant/complete/:id', async (req, res) => {
  const restaurant = await restaurant.findById(req.params.id);

  restaurant.complete = !restaurant.complete;

  restaurant.save();

  res.json(restaurant);
});


app.put('/restaurant/update/:id', async (req, res) => {
  const restaurant = await restaurant.findById(req.params.id);

  restaurant.text = req.body.text;

  restaurant.save();

  res.json(restaurant);
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
}); */


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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
