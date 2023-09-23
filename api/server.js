const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/dib_data');
  console.log('connection open');
}

// Models
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

/* app.delete('//restaurant/:id/review/delete/:id', async (req, res) => {
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
}); */

app.listen(3001);
