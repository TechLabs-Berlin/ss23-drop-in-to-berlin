const mongoose = require('mongoose');

/* main().catch(err => console.log(err));

async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/dib_data');
    console.log('Connection open from restDbModel');
  } catch (error) {
    console.error('Error connecting to the database from restDbModel:', error);
  }
}
 */
const restaurantSchema = new mongoose.Schema({
    name: String,
    formatted_address: String,
    rating: Number,
    user_ratings_total: Number,
    price_level: Number,
    opening_hours: [String],
    photos: [{
      height: Number,
      html_attributions: [String],
      photo_reference: String,
      width: Number,
      imageURL: String,
    }],
    reviews: [{
      author_name: String,
      author_url: String,
      language: String,
      original_language: String,
      profile_photo_url: String,
      rating: Number,
      relative_time_description: String,
      text: String,
      time: Number,
      translated: Boolean,
      added_review : Boolean,
    }],
    geometry: {
      location: {
        lat: Number,
        lng: Number,
      },
      viewport: {
        northeast: {
          lat: Number,
          lng: Number,
        },
        southwest: {
          lat: Number,
          lng: Number,
        },
      },
    },
    types: [String],
    website: String,
    international_phone_number: String,
    vicinity: String,
    url: String,
    business_status: String,
    reference: String,
    editorial_summary: {
      language: String,
      overview: String,
    },
  });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
